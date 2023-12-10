import { razorpay } from "./razorpay";
import crypto from "crypto";

export const paymentCheckout = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    if (!amount) {
      return res
        .status(400)
        .send({ status: false, error: "please provide amount" });
    }
    if (!currency) {
      return res
        .status(400)
        .send({ status: false, error: "please provide currency" });
    }

    const order = await razorpay.orders.create(data);
    r[0].order = order;
    return res.status(201).send({
      status: true,
      message: "order created successfully",
      r,
    });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
      res.redirect(
        `https://localhost:3000/Payment-Success?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).send({
        status: false,
        error: "payment denied",
      });
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};
