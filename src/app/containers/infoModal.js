/* eslint-disable react/prop-types */
// styles
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';

function InfoModal({ visible, onChange, title, children }) {
  return (
    <Dialog modal open={visible} onOpenChange={onChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">{title}</DialogTitle>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default InfoModal;
