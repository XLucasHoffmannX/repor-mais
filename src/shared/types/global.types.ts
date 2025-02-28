export type CurrencyCodeType = 'pt-BR' | 'en-US' | 'es-ES';

export type CurrencyOptionsType = {
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  currency?: string;
  style?: 'currency' | 'decimal' | 'percent';
} | null;

export type CurrencyType = 'BRL' | 'USD' | 'EUR';

export interface ISelectOption {
  value: string;
  label: string;
}

export type MaskType =
  | 'phone'
  | 'cpf'
  | 'cnpj'
  | 'date'
  | 'currency'
  | 'numeric'
  | 'cep'
  | 'integer'
  | 'letters'
  | 'alphanumeric'
  | 'alphanumericWithAccents'
  | 'negative-currency'
  | 'cnae'
  | 'negative-currency'
  | 'legalNature'
  | 'cpf-cnpj'
  | 'credit-card'
  | 'date-mm/yy'
  | 'domain';

interface IPaginatedSort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface IPaginatedPageable {
  pageNumber: number;
  pageSize: number;
  sort: IPaginatedSort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface IPaginatedResponse<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T;
  number: number;
  sort: IPaginatedPageable;
  numberOfElements: number;
  pageable: IPaginatedSort;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'OWNER_USER' | string;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
  company?: ICompany;
}

export interface ICompany {
  id?: string;
  name: string;
  createdAt: string;
  upadteAt: string;
}

export interface IUnity {
  id?: string;
  name: string;
  address?: string;
}

export interface IProduct {
  id?: string;
  name: string;
  description?: string;
  barcode?: string;
  category?: string;
  brand?: string;
  supplier?: string;
  costPrice?: number | null | string;
  salePrice?: number | null;
  stockQuantity: number;
  minimumStock: number;
  unit: string;
  location?: string;
  expirationDate?: string | null;
  batch?: string;
  createdBy?: string;
  updatedBy?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
  unitEntity?: IUnity;
  unitEntityId?: string;
}

export interface ICreateProduct extends IProduct {}

export interface IEditProduct {
  name: string;
  description?: string;
  category?: string;
  barcode?: string;
  brand?: string;
  costPrice?: number | null;
  location?: string;
  expirationDate?: string | null;
  batch?: string;
  createdBy?: string;
  updatedBy?: string | null;
}

export interface IWithdraw {
  id?: string;
  type: 'entry' | 'remove';
  quantity: number;
  reason?: string;
  createdAt?: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
  product?: IProduct;
  unit?: IUnity;
  user?: IUser;
}

export interface ICreateWithdraw {
  type: 'entry' | 'remove';
  reason?: string;
  quantity: number;
  productId: string;
  unitId: string;
  userId: string;
}

export enum NoticeType {
  EXPIRATION_WARNING = 'EXPIRATION_WARNING',
  STOCK_WARNING = 'STOCK_WARNING'
}

export interface INotice {
  id: string;
  type: NoticeType;
  message: string;
  resolved: boolean;
  product: IProduct;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
