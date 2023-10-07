import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCreateCabin } from "../../services/apiCabins";

export function useCabinEdit() {
  const queryClient = useQueryClient();

  const {
    mutate: editCabin,
    isLoading: isEditing,
    error,
  } = useMutation({
    mutationFn: ({ newCabin, id }) => editCreateCabin(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { editCabin, isEditing, error };
}
