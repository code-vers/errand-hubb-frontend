import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_CONFIG } from "@/configs/api.config";

export const useErrandProfiles = () => {
  return useQuery({
    queryKey: ["errand-profiles"],
    queryFn: async () => {
      const response = await axios.get(`${API_CONFIG.BACKEND_URL}/api/v1/errand-profiles`);
      return response.data;
    },
  });
};
