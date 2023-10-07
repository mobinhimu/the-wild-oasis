import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCreateCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: editCreateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { createCabin, isCreating };
}
