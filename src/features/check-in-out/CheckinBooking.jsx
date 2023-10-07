import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isBreakfastActive, setIsBreakfastActive] = useState(false);

  const { booking, isLoading } = useBooking();
  const { checkin, isLoading: isCheckIn } = useCheckin();
  const { getSettings: { breakfastPrice } = {}, isSettings } = useSettings();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  useEffect(() => {
    setIsConfirmed((confirm) => (booking?.isPaid ? booking?.isPaid : confirm));
  }, [booking?.isPaid]);

  if (isLoading || isSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!isConfirmed) return;

    if (isBreakfastActive) {
      checkin(
        {
          bookingId,
          breakfast: {
            hasBreakfast: true,
            extrasPrice: optionalBreakfastPrice,
            totalPrice: totalPrice + optionalBreakfastPrice,
          },
        },
        { onSettled: navigate("/dashboard") }
      );
    } else {
      checkin(
        { bookingId, breakfast: {} },
        { onSettled: navigate("/dashboard") }
      );
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={isBreakfastActive}
            id="breakfast"
            onChange={() => {
              setIsBreakfastActive((breakfast) => !breakfast);
              setIsConfirmed(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={isConfirmed}
          onChange={() => setIsConfirmed((confirm) => !confirm)}
          id="confirm"
          disabled={isConfirmed || isCheckIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {isBreakfastActive
            ? `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isConfirmed || isCheckIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
