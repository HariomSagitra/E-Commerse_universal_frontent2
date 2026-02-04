// import React, { useEffect } from 'react'
// import { useSearchParams } from "react-router-dom"
// import { useNavigate } from 'react-router-dom'
// import { EMPTY_CARD, CREATE_ORDER, CART_DETAILS } from '../utility/Constant'
// import axios from 'axios'

// const PaymentSuccess = () => {
//     const navigate = useNavigate()
//     const seachQuery = useSearchParams()[0]
//     const referenceNum = seachQuery.get("reference")
//     var c_id = localStorage.getItem("id")

//     useEffect(() => {
//         if (referenceNum) {
//             getCartDetails()
//         } else {
//             navigate("/customer/")
//         }
//     }, [])

//     const getCartDetails=()=>{
//         var c_id = localStorage.getItem("id")
//         axios.get(CART_DETAILS + c_id)
//             .then((response) => {
//                 console.log(response.data.cartdetails._id)
//                 let cartData = response.data.cartdetails.products
//                 console.log(cartData)
//                 createOrder(cartData, c_id);       
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }

//     const emptyCard = (c_id) => {
//         axios.get(EMPTY_CARD + c_id)
//             .then((response) => {
//                 // alert(response.data.msg)
//                 console.log(response)
//                 // navigate("/customer/cart")
//                 navigate("/customer/orders/")
//             })
//             .catch((err) => {
//                 alert(err)
//                 navigate("/customer")
//             })
//     }

//     const createOrder = (cartData, c_id) => {
//         if (!cartData || cartData.length === 0) {
//             console.log("Cart is empty, cannot place order");
//             return;
//         }
    
//         const orderData = {
//             customer_id: c_id,
//             orders: cartData.map(item => ({
//                 product_id: item.product_id,
//                 product_brand: item.product_brand,
//                 product_variant_name: item.product_variant_name,
//                 product_description: item.product_description,
//                 product_price: item.product_price,
//                 product_quantity: item.product_quantity,
//                 product_imageurl: item.product_imageurl
//             }))
//         };
    
//         axios.post(CREATE_ORDER, orderData) 
//             .then((response) => {
//                 console.log("Order Created Successfully:", response.data);
//                 var c_id = localStorage.getItem("id")
//                 emptyCard(c_id);
//             })
//             .catch((err) => {
//                 console.log("Error Creating Order:", err.response?.data || err.message);
//             });
//     };

//     return (
//         <div>
//             <h1>Order Successfully</h1>
//         </div>
//     )
// }
// export default PaymentSuccess

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
    // 🔒 prevent duplicate order on refresh
    if (!referenceNum || orderDone) return;

    createOrderFlow();
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
            style={{ marginTop: 20 }}
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
