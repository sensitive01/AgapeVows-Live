import { userInstance } from "./axiosInstance/userInstance";

export const getPublicMasterData = async () => {
  return await userInstance.get(`/public/master-data`);
};
