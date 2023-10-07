import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortBy") || "startDate-desc";

  // FILTER
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { status: "status", method: "eq", value: filterValue };

  // SORT 😕
  const [filed, direction] = sortValue.split("-");
  const sortBy = { filed, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCH
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, isLoading, error, count };
}
