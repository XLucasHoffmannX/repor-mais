import { HttpAuth } from '@/app/api';
import { IProduct } from '@/shared/types';
import { IPaginationDefaultResponse } from '@/shared/types/paginate.types';

import {
  ICreateProductPayload,
  IEditProductPayload,
  IGetProductByIdPayload,
  IGetProductByUnitPayload,
  IGetProductListPayload,
  IGetProductTrashPayload,
  IRemoveProductPayload,
  IRestoreProductTrashPayload
} from '../types/product.types';

class ProductService {
  async getProductsList(
    payload: IGetProductListPayload
  ): Promise<IPaginationDefaultResponse<IProduct>> {
    const { data } = await HttpAuth.get<IPaginationDefaultResponse<IProduct>>(
      `/products/`,
      {
        params: {
          limit: payload.limit,
          page: payload.page,
          search: payload.search,
          barcode: payload.barcode,
          unit: payload.unit
        }
      }
    );

    return data;
  }

  async addProduct(payload: ICreateProductPayload) {
    const { data } = await HttpAuth.post('/products', payload);

    return data;
  }

  async editProduct(payload: IEditProductPayload, productId: string) {
    const { data } = await HttpAuth.patch(`/products/${productId}`, payload);

    return data;
  }

  async getProductById(payload: IGetProductByIdPayload): Promise<IProduct> {
    const { data } = await HttpAuth.get<IProduct>(
      `/products/${payload.productId}`
    );

    return data;
  }

  async getProductByUnit(
    payload: IGetProductByUnitPayload
  ): Promise<IProduct[]> {
    const { data } = await HttpAuth.get<IProduct[]>(
      `/products/unit/${payload.unitId}`,
      {
        params: { search: payload.search }
      }
    );

    return data;
  }

  async removeProduct(payload: IRemoveProductPayload): Promise<null> {
    await HttpAuth.delete(`/products/${payload.id}`);

    return null;
  }

  async getProductTrash(payload: IGetProductTrashPayload): Promise<IProduct[]> {
    const { data } = await HttpAuth.get<IProduct[]>(`/products/trash`, {
      params: { search: payload.search }
    });

    return data;
  }

  async restoreProductTrash(
    payload: IRestoreProductTrashPayload
  ): Promise<null> {
    await HttpAuth.post(`/products/restore/${payload.id}`);

    return null;
  }
}

export default new ProductService();
