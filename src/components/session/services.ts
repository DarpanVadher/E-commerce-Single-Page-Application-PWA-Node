import { sessionDAO } from "@/dao/session";
// import session from "@/types/response/session";

// export const getProducts = async (search?: string): Promise<product[]> => {
//   // const productDAO = new productDAO();
//   const products = await productDAO.getProducts(search);
//   return products;
// };

export const getSessionOrCreate = async (SessionId: string): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      sessionDAO
        .getSessionOrCreate(SessionId)
        .then((session: any) => {
          resolve(session);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export default { getSessionOrCreate };
