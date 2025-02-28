export interface IUseGetViaCepAddressByPostalCodeParams
  extends IGetViaCepAddressByPostalCodePayload {
  enabled?: boolean;
}

export interface IUseGetViaCepAddressByPostalCode {
  address: IViaCepAddress | null | undefined;
  isFetchingAddress: boolean;
  isSuccessAddress: boolean;
  isErrorAddress: boolean;
}

export interface IPersistenceViaCepAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export interface IGetViaCepAddressByPostalCodePayload {
  postalCode: string;
}

export interface IViaCepAddress {
  postalCode: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}
