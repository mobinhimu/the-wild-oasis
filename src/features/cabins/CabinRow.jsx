import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { HiDocumentDuplicate, HiPencilSquare, HiTrash } from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import { useCabins } from "./useCabins";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    image,
    discount,
    regularPrice,
    description,
    maxCapacity,
    name,
    id: cabinId,
  } = cabin;

  const { cabins } = useCabins();
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin: duplicateCabin, isCreating: isDuplicating } =
    useCreateCabin();

  function handleDelete() {
    deleteCabin(cabinId);
  }

  function copyImageNumberingFunctionality() {
    let finalName;
    cabins.forEach((cabin) => {
      if (cabin.name === name) {
        finalName = `Copy of ${name}`;
      }

      if (name.startsWith(`Copy of`)) {
        finalName = name;
      }
    });

    return finalName;
  }

  function handleDuplicateCabin() {
    copyImageNumberingFunctionality();

    duplicateCabin({
      name: copyImageNumberingFunctionality(),
      image,
      discount,
      description,
      regularPrice,
      maxCapacity,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>
        {discount ? formatCurrency(discount) : <span>&mdash;</span>}
      </Discount>
      <div>
        <Modal>
          <Menus.Menu>
            {/* Menus */}
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiDocumentDuplicate />}
                onClick={handleDuplicateCabin}
                disabled={isDuplicating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit-form">
                <Menus.Button icon={<HiPencilSquare />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-cabin">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            {/* Edit Cabin Modal */}

            <Modal.Windows name="edit-form">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Windows>

            <Modal.Windows name="delete-cabin">
              <ConfirmDelete
                resourceName="Cabins"
                disabled={isDeleting}
                onConfirm={handleDelete}
              />
            </Modal.Windows>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
