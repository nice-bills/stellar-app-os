import { Modal } from "./Modal";
import { TransactionHistory } from "./TransactionHistory";

interface TXModalProps {
  open: boolean;
  onClose: () => void;
  address: string;
}

export function TransactionHistoryModal({ open, onClose, address }: TXModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Recent Transactions">
      <TransactionHistory address={address} />
    </Modal>
  );
}