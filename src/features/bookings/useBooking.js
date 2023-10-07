import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId: id } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });

  return { booking, isLoading, error };
}
