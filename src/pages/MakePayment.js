import React from 'react'
import axios from 'axios'
import Header from '../components/Header'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

export default function MakePayment() {

    const location = useLocation();

    const checkoutHandler = async (amount) => {
        try {

            const { data: { key } } = await axios.get("http://www.localhost:5000/customer/getkey")

            const { data: { order } } = await axios.post("http://localhost:5000/customer/checkout", {
                amount
            })

            console.log("Order:", order)

            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "Videh Jaiswal",
                description: "Tutorial of RazorPay",
                image: "https://avatars.githubusercontent.com/u/75520279?v=4",
                order_id: order.id,
                callback_url: "http://localhost:5000/customer/paymentverification",
                prefill: {
                    name: "Videh Jaiswal",
                    email: "videhjaiswal@example.com",
                    contact: "9999999999"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            console.log(options)
            console.log("window:",window)
            const razor = new window.Razorpay(options);
            console.log(razor)
            razor.open();

        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <div>
            <Header />
            <h1 style={{marginTop:60}}>Make Payment</h1>
            <button className="btn btn-sm btn-success"
                onClick={() => checkoutHandler(location.state)}
            >Pay ₹ {location.state} with Razorpay</button>
            <Footer />
        </div>
    )
}
