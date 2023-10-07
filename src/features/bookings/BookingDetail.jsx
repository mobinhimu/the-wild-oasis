import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useDeleteBookings } from "./useDeleteBookings";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkOut, checkingOut } = useCheckOut();
  const { deleteBooking, isDeleting } = useDeleteBookings();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading || checkingOut) return <Spinner />;

  if (!booking) return <Empty resource="Booking" />;

  const { id, status, isPaid, hasBreakfast } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "checked-in" ? (
          <Button onClick={() => checkOut(id)} disabled={checkingOut}>
            <span>Check Out</span>
          </Button>
        ) : (
          ""
        )}

        {!isPaid || !hasBreakfast ? (
          <Button onClick={() => navigate(`/checkin/${id}`)}>
            <span>Check In</span>
          </Button>
        ) : (
          ""
        )}

        <Modal>
          <Modal.Open opens={id}>
            <Button variation="danger">
              <span>Delete Booking</span>
            </Button>
          </Modal.Open>

          <Modal.Windows name={id}>
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(id, {
                  onSettled: navigate(-1),
                });
                // navigate("/bookings");
              }}
            />
          </Modal.Windows>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
