export interface IRemoveConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  isLoading?: boolean;
  onCancel: () => void;
  productTitle: string;
}
