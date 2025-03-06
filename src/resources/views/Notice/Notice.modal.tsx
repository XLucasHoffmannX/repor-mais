import { RotateCcw, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useNoticeContext } from '@/app/contexts';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
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

  const isEmpty = !isLoading && noticesList && noticesList.length === 0;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={`sm:max-w-md w-[95%] overflow-auto ${
          !isEmpty ? 'max-h-[700px]' : 'h-auto'
        } rounded-lg`}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className='mb-4 flex items-center gap-2 justify-between'>
            Avisos
            <X
              onClick={() => {
                handleChangeModal({ open: false });
              }}
              className='cursor-pointer'
            />
          </AlertDialogTitle>
        </AlertDialogHeader>
        {isEmpty && (
          <p className='text-sm font-medium text-center mb-4'>
            Nenhum aviso disponível
          </p>
        )}

        <div
          className={`flex items-center ${
            isEmpty ? 'justify-start' : 'justify-between'
          } px-4`}
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

        <div className='mb-4 h-full overflow-auto'>
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
                        theme === 'dark' &&
                        'bg-secondary text-white hover:text-black'
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
      </AlertDialogContent>
    </AlertDialog>
  );
}
