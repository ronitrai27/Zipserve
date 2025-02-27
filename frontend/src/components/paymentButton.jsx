import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import {
  LuCalendarPlus,
  LuChevronsDown,
  LuChevronsUp,
  LuCopyCheck,
  LuCheck,
  LuChevronRight,
} from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import { LiaAddressCardSolid } from "react-icons/lia";
import { RiSecurePaymentLine } from "react-icons/ri";
import { PiContactlessPayment } from "react-icons/pi";
const PaymentButton = ({ totalPrice }) => {
  const { user } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/payments/create-order",
        {
          amount: totalPrice,
          currency: "INR",
        }
      );

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please try again.");
        return;
      }

      const options = {
        key: "rzp_test_RxNBadrWtHiGTs",
        amount: data.amount,
        currency: data.currency,
        name: "Zipserve",
        description: "Zipserve keep records of your each Transactions",
        order_id: data.id,
        handler: async function (response) {
          const verifyResponse = await axios.post(
            "http://localhost:8080/api/payments/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          alert(verifyResponse.data.message);
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone,
        },
        theme: {
          color: "#3b75ef",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const handleBooking = () => {
    if (paymentMethod === "cash") {
      console.log("Cash Payment Selected - No action for now.");
      alert("Booking with cash selected. You will implement this later.");
    } else {
      handlePayment();
    }
  };

  return (
    <div className="">
      <p className=" capitalize text-[14px] font-light text-gray-600 flex items-center gap-2 mt-10 mb-3">
        <LuCopyCheck className="text-xl text-primary" /> All your payments are
        fast and secured
      </p>
      <div className="payment-selection font-inter flex flex-col my-4 px-10 bg-gray-50 py-2 rounded-xl border-[1px] border-primary mx-8">
        <p className="text-[16px] text-gray-600 tracking-tighter capitalize mb-2">
          select a payment method :{" "}
          <span className=" uppercase text-[14px] text-primary">
            {paymentMethod ? paymentMethod : ""}
          </span>
        </p>
        <div className="selection flex flex-col gap-2">
          <div
            className={`cash w-full flex items-center justify-between px-3 py-[6px] border-[1px] rounded-md cursor-pointer hover:scale-105 transition-all duration-300 ${
              paymentMethod === "cash"
                ? "bg-primary/10 border-primary text-primary font-medium"
                : "bg-gray-100 border-gray-200 text-gray-600 font-light"
            }`}
            onClick={() => setPaymentMethod("cash")}
          >
            <div className="flex items-center gap-2 ">
              <MdOutlinePayments />
              <p className="text-[14px]">Cash</p>
            </div>
            {paymentMethod === "cash" ? <LuCheck /> : <LuChevronRight />}
          </div>
          <div
            className={`cards w-full flex items-center justify-between  px-3 py-[6px] border-[1px] rounded-md  cursor-pointer hover:scale-105 transition-all duration-300 ${
              paymentMethod === "cards"
                ? "bg-primary/10 border-primary text-primary font-medium"
                : "bg-gray-100 border-gray-200 text-gray-600 font-light"
            }`}
            onClick={() => setPaymentMethod("cards")}
          >
            <div className="flex items-center gap-2 ">
              <LiaAddressCardSolid />
              <p className="text-[14px]">Cards</p>
            </div>
            {paymentMethod === "cards" ? <LuCheck /> : <LuChevronRight />}
          </div>
          {!showMore && (
            <p
              onClick={() => setShowMore(true)}
              className="capitalize text-[14px] text-primary flex items-center gap-2 my-1 tracking-tighter transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              show more <LuChevronsDown />
            </p>
          )}

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className=""
          >
            {showMore && (
              <div className="flex flex-col gap-2">
                <div
                  className={`upi w-full flex items-center justify-between  px-3 py-[6px] border-[1px] rounded-md  cursor-pointer hover:scale-105 transition-all duration-300 ${
                    paymentMethod === "upi"
                      ? "bg-primary/10 border-primary text-primary font-medium"
                      : "bg-gray-100 border-gray-200 text-gray-600 font-light"
                  }`}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <div className="flex items-center gap-2 ">
                    <RiSecurePaymentLine />
                    <p className="text-[14px]">UPI</p>
                  </div>
                  {paymentMethod === "upi" ? <LuCheck /> : <LuChevronRight />}
                </div>
                <div
                  className={`net-banking w-full flex items-center justify-between  px-3 py-[6px] border-[1px] rounded-md  cursor-pointer hover:scale-105 transition-all duration-300 ${
                    paymentMethod === "net-banking"
                      ? "bg-primary/10 border-primary text-primary font-medium"
                      : "bg-gray-100 border-gray-200 text-gray-600 font-light"
                  }`}
                  onClick={() => setPaymentMethod("net-banking")}
                >
                  <div className="flex items-center gap-2 ">
                    <RiSecurePaymentLine />
                    <p className="text-[14px]">Net-Banking</p>
                  </div>
                  {paymentMethod === "net-banking" ? (
                    <LuCheck />
                  ) : (
                    <LuChevronRight />
                  )}
                </div>
                <div
                  className={`emi w-full flex items-center justify-between  px-3 py-[6px] border-[1px] rounded-md  cursor-pointer hover:scale-105 transition-all duration-300 ${
                    paymentMethod === "emi"
                      ? "bg-primary/10 border-primary text-primary font-medium"
                      : "bg-gray-100 border-gray-200 text-gray-600 font-light"
                  }`}
                  onClick={() => {
                    setPaymentMethod("emi");
                    setShowMore(false);
                  }}
                >
                  <div className="flex items-center gap-2 ">
                    <PiContactlessPayment />
                    <p className="text-[14px]">EMI</p>
                  </div>
                  {paymentMethod === "emi" ? <LuCheck /> : <LuChevronRight />}
                </div>
              </div>
            )}
          </motion.div>

          {showMore && (
            <p
              onClick={() => setShowMore(false)}
              className="capitalize text-[14px] text-primary flex items-center gap-2 mt-2 tracking-tighter transition-colors duration-300 hover:text-blue-700 cursor-pointer"
            >
              show less <LuChevronsUp />
            </p>
          )}
        </div>
      </div>

      {/* BOOK-BUTTON */}
      <div className="flex items-center justify-center mt-10">
        <div
          className="group relative cursor-pointer w-40 border bg-white rounded-full overflow-hidden text-primary font-semibold hover:shadow-lg transition-shadow duration-300"
          onClick={handleBooking}
        >
          <span className="translate-x-8 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-500 ease-in-out inline-block px-3 py-2">
            Book Now
          </span>
          <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-in-out">
            <span>Book Now</span>
            <LuCalendarPlus className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
          <div className="absolute top-[50%] left-[15%] -translate-y-1/2 h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-[#3b75ef] scale-[1] dark:group-hover:bg-[#3b75ef] group-hover:bg-[#3b75ef] group-hover:scale-[1.8] transition-all duration-500 ease-out group-hover:top-[0%] group-hover:left-[0%] group-hover:translate-y-0"></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentButton;
