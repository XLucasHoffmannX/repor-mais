import { HttpAuth } from '@/app/api';
import { INotice } from '@/shared/types';

import { IResolveNoticeByIdPayload } from '../types/notice.types';

class NoticeService {
  async getGenerateAndAllNotices(): Promise<INotice[]> {
    const { data } = await HttpAuth.get<INotice[]>('/notices');

    return data;
  }

  async resolveAllNotices(): Promise<null> {
    await HttpAuth.post('/notices/resolve-all');

    return null;
  }

  async resolveNoticeById(payload: IResolveNoticeByIdPayload): Promise<null> {
    await HttpAuth.post(`/notices/resolve/${payload.id}`);

    return null;
  }
}

export default new NoticeService();
