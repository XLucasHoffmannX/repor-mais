import { useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useSession } from '@/app/modules/auth/use-cases';
import { ProductQueryKeys } from '@/app/modules/product/keys/product.keys';
import {
  useAddProductMutation,
  useEditProduct,
  useGetProductById
} from '@/app/modules/product/use-cases';
import { routes } from '@/app/router/router.constant';
import { ICreateProduct, IEditProduct } from '@/shared/types';

import {
  createProductSchema,
  CreateProductSchemaType
} from './create-product.schema';

import { IUseICreateProductProps } from './CreateProduct.types';

export function useCreateProduct({ context }: IUseICreateProductProps) {
  const { userAuthenticated, unity } = useSession();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  /* Busca o produto apenas no modo edição */
  const { productReturned, isFetchingProductReturned } = useGetProductById({
    productId: id ?? '',
    enabled: context === 'edit' && !!id
  });

  const defaultValues = useMemo(() => {
    if (context === 'edit' && productReturned) {
      return {
        name: productReturned.name ?? '',
        description: productReturned.description ?? '',
        barcode: productReturned.barcode ?? '',
        category: productReturned.category ?? '',
        brand: productReturned.brand ?? '',
        supplier: productReturned.supplier ?? '',
        costPrice: productReturned.costPrice ?? '',
        salePrice: productReturned.salePrice
          ? Number(productReturned.salePrice)
          : 0,
        stockQuantity: productReturned.stockQuantity ?? 0,
        minimumStock: productReturned.minimumStock ?? 0,
        unit: productReturned.unit ?? '',
        location: productReturned.location ?? '',
        expirationDate: productReturned.expirationDate ?? '',
        batch: productReturned.batch ?? ''
      };
    }
    return undefined;
  }, [context, productReturned]);

  const { mutateAddProduct, isPendingMutate: isPendingAdd } =
    useAddProductMutation();
  const { mutateEditProduct, isPendingMutate: isPendingEdit } = useEditProduct({
    productId: id ?? ''
  });

  const methods = useForm<CreateProductSchemaType>({
    resolver: zodResolver(createProductSchema),
    ...(context === 'edit' && { defaultValues })
  });

  useEffect(() => {
    if (context === 'edit' && id) {
      queryClient.resetQueries({
        queryKey: ['GET-PRODUCT-BY-ID']
      });
    }
  }, [id, context, queryClient]);

  useEffect(() => {
    if (context === 'edit' && productReturned) {
      methods.reset({
        name: productReturned.name,
        description: productReturned.description || '',
        barcode: productReturned.barcode || '',
        category: productReturned.category || '',
        stockQuantity: productReturned.stockQuantity ?? 0,
        costPrice: productReturned.costPrice ?? null,
        expirationDate: productReturned.expirationDate ?? undefined,
        minimumStock: productReturned.minimumStock ?? 0,
        unit: productReturned.unit || '',
        location: productReturned.location || '',
        batch: productReturned.batch || ''
      });
    }
  }, [context, productReturned, methods]);

  async function onSubmit(data: CreateProductSchemaType) {
    try {
      if (context === 'create') {
        const payload: ICreateProduct = {
          ...data,
          unitEntityId: unity?.id ?? '',
          updatedAt: null,
          createdBy: userAuthenticated?.id ?? ''
        };

        const res = await mutateAddProduct(payload);
        toast.success(`Produto ${res.name ?? ''} adicionado com sucesso!`);
      }

      if (context === 'edit' && id) {
        console.log(data);

        const payload: IEditProduct = {
          expirationDate: data.expirationDate ? data.expirationDate : null,
          ...data
        };

        await mutateEditProduct(payload)
          .then()
          .catch(error => {
            return toast.error(error);
          });

        queryClient.resetQueries({
          queryKey: [ProductQueryKeys['GET-PRODUCT-BY-ID']]
        });

        toast.success(`Produto atualizado com sucesso!`);
      }

      queryClient.resetQueries({
        queryKey: [ProductQueryKeys['GET-PRODUCT-BY-ID']]
      });

      queryClient.resetQueries({
        queryKey: [ProductQueryKeys['GET-PRODUCT-LIST']]
      });

      navigate(routes.app);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.message ||
        'Não foi possível salvar o produto!';

      toast.error(errorMessage);
    }
  }

  return {
    methods,
    handleSubmit: methods.handleSubmit(onSubmit),
    errors: methods.formState.errors,
    control: methods.control,
    isLoading: isPendingAdd || isPendingEdit || isFetchingProductReturned
  };
}
