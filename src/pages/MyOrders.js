import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { ORDER_LIST } from '../utility/Constant'
import { useNavigate, Link } from 'react-router-dom'

const MyOrders = () => {
    const navigate = useNavigate()

    const [orderList, setorderList] = useState([])

    useEffect(() => {
        var c_id = localStorage.getItem('id')
        axios.get(ORDER_LIST + c_id)
            .then((response) => {
                console.log(response)
                setorderList(response.data.orderlist[0].orders)
            })
            .catch((err) => {
                console.log(err)
                // alert(err)
            })
    }, [])
    return (
        <div>
            <Header />
            <div id="wrapper"
                className="container ">
                <div className="row">
                    <div className="span12">
                        <h4 className="title"><span className="text"><strong>MY</strong> ORDERS</span></h4>
                        {orderList.length > 0 ?
                            <table className="table table-striped" style={{ fontSize: 20, marginBottom: 100 }}>
                                <thead>
                                    <tr>
                                        <th> Brand</th>
                                        <th> Variant</th>
                                        <th> Description</th>
                                        <th> Image</th>
                                        <th> Price</th>
                                        <th> Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderList.map((order, index) =>
                                        <tr key={order.product_id}>
                                            <td>{order.product_brand}</td>
                                            <td>{order.product_variant_name}</td>
                                            <td>{order.product_description}</td>
                                            <td>
                                                <img src={order.product_imageurl}
                                                    style={{ width: 100, height: 100 }}
                                                />
                                            </td>
                                            <td>
                                                &#8377;{order.product_price}
                                            </td>
                                            <td>
                                                {order.product_quantity}
                                            </td>
                                            <td>&#8377;{order.product_price * order.product_quantity}
                                                {/* <p style={{ display: 'none' }}>{grandTotal += order.product_price * order.product_quantity}</p> */}

                                            </td>
                                            <td><Link to={`/productdetails/${order.product_id}`}>DETAILS</Link></td>
                                        </tr>
                                    )}
                                    
                                </tbody>
                            </table> : <h3>Your Order List is Empty</h3>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MyOrders
