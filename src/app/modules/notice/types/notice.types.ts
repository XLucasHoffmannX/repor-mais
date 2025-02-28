import { INotice } from '@/shared/types';

/* useGetGenerateAndAllNotices  */
export interface IUseGetGenerateAndAllNoticesPayload {
  enabled?: boolean;
}

/* resolveNoticeById */
export interface IResolveNoticeByIdPayload {
  id: INotice['id'];
}
