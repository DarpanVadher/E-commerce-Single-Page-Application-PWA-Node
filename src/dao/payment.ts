import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const mapPaymentWithOrder = async (paymentData: any) => {
  try {
    return new Promise((resolve, reject) => {
      console.log(paymentData, "Payment Data");
      resolve(paymentData);

      prisma.payments
        .create({
          data: {
            ...paymentData,
          },
        })
        .then((payment: any) => {
          resolve(payment);
        })
        .catch((error: any) => {
          reject(error);
        });

      // prisma.cart
      //   .findFirst({
      //     where: {
      //       sessionId: sessionId,
      //     },
      //   })
      //   .then((cart: any) => {
      //     // console.log(cart, "Cart");
      //     if (cart) {
      //       prisma.cart_Details
      //         .findFirst({
      //           where: {
      //             cartId: cart.id,
      //             productId: productId,
      //           },
      //         })
      //         .then((cartDetails: any) => {
      //           // console.log(cartDetails, "Cart Details");
      //           if (cartDetails) {
      //             prisma.cart_Details
      //               .update({
      //                 where: {
      //                   id: cartDetails.id,
      //                 },
      //                 data: {
      //                   quantity: quantity + cartDetails.quantity,
      //                 },
      //               })
      //               .then((cart: any) => {
      //                 resolve(cart);
      //               })
      //               .catch((error: any) => {
      //                 reject(error);
      //               });
      //           } else {
      //             prisma.cart_Details
      //               .create({
      //                 data: {
      //                   cartId: cart.id,
      //                   productId: productId,
      //                   quantity: quantity,
      //                 },
      //               })
      //               .then((cart: any) => {
      //                 resolve(cart);
      //               })
      //               .catch((error: any) => {
      //                 reject(error);
      //               });
      //           }
      //         })
      //         .catch((error: any) => {
      //           reject(error);
      //         });
      //     } else {
      //       prisma.cart
      //         .create({
      //           data: {
      //             sessionId: sessionId,
      //             Cart_Details: {
      //               create: {
      //                 productId: productId,
      //                 quantity: quantity,
      //               },
      //             },
      //           },
      //         })
      //         .then((cart: any) => {
      //           resolve(cart);
      //         })
      //         .catch((error: any) => {
      //           reject(error);
      //         });
      //     }
      //   });
    });
  } catch (error) {
    throw error;
  }
};

export const paymentDAO = {
  mapPaymentWithOrder,
};
