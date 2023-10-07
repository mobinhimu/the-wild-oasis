import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  // write your awesome custom hook's code here 🙆‍♀️
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading, error };
}
