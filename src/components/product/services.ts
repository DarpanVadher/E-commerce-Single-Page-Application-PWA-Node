import { productDAO } from "@/dao/product";
import product from "@/types/response/product";

export const getProducts = async (search?: string): Promise<product[]> => {
  // const productDAO = new productDAO();
  const products = await productDAO.getProducts(search);
  return products;
};

export default { getProducts };
