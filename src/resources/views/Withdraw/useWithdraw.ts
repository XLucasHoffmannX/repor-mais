import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useWithdrawContext } from '@/app/contexts';
import { useSession } from '@/app/modules/auth/use-cases';
import { NoticQueryKeys } from '@/app/modules/notice/keys/notice.keys';
import { ProductQueryKeys } from '@/app/modules/product/keys/product.keys';
import { useGetProductsByUnit } from '@/app/modules/product/use-cases';
import { UnityQueryKeys } from '@/app/modules/unity/keys/unity.keys';
import { WithdrawQueryKeys } from '@/app/modules/withdraw/keys/withdraw.keys';
import { useAddTransactionWithdraw } from '@/app/modules/withdraw/use-cases';
import { ICreateWithdraw } from '@/shared/types';

import { WithdrawFormDataType, withdrawSchema } from './withdraw.schema';

export function useWithdraw() {
  const queryClient = useQueryClient();

  const { hash, pathname } = useLocation();

  const { userAuthenticated, unity } = useSession();

  const navigate = useNavigate();

  const { handleChangeModal, modalProps, filters } = useWithdrawContext();

  const [selectItem, setSelectItem] = useState('');
  const [errorCombo, setErrorCombo] = useState('');

  const { productListByUnitFormatted, productListByUnit, isFetching } =
    useGetProductsByUnit({
      unitId: unity?.id ?? '',
      search: filters.search?.trim() ?? '',
      enabled: Boolean(modalProps.open && unity?.id)
    });

  const selectedProduct = productListByUnit?.find(
    product => product.id === selectItem
  );

  const methods = useForm<WithdrawFormDataType>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { productId: '', quantity: 1 }
  });

  const { mutateAddTransactionWithdraw, isPendingMutate } =
    useAddTransactionWithdraw();

  async function onSubmit(data: WithdrawFormDataType) {
    if (!selectItem) {
      return setErrorCombo('Selecionar um produto!');
    }

    try {
      const payload: ICreateWithdraw = {
        ...data,
        type: modalProps.context,
        unitId: unity?.id ?? '',
        userId: userAuthenticated?.id ?? ''
      };

      await mutateAddTransactionWithdraw(payload);

      toast.success(
        `${
          modalProps.context === 'remove' ? 'Removido' : 'Adicionado'
        } com sucesso!`
      );

      queryClient.resetQueries({
        queryKey: [ProductQueryKeys['GET-PRODUCT-LIST']]
      });

      queryClient.resetQueries({
        queryKey: [UnityQueryKeys['GET-ALL-UNITS']]
      });

      queryClient.resetQueries({
        queryKey: [ProductQueryKeys['GET-PRODUCTS-UNIT']]
      });

      queryClient.resetQueries({
        queryKey: [WithdrawQueryKeys['GET_ALL_WITHDRAWS']]
      });

      queryClient.resetQueries({
        queryKey: [NoticQueryKeys['GET-AND-GENERATE-NOTICES']]
      });

      handleChangeModal({ context: 'remove', open: false });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.message ||
        'Não foi possível realizar essa ação';

      toast.error(errorMessage);
    }
  }

  useEffect(() => {
    if (hash === '#entry' || hash === '#remove') {
      navigate(pathname, { replace: true });

      handleChangeModal({
        open: true,
        context: hash === '#remove' ? 'remove' : 'entry'
      });
    }
  }, [hash, navigate, handleChangeModal]);

  return {
    methods,
    handleSubmit: methods.handleSubmit(onSubmit),
    errors: methods.formState.errors,
    control: methods.control,
    selectItem,
    handleChangeSelectItem: setSelectItem,
    productListByUnitFormatted,
    isFetching,
    errorCombo,
    handleChageErrorCombo: setErrorCombo,
    selectedProduct,
    isPendingMutate
  };
}
