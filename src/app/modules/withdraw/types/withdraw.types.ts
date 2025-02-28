import { ICreateWithdraw, IWithdraw } from '@/shared/types';

/* addTransactionWithdraw */
export interface IAddTransactionWithdrawPayoad extends ICreateWithdraw {}

/* getAllWithdraws */
export interface IGetAllWithdrawsPayload {
  limit: number;
  page: number;
  search?: string;
  type?: IWithdraw['type'];
}

export interface IUseGetAllWithdrawsPayload extends IGetAllWithdrawsPayload {
  enabled?: boolean;
}
