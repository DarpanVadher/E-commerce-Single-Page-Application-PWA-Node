import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const getCart = async (sessionId?: string): Promise<any> => {
  try {
    // console.log(prisma.product, "Prisma");
    // console.log(search, "Search");

    // console.log(sessionId, "Session Id");

    const cart = await prisma.cart.findFirst({
      include: {
        Cart_Details: {
          include: {
            product: true,
          },
        },
      },
      where: {
        sessionId: sessionId,
      },
    });

    // console.log(cart, "Cart");

    return cart;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addProductToCart = async (
  sessionId: string,
  productId: number,
  quantity: number,
) => {
  try {
    return new Promise((resolve, reject) => {
      prisma.cart
        .findFirst({
          where: {
            sessionId: sessionId,
          },
        })
        .then((cart: any) => {
          // console.log(cart, "Cart");

          if (cart) {
            prisma.cart_Details
              .findFirst({
                where: {
                  cartId: cart.id,
                  productId: productId,
                },
              })
              .then((cartDetails: any) => {
                // console.log(cartDetails, "Cart Details");
                if (cartDetails) {
                  prisma.cart_Details
                    .update({
                      where: {
                        id: cartDetails.id,
                      },
                      data: {
                        quantity: quantity + cartDetails.quantity,
                      },
                    })
                    .then((cart: any) => {
                      resolve(cart);
                    })
                    .catch((error: any) => {
                      reject(error);
                    });
                } else {
                  prisma.cart_Details
                    .create({
                      data: {
                        cartId: cart.id,
                        productId: productId,
                        quantity: quantity,
                      },
                    })
                    .then((cart: any) => {
                      resolve(cart);
                    })
                    .catch((error: any) => {
                      reject(error);
                    });
                }
              })
              .catch((error: any) => {
                reject(error);
              });
          } else {
            prisma.cart
              .create({
                data: {
                  sessionId: sessionId,
                  Cart_Details: {
                    create: {
                      productId: productId,
                      quantity: quantity,
                    },
                  },
                },
              })
              .then((cart: any) => {
                resolve(cart);
              })
              .catch((error: any) => {
                reject(error);
              });
          }
        });
    });
  } catch (error) {
    throw error;
  }
};

const updateProductToCart = async (
  // sessionId: string,
  productId: number,
  quantity: number,
) => {
  try {
    return new Promise((resolve, reject) => {
      if (quantity < 1) {
        prisma.cart_Details
          .delete({
            where: {
              id: productId,
            },
          })
          .then((cart: any) => {
            resolve(cart);
          })
          .catch((error: any) => {
            reject(error);
          });
      } else {
        prisma.cart_Details
          .update({
            where: {
              id: productId,
            },
            data: {
              quantity: quantity,
            },
          })
          .then((cart: any) => {
            resolve(cart);
          })
          .catch((error: any) => {
            reject(error);
          });
      }
    });
  } catch (error) {
    throw error;
  }
};

const checkoutCart = async (
  sessionId: string,
  billingAddress: string,
  shipingAddress: string,
  productdetails: any,
  total_before_tax: number,
  total_tax: number,
  total: number,
) => {
  try {
    return new Promise((resolve, reject) => {
      prisma.shipments
        .create({
          data: {
            sessionId: sessionId,
            billingAddress: billingAddress,
            shipingAddress: shipingAddress,
            Shipment_Details: {
              create: productdetails,
            },
            total_before_tax: total_before_tax,
            total_tax: total_tax,
            total: total,
          },
        })
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

const deleteCart = async (id: number) => {
  try {
    return new Promise((resolve, reject) => {
      prisma.cart_Details
        .deleteMany({
          where: {
            cartId: id,
          },
        })
        .then((cart: any) => {
          console.log(cart, "Cart");

          prisma.cart
            .delete({
              where: {
                id: id,
              },
            })
            .then((cart: any) => {
              resolve(cart);
            })
            .catch((error: any) => {
              reject(error);
            });
        });
    });
  } catch (error) {
    throw error;
  }
};

export const cartDAO = {
  getCart,
  addProductToCart,
  updateProductToCart,
  checkoutCart,
  deleteCart,
};
