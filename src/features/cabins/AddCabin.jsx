import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Show Cabin Form</Button>
      </Modal.Open>

      <Modal.Windows name="cabin-form">
        <CreateCabinForm />
      </Modal.Windows>
    </Modal>
  );
}
