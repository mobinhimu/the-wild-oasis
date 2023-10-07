import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();

  const {
    mutate: login,
    error,
    isLoading: isLogin,
  } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      toast.success("User Login Successfully");
    },
    onError: () => toast.error("Provided Email And Password Are Incorrect"),
  });

  return { login, error, isLogin };
}
