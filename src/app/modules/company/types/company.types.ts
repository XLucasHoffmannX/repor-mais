/* editCompany */
export interface IEditCompanyPayload {
  name: string;
}

export interface IUseEditCompanyPayload {
  companyId: string;
}

/* getCompanyById */
export interface IGetCompanyByIdPayload {
  companyId: string;
}

export interface IUseGetCompanyByIdPayload extends IGetCompanyByIdPayload {
  enabled?: boolean;
}
