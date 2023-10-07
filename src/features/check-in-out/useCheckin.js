import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();
  const { mutate: checkin, isLoading } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} Successfully Checked In`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (err) => toast.error(`There was an error while checking in`),
  });
  return { checkin, isLoading };
}
