import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdatingSetting } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Setting Is Updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, isUpdatingSetting };
}
