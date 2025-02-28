export interface IPaginationDefaultResponse<T> {
  items: T[];
  meta: IMeta;
  links: ILinks;
}

export interface IMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface ILinks {
  first: string;
  previous: string;
  next: string;
  last: string;
}
