const Razorpay = require("razorpay");
const crypto = require("crypto");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//---------------------------- Create Razorpay Order-----------------------
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    console.log("Received payment request:", { amount, currency });

    // Check for missing or invalid amount/currency
    if (!amount || isNaN(amount) || amount <= 0) {
      console.error("❌ Invalid amount:", amount);
      return res.status(400).json({ error: "Invalid payment amount" });
    }

    if (!currency) {
      console.error("❌ Currency not provided");
      return res.status(400).json({ error: "Currency is required" });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Auto-capture
    };

    console.log("Creating order with options:", options);

    const order = await instance.orders.create(options);

    console.log("✅ Razorpay order created:", order);
    res.status(200).json(order);
  } catch (error) {
    console.error("❌ Razorpay order creation failed:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

//----------------------- Verify Payment Signature---------------------------
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
