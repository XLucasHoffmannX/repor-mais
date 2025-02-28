import { ICreateProduct, IEditProduct, IProduct } from '@/shared/types';

/* getProductsList */
export interface IGetProductListPayload {
  limit: number;
  page: number;
  search?: string;
  barcode?: string;
  unit?: string;
}

export interface IUseGetProductListPayload extends IGetProductListPayload {
  enabled?: boolean;
}

/* createProduct */
export interface ICreateProductPayload extends ICreateProduct {}

export interface IEditProductPayload extends IEditProduct {}

export interface IUseEditProductPayload {
  productId: string;
}

/* getProductByUnit */
export interface IGetProductByUnitPayload {
  unitId: string;
  search?: string;
}

export interface IUseGetProductByUnitPayload extends IGetProductByUnitPayload {
  enabled?: boolean;
}

/* getProductById */
export interface IGetProductByIdPayload {
  productId: string;
}

export interface IUseGetProductByIdPayload extends IGetProductByIdPayload {
  enabled?: boolean;
}

/* removeProduct */
export interface IRemoveProductPayload {
  id: IProduct['id'];
}

/* getProductTrash */
export interface IGetProductTrashPayload {
  search?: string;
}

export interface IUseGetProductTrashPayload extends IGetProductTrashPayload {
  enabled?: boolean;
}

/* restoreProductTrash */
export interface IRestoreProductTrashPayload {
  id: IProduct['id'];
}
