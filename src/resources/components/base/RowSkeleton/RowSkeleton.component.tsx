import { Skeleton, TableCell, TableRow } from '@/resources/components/ui';

import { IRowSkeletonProps } from './RowSkeleton.types';

export function RowSkeleton({ cells, rows, heightRow }: IRowSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={`row-${rowIndex}`}>
          {Array.from({ length: cells }).map((_, cellIndex) => (
            <TableCell key={`cell-${cellIndex}`}>
              <Skeleton
                className={`${heightRow ? `h-[${heightRow}px]` : 'h-[20px]'}`}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
