import { useQuery } from "@tanstack/react-query";
import { getSettings as getSettingsAPI } from "../../services/apiSettings";

export function useSettings() {
  // write your awesome custom hook's code here 🙆‍♀️

  const { data: getSettings, isLoading: isSettings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsAPI,
  });

  return { getSettings, isSettings };
}
