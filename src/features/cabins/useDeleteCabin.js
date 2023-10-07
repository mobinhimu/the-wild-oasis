import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";

export function useDeleteCabin() {
  // write your awesome custom hook's code here 🙆‍♀️

  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabinAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin Deleted Successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteCabin, isDeleting };
}
