import { Request, Response, NextFunction } from "express";
import Razorpay from "razorpay";
import { OK } from "http-status/lib";
import cartServices from "./services";
import { apiResponse } from "@/helpers/apiResponse";
import { decrypt } from "@/helpers/encryption";

const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionId = req.headers.sessionid as string;
    const getCart = await cartServices.getCart(decrypt(sessionId));
    res.status(OK).json(apiResponse(getCart));
  } catch (error) {
    next(error);
  }
};

const addProductToCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionId = req.headers.sessionid as string;
    const { productId, quantity } = req.body;

    if (productId && quantity) {
      await cartServices
        .addProductToCart(decrypt(sessionId), productId, quantity)
        .then(() => {
          res
            .status(OK)
            .json(
              apiResponse({ message: "Product added to cart Successfully" }),
            );
        })
        .catch((error: any) => {
          next(error);
        });
    } else {
      res
        .status(OK)
        .json(apiResponse({ message: "productId and quantity are required" }));
    }
  } catch (error) {
    next(error);
  }
};

const updateProductToCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const sessionId = req.headers.sessionid as string;
    const { productId, quantity } = req.body;

    console.log(productId && quantity);
    console.log(productId);
    console.log(quantity);

    if (productId !== undefined && quantity !== undefined) {
      await cartServices
        .updateProductToCart(productId, quantity)
        .then(() => {
          res.status(OK).json(
            apiResponse({
              message: "Product added to cart Updated Successfully",
            }),
          );
        })
        .catch((error: any) => {
          next(error);
        });
    } else {
      res
        .status(OK)
        .json(apiResponse({ message: "productId and quantity are required" }));
    }
  } catch (error) {
    next(error);
  }
};

const checkoutCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionId = req.headers.sessionid as string;
    const { billingAddress, shipingAddress } = req.body;

    const cartData = await cartServices.getCart(decrypt(sessionId));

    console.log(cartData, "Cart Data");
    console.log(billingAddress, "Billing Address");
    console.log(shipingAddress, "Shipping Address");

    const productdetails = cartData.Cart_Details.map((item: any) => {
      console.log(item, "Item");

      const total_before_tax =
        Number(item.product.price) * Number(item.quantity);
      const total_tax =
        ((Number(item?.product?.price) * Number(item?.product?.tax)) / 100) *
        item?.quantity;

      return {
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        tax: item.product.tax,
        total_before_tax,
        total_tax,
        total: total_before_tax + total_tax,
      };
    });

    console.log(productdetails, "Product Details");

    const cartDataToSave = {
      sessionId: decrypt(sessionId),
      billingAddress,
      shipingAddress,
      productdetails,
      total_before_tax: productdetails.reduce((sum: number, item: any) => {
        return sum + item.total_before_tax;
      }, 0),
      total_tax: productdetails.reduce((sum: number, item: any) => {
        return sum + item.total_tax;
      }, 0),
      total: productdetails.reduce((sum: number, item: any) => {
        return sum + item.total;
      }, 0),
    };

    const shipments = await cartServices.checkoutCart(cartDataToSave);

    await cartServices.deleteCart(cartData.id);

    const instance = new Razorpay({
      key_id: "rzp_live_JgLOIEusVFrhxD",
      key_secret: "UvhCAthwTo1jT78fWJzYoZxp",
    });

    // Calculate the current time in milliseconds
    const currentTimeMillis = Date.now();

    // Calculate the time 2 minutes from now
    const twoMinutesFromNowMillis = currentTimeMillis + 3 * 60 * 1000; // 2 minutes in milliseconds

    // Convert the time to seconds (Razorpay expects time in seconds)
    const closeByTimeInSeconds = Math.floor(twoMinutesFromNowMillis / 1000);

    console.log(parseInt(cartDataToSave.total), "Total");

    instance.qrCode.create(
      {
        type: "upi_qr",
        name: "The Mivi Store",
        usage: "single_use",
        fixed_amount: true,
        payment_amount: 300,
        description: "For Store 1",
        customer_id: "cust_Nrr2rmJZPd5tPv",
        close_by: closeByTimeInSeconds,
        notes: {
          purpose: "Test UPI QR Code notes",
        },
      },
      function (error, response) {
        if (error) {
          console.error("Error creating QR code:", error);
        } else {
          console.log("QR code created:", response);
          res.status(OK).json(apiResponse({ qr: response, shipments }));
        }
      },
    );

    // console.log(qrData, "qrData");
  } catch (error) {
    console.log(error, "Error");

    next(error);
  }
};

const checkPaymentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    // const sessionId = req.headers.sessionid as string;
    const qrCodeId = req.headers.qr as string;
    const shipmentId = req.headers.shipmentid as string;
    const instance = new Razorpay({
      key_id: "rzp_live_JgLOIEusVFrhxD",
      key_secret: "UvhCAthwTo1jT78fWJzYoZxp",
    });

    // Calculate the current time in milliseconds
    // const currentTimeMillis = Date.now();

    // Calculate the time 2 minutes from now
    // const twoMinutesFromNowMillis = currentTimeMillis + 3 * 60 * 1000; // 2 minutes in milliseconds

    // Convert the time to seconds (Razorpay expects time in seconds)
    // const closeByTimeInSeconds = Math.floor(twoMinutesFromNowMillis / 1000);

    console.log(qrCodeId, "QrCodeId");
    console.log(shipmentId, "ShipmentId");

    const QRData = await instance.qrCode.fetch(qrCodeId);

    console.log(QRData, "QRData");

    const response = {
      status: "",
      amount: 0,
      transectionId: "",
    };

    const options = {
      from: undefined, // Optional: Start time for filtering payments (in seconds)
      to: undefined, // Optional: End time for filtering payments (in seconds)
      skip: undefined, // Optional: Number of payments to skip (for pagination)
      limit: undefined, // Optional: Maximum number of payments to return
    };

    const payments = await instance.qrCode.fetchAllPayments(qrCodeId, options);

    console.log(payments, "Payments");

    // Payments Not Done
    if (payments.count == 0) {
      response.status = "failed";
      response.amount = Number(QRData?.payment_amount);
      return res.status(OK).json(apiResponse(response));
    }

    response.status = payments?.items[0].status;
    response.amount = Number(payments?.items[0].amount);
    response.transectionId = payments.items[0].id;

    const paymentData = {
      shipmentId: Number(shipmentId),
      amount: Number(response.amount),
      paymentDate: new Date(),
      paymentMethod: payments.items[0].method,
      transectionId: response.transectionId,
    };

    const savePayment = await cartServices.savePaymentData(paymentData);

    console.log(savePayment, "SavePayment");

    res.status(OK).json(apiResponse(response));
  } catch (error) {
    console.log(error, "Error");
    next(error);
  }
};
export default {
  getCart,
  addProductToCart,
  updateProductToCart,
  checkoutCart,
  checkPaymentStatus,
};
