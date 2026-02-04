import React from 'react'
import axios from 'axios'
import Header from '../components/Header'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'

// ✅ CHANGE THIS TO YOUR REAL BACKEND URL
//const BACKEND_URL = "https://e-commerce-universal-backend.onrender.com";
const BACKEND_URL = "https://e-commerse-universal-backend.onrender.com";

export default function MakePayment() {

    const location = useLocation();

    const checkoutHandler = async (amount) => {
        try {

            // 🔑 1️⃣ GET RAZORPAY KEY
            const { data } = await axios.get(
                `${BACKEND_URL}/customer/getkey`
            );

            const key = data.key;

            // 💰 2️⃣ CREATE ORDER
            const orderResponse = await axios.post(
                `${BACKEND_URL}/customer/checkout`,
                { amount }
            );

            const order = orderResponse.data.order;
            console.log("Order:", order);

            // 💳 3️⃣ RAZORPAY OPTIONS
            const options = {
                key: key,
                amount: order.amount,
                currency: "INR",
                name: "Videh Jaiswal",
                description: "Tutorial of RazorPay",
                image: "https://avatars.githubusercontent.com/u/75520279?v=4",
                order_id: order.id,

                // ❌ localhost hata diya
                // ✅ live backend callback
                callback_url: `${BACKEND_URL}/customer/paymentverification`,

                prefill: {
                    name: "Videh Jaiswal",
                    email: "videhjaiswal@example.com",
                    contact: "9999999999"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#121212"
                }
            };

            console.log("Razorpay Options:", options);

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
