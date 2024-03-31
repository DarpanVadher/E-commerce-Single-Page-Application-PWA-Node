import { cartDAO } from "@/dao/cart";
import { paymentDAO } from "@/dao/payment";

export const getCart = async (sessionId: string): Promise<any> => {
  try {
    return new Promise((resolve, reject) => {
      cartDAO
        .getCart(sessionId)
        .then((cart: any) => {
          resolve(cart);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const addProductToCart = async (
  sessionId: string,
  productId: number,
  quantity: number,
) => {
  try {
    return new Promise((resolve, reject) => {
      cartDAO
        .addProductToCart(sessionId, productId, quantity)
        .then((cart: any) => {
          resolve(cart);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const updateProductToCart = async (
  // sessionId: string,
  productId: number,
  quantity: number,
) => {
  try {
    return new Promise((resolve, reject) => {
      cartDAO
        .updateProductToCart(productId, quantity)
        .then((cart: any) => {
          resolve(cart);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const checkoutCart = async ({
  sessionId,
  billingAddress,
  shipingAddress,
  productdetails,
  total_before_tax,
  total_tax,
  total,
}: {
  sessionId: string;
  billingAddress: string;
  shipingAddress: string;
  productdetails: any;
  total_before_tax: number;
  total_tax: number;
  total: number;
}) => {
  try {
    return new Promise((resolve, reject) => {
      cartDAO
        .checkoutCart(
          sessionId,
          billingAddress,
          shipingAddress,
          productdetails,
          total_before_tax,
          total_tax,
          total,
        )
        .then((cart: any) => {
          resolve(cart);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const deleteCart = async (id: number) => {
  try {
    return new Promise((resolve, reject) => {
      cartDAO
        .deleteCart(id)
        .then((cart: any) => {
          resolve(cart);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const savePaymentData = async (paymentData: any) => {
  try {
    return new Promise((resolve, reject) => {
      paymentDAO
        .mapPaymentWithOrder(paymentData)
        .then((cart: any) => {
          resolve(cart);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getCart,
  addProductToCart,
  updateProductToCart,
  checkoutCart,
  deleteCart,
  savePaymentData,
};
