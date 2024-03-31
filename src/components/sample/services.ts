import AppInformation from "@/types/response/AppInformation";
import { HomeDAO } from "@/dao/home";
import { getAppInfoQuery } from "@/types/request/home";

import { Users } from "@/dao/user";

export const getAppInfo = async (
  appInfoKey?: getAppInfoQuery,
): Promise<AppInformation> => {
  const homeDAO = new HomeDAO();
  const result = await homeDAO.get(appInfoKey);
  return result;
};

export const createUser = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  const result = Users.createUser({
    name,
    email,
  });
  return result;
};

export const HomeServices = { getAppInfo, createUser };
