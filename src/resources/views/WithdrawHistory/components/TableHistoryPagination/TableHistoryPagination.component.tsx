import { useWithdrawContext } from '@/app/contexts';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/resources/components/ui';

import { useTableHistory } from '../TableHistory/useTableHistory';
export function TableHistoryPagination() {
  const { handleChangeFilterPagination } = useWithdrawContext();
  const { withdrawList } = useTableHistory();

  const meta = withdrawList?.meta;
  const totalPages = withdrawList?.meta.totalPages;
  const currentPage = withdrawList?.meta.currentPage;

  const handlePageChange = (page: number) => {
    console.log(page);

    if (page < 1 || page > (meta?.totalPages || 1)) return;

    handleChangeFilterPagination({ page });
  };

  if (!meta || meta.totalPages <= 1) {
    return null;
  }
  return (
    <Pagination className='mt-12 flex items-center justify-between w-full'>
      <p className='text-neutral-400'>
        Página {currentPage} de {totalPages}
      </p>

      <PaginationContent className=''>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={() => handlePageChange(meta.currentPage - 1)}
          />
        </PaginationItem>
        {[...Array(meta.totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href='#'
                isActive={page === meta.currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {meta.totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={() => handlePageChange(meta.currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>

      <div className='flex items-center gap-3'>
        <p className='text-neutral-400 whitespace-nowrap'>Items por página</p>
        <Select
          defaultValue='10'
          onValueChange={value =>
            handleChangeFilterPagination({ limit: Number(value) })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Ordenar' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='50'>50</SelectItem>
              <SelectItem value='100'>100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Pagination>
  );
}
