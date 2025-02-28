import { useProductContext } from '@/app/contexts';
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

import { useTableStock } from '../TableStock/useTableStock';

export function TablePagination() {
  const { handleChangeFilter } = useProductContext();
  const { productList } = useTableStock();

  const meta = productList?.meta;
  const totalPages = productList?.meta.totalPages;
  const currentPage = productList?.meta.currentPage;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > (meta?.totalPages || 1)) return;
    handleChangeFilter({ page });
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
          onValueChange={value => handleChangeFilter({ limit: Number(value) })}
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
