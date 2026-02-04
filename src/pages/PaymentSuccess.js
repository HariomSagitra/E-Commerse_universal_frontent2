import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { EMPTY_CARD, CREATE_ORDER, CART_DETAILS } from "../utility/Constant";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referenceNum = searchParams.get("reference");

  const [loading, setLoading] = useState(true);
  const [orderDone, setOrderDone] = useState(false);

  const c_id = localStorage.getItem("id");

  useEffect(() => {
    if (!referenceNum || orderDone) return;
    createOrderFlow();
    // eslint-disable-next-line
  }, []);

  const createOrderFlow = async () => {
    try {
      const cartRes = await axios.get(CART_DETAILS + c_id);
      const cartData = cartRes.data.cartdetails?.products;

      if (!cartData || cartData.length === 0) {
        setLoading(false);
        return;
      }

      const orderData = {
        customer_id: c_id,
        orders: cartData.map(item => ({
          product_id: item.product_id,
          product_brand: item.product_brand,
          product_variant_name: item.product_variant_name,
          product_description: item.product_description,
          product_price: item.product_price,
          product_quantity: item.product_quantity,
          product_imageurl: item.product_imageurl
        }))
      };

      await axios.post(CREATE_ORDER, orderData);
      await axios.get(EMPTY_CARD + c_id);

      setOrderDone(true);
      setLoading(false);

    } catch (error) {
      console.error("Payment success flow error:", error);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      {loading ? (
        <h2>Processing your order...</h2>
      ) : (
        <>
          <h1>✅ Payment Successful</h1>
          <p><b>Payment ID:</b> {referenceNum}</p>
          <p>Your order has been placed successfully 🎉</p>

          <button
            style={{ marginTop: 20, padding: "10px 20px" }}
            onClick={() => navigate("/customer/orders")}
          >
            View My Orders
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
