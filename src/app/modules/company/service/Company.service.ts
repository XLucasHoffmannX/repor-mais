import { HttpAuth } from '@/app/api';
import { ICompany } from '@/shared/types';

import {
  IEditCompanyPayload,
  IGetCompanyByIdPayload
} from '../types/company.types';

export class CompanyService {
  async editCompany(payload: IEditCompanyPayload, companyId: string) {
    const { data } = await HttpAuth.patch(`/companies/${companyId}`, payload);

    return data;
  }

  async getCompanyById(payload: IGetCompanyByIdPayload): Promise<ICompany> {
    const { data } = await HttpAuth.get<ICompany>(
      `/companies/${payload.companyId}`
    );

    return data;
  }
}

export default new CompanyService();
