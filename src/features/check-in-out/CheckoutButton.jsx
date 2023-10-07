import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkOut, checkingOut } = useCheckOut();

  return (
    <Button
      variation="primary"
      size="small"
      disabled={checkingOut}
      onClick={() => checkOut(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
