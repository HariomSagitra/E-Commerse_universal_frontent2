// import React, { useEffect,useState } from 'react'

// import { useLocation,useNavigate } from 'react-router-dom'
// import {ORDER_LIST,CUSTOMER_PROFILE} from '../utility/Constant'
// import axios from 'axios'
// import Footer from '../components/Footer'
// import Header from '../components/Header'

// const ViewOrders = () => {
//     const navigate = useNavigate()
//     const location = useLocation()
//     const [orderList, setorderList] = useState([])
//     const [name, setname] = useState("")
//     useEffect(() => {
//         console.log("Customer Id:", location.state)
//         var c_id = location.state
//         getProfileDetails(c_id)
//         axios.get(ORDER_LIST + c_id)
//             .then((response) => {
//                 console.log(response)
//                 setorderList(response.data.orderlist[0].orders)
//             })
//             .catch((err) => {
//                 console.log(err)
//                 // alert(err)
//             })
//     }, [])

//     const getProfileDetails = (c_id) => {
//         axios.get(CUSTOMER_PROFILE + c_id)
//             .then((response) => {
//                 console.log(response.data)
//                 const { email, gender, mobile, name,city, pincode, state } = response.data.record
//                 setname(name)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }

//     return (
//         <div>
//             <Header />
//             <div className="bg0 p-t-40 p-b-85" >
//                 <h4 className="mtext-105 cl2 txt-center p-b-30">
//                     {name}'s Order
//                 </h4>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
//                             <div className="m-r--38 m-lr-0-xl">
//                     <div className="wrap-table-shopping-cart">
//                         {orderList.length > 0 ?
//                         <table className="table-shopping-cart">
//                             <tr className="table_head">
//                             <th className="column-1">S.No</th>
//                             <th className="column-1"></th>
//                             <th className="column-1">Product</th>
//                             <th className="column-1">Price</th>
//                              <th className="column-1">Quantity</th>
//                         </tr>
//                         {orderList.map((order, index) =>
//                         <tr className="table_row" key={index}>
//                             <td className="column-1">
//                                     {index + 1}
//                             </td>
//                             <td className="column-1">
//                             <div className="how-itemcart1">
//                                 <img src={order.product_imageurl} alt="IMG" />
//                             </div>
//                                 </td>
//                             <td className="column-1">{order.product_brand}&nbsp;{order.product_variant_name}</td>
//                             <td className="column-1">&#8377; {order.product_price}</td>
//                             <td className="column-1" style={{ textAlign: 'center' }}>
//                             {order.product_quantity}
//                                                     </td>

//                                                 </tr>
//                                             )}
//                                         </table> : <div>
//                                             <h3 style={{ textAlign: 'center' }}>No Order Found</h3><br></br>
//                                             </div>}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default ViewOrders

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ORDER_LIST, CUSTOMER_PROFILE } from "../utility/Constant";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ViewOrders = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [orderList, setorderList] = useState([]);
  const [name, setname] = useState("");

  useEffect(() => {
    if (!location.state) {
      navigate("/");
      return;
    }

    const customerId = location.state;
    getProfileDetails(customerId);
    getOrders(customerId);
  }, []);

  const getProfileDetails = (customerId) => {
    axios
      .get(CUSTOMER_PROFILE + customerId)
      .then((response) => {
        setname(response.data.record?.name || "");
      })
      .catch((err) => console.log(err));
  };

  const getOrders = (customerId) => {
    axios
      .get(ORDER_LIST + customerId)
      .then((response) => {
        const orders = response.data?.orderlist?.[0]?.orders || [];
        setorderList(orders);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />

      <div className="bg0 p-t-40 p-b-85">
        <h4 className="mtext-105 cl2 txt-center p-b-30">
          {name ? `${name}'s Orders` : "Orders"}
        </h4>

        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-8 m-lr-auto m-b-50">
              <div className="wrap-table-shopping-cart">
                {orderList.length > 0 ? (
                  <table className="table-shopping-cart">
                    <thead>
                      <tr className="table_head">
                        <th className="column-1">S.No</th>
                        <th className="column-1">Image</th>
                        <th className="column-2">Product</th>
                        <th className="column-3">Price</th>
                        <th className="column-4">Quantity</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orderList.map((order, index) => (
                        <tr className="table_row" key={index}>
                          <td className="column-1">{index + 1}</td>

                          <td className="column-1">
                            <div className="how-itemcart1">
                              <img
                                // src={order.product_imageurl}
                                // alt="product"
                                src={order.product_imageurl?.[0]?.path}
                                alt="IMG"
                                onError={(e) =>
                                  (e.target.src =
                                    "https://via.placeholder.com/80")
                                }
                              />
                            </div>
                          </td>

                          <td className="column-2">
                            {order.product_brand} {order.product_variant_name}
                          </td>

                          <td className="column-3">₹{order.product_price}</td>

                          <td
                            className="column-4"
                            style={{ textAlign: "center" }}
                          >
                            {order.product_quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <h3 style={{ textAlign: "center" }}>No Orders Found</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ViewOrders;
