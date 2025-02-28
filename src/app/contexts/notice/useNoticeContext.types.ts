type ModalPropsType = {
  open: boolean;
};
export interface IUseNoticeContext {
  modalProps: ModalPropsType;
  handleChangeModal: (value: ModalPropsType) => void;
}
