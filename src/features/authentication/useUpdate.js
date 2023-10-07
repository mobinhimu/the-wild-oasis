import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdate() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      queryClient.setQueriesData(["user"], user);
      // queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Update User Successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
