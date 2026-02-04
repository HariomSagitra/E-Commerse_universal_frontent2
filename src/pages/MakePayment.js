import React from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

// ✅ REAL BACKEND URL
const BACKEND_URL = "https://e-commerse-universal-backend.onrender.com";

export default function MakePayment() {
  const location = useLocation();
  const navigate = useNavigate();

  const checkoutHandler = async (amount) => {
    try {
      // 1️⃣ GET RAZORPAY KEY
      const { data } = await axios.get(
        `${BACKEND_URL}/customer/getkey`
      );
      const key = data.key;

      // 2️⃣ CREATE ORDER
      const orderResponse = await axios.post(
        `${BACKEND_URL}/customer/checkout`,
        { amount }
      );
      const order = orderResponse.data.order;

      // 3️⃣ RAZORPAY OPTIONS (IMPORTANT PART)
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Videh Jaiswal",
        description: "Order Payment",

        // ✅ ONLY THIS HANDLER (NO callback_url)
        handler: function (response) {
          axios
            .post(`${BACKEND_URL}/customer/paymentverification`, response)
            .then(() => {
              navigate(
                `/customer/paymentsuccess?reference=${response.razorpay_payment_id}`
              );
            })
            .catch(() => {
              alert("Payment verification failed");
            });
        },

        prefill: {
          name: "Videh Jaiswal",
          email: "videhjaiswal@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#121212",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <h1 style={{ marginTop: 60 }}>Make Payment</h1>

      <button
        className="btn btn-sm btn-success"
        onClick={() => checkoutHandler(location.state)}
      >
        Pay ₹ {location.state} with Razorpay
      </button>

      <Footer />
    </div>
  );
}
