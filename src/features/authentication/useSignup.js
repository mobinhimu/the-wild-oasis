import { useMutation } from "@tanstack/react-query";
import { userSignup as useSignupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: useSignupAPI,
    onSuccess: () => {
      toast.success(
        "Account Successfully Created, please verify the new account from the user's email address"
      );
    },
  });

  return { signup, isLoading };
}
