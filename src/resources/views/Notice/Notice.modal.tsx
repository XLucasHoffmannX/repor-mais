import { RotateCcw, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useNoticeContext } from '@/app/contexts';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Skeleton
} from '@/resources/components/ui';
import { useTheme } from '@/shared/hooks';

import { useNotice } from './useNotice';

import { INoticeModalProps } from './NoticeModal.types';

export function NoticeModal({ isOpen }: INoticeModalProps) {
  const { handleChangeModal } = useNoticeContext();

  const { theme } = useTheme();

  const {
    noticesList,
    isLoading,
    handRemoveNotice,
    handleRemoveAllNotices,
    handleReloadDataTable
  } = useNotice();

  console.log(noticesList);

  const isEmpty = !isLoading && noticesList && noticesList.length === 0;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={`sm:max-w-md w-[95%] ${
          !isEmpty ? 'h-[700px]' : 'h-auto'
        } rounded-lg`}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className='mb-4 flex items-center gap-2'>
            Avisos
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className='mb-4 h-full overflow-auto'>
          {isEmpty && (
            <p className='text-sm font-medium text-center'>
              Nenhum aviso disponível
            </p>
          )}

          <ul className='overflow-auto rounded-md '>
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <li
                    key={index}
                    className='p-1'
                  >
                    <Skeleton className='h-[50px]' />
                  </li>
                ))
              : (Array.isArray(noticesList) ? noticesList : []).map(
                  (message, index) => (
                    <li
                      key={`${message.id}-${index}`}
                      className={`flex items-center justify-between p-4 rounded-md hover:bg-neutral-200 border-none text-sm bg-neutral-100 m-4 ${
                        theme === 'dark' && 'bg-secondary text-black'
                      }`}
                    >
                      <div className='flex items-center justify-between'>
                        <p className='flex-1 break-words max-w-[80%] leading-tight'>
                          {message.message}
                        </p>
                        <Trash2
                          className='ml-2 cursor-pointer text-red-500'
                          size='18'
                          onClick={() => handRemoveNotice(message.id)}
                        />
                      </div>
                    </li>
                  )
                )}
          </ul>
        </div>

        <div
          className={`flex items-center ${
            isEmpty ? 'justify-start' : 'justify-between'
          } mt-2 p-3`}
        >
          {!isEmpty && (
            <Link
              to='#'
              className='flex items-center gap-2 text-blue-500 text-sm'
              onClick={() => {
                handleRemoveAllNotices();
              }}
            >
              Limpar tudo
              <X size='16' />
            </Link>
          )}

          <Link
            to='#'
            className='flex items-center gap-2 text-blue-500 text-sm'
            onClick={() => {
              handleReloadDataTable();
            }}
          >
            <RotateCcw size='16' />
            Recarregar
          </Link>
        </div>

        <AlertDialogFooter>
          <Button
            variant='outline'
            type='button'
            size='lg'
            onClick={() => {
              handleChangeModal({ open: false });
              window.history.replaceState(null, '', window.location.pathname);
            }}
          >
            Fechar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
