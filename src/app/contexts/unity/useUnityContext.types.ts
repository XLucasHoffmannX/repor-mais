import { IUnity } from '@/shared/types';

export interface IUseUnityContext {
  unity: IUnity | undefined;
  handleSetUnity: (unity: IUnity) => void;
}
