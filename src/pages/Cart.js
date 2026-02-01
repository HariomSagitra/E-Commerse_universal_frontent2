import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ADD_TO_CART, CART_DETAILS, DELETE_CART_ITEM } from '../utility/Constant'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  let sum = 0
  const navigate = useNavigate()
  const [cartid, setcartid] = useState("")

  const [cartdetails, setcartdetails] = useState([])

  useEffect(() => {
    getCartDetails()
  }, [])

  const getCartDetails = () => {
    var c_id = localStorage.getItem("id")
    axios.get(CART_DETAILS + c_id)
      .then((response) => {
        console.log(response)
        setcartdetails(response.data.cartdetails.products)
        setcartid(response.data.cartdetails._id)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const increQuantity = (cartdetail) => {
    console.log("increment")
    var id = localStorage.getItem("id")
    let params = {
      "product_id": cartdetail.product_id,
      "product_quantity": cartdetail.product_quantity + 1,
      "product_brand": cartdetail.product_brand,
      "product_variant_name": cartdetail.product_variant_name,
      "product_description": cartdetail.product_description,
      "product_price": cartdetail.product_sellingprice,
      "product_imageurl": cartdetail.product_imageurl[0].path
    }
    console.log(params)
    axios.post(ADD_TO_CART + id, params)
      .then((response) => {
        console.log(response)
        getCartDetails()
      })
      .catch((err) => {
        alert(err)
      })
  }
  const decreQuantity = (cartdetail) => {
    console.log("decrement")
    if (cartdetail.product_quantity > 1) {
      var id = localStorage.getItem("id")
      let params = {
        "product_id": cartdetail.product_id,
        "product_quantity": cartdetail.product_quantity - 1,
        "product_brand": cartdetail.product_brand,
        "product_variant_name": cartdetail.product_variant_name,
        "product_description": cartdetail.product_description,
        "product_price": cartdetail.product_sellingprice,
        "product_imageurl": cartdetail.product_imageurl[0].path
      }
      console.log(params)
      axios.post(ADD_TO_CART + id, params)
        .then((response) => {
          console.log(response)
          getCartDetails()
        })
        .catch((err) => {
          alert(err)
        })
    }
  }
  const handleDelete = (product_id) => {
    var url = DELETE_CART_ITEM + cartid + "&product_id=" + product_id
    console.log(url)
    axios.put(url)
      .then((response) => {
        getCartDetails()
        alert(response.data.msg)
      })
      .catch((err) => {
        console.log(err)
        alert("Product Not Deleted")
      })
  }
  const handleContinue = () => {
    navigate('/customer/makepayment', { state: sum })
  }
  const handleHome = () => {
    navigate("/customer")
  }

  return (
    <div>
      <Header />
      <h1 style={{ marginTop: 60, textAlign: 'center' }}></h1>

      <div className="row">
        {cartdetails.length > 0 ?
          <div className="col-lg-12 col-xl-12 m-b-50">
            <div className="m-l-25 m-r--38 m-lr-0-xl">
              <div className="wrap-table-shopping-cart">
                <table className="table-shopping-cart">
                  <thead>
                    <tr className="table_head">
                      <th className="column-1">S.No</th>
                      <th className="column-1">Image</th>
                      <th className="column-2">Product</th>
                      <th className="column-3">Price</th>
                      <th className="column-4">Quantity</th>
                      <th className="column-5">Total</th>
                      <th className="column-5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartdetails.map((cart, index) =>
                      <tr className="table_row" key={index}>
                        <td className="column-1">{index + 1}</td>

                        <td className="column-1">
                          <div className="how-itemcart1">
                            <img src={cart.product_imageurl} alt="IMG" />
                          </div>
                        </td>
                        <td className="column-2">{cart.product_brand}&nbsp;{cart.product_variant_name}</td>
                        <td className="column-3">&#8377;{cart.product_price}</td>
                        <td className="column-4">
                          <div className="wrap-num-product flex-w m-l-auto m-r-0">
                            <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                              onClick={() => decreQuantity(cart)}
                            >
                              <i className="fs-16 zmdi zmdi-minus"></i>
                            </div>

                            <input className="mtext-104 cl3 txt-center num-product" type="number" name="num-product1"
                              value={cart.product_quantity}
                            />
                            <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                              onClick={() => increQuantity(cart)}
                            >
                              <i className="fs-16 zmdi zmdi-plus"></i>
                            </div>
                          </div>
                        </td>
                        <td className="column-5">
                          <b>&#8377;{Math.round((cart.product_price * cart.product_quantity) * 100) / 100}</b>

                          <input type='hidden' value={sum += Math.round((cart.product_price * cart.product_quantity) * 100) / 100} />
                        </td>
                        <td>
                          <button
                            className="flex-c-m stext-101 cl0 size-121 bg10 bor1 hov-btn3 p-lr-15 trans-04 pointer"
                            onClick={() => handleDelete(cart.product_id)}
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

              </div>
              <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                <div className="flex-w flex-m m-r-20 m-tb-5">
                  <h5>Total:&#8377;{sum.toFixed(2)}</h5>
                </div>

                <div className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10"
                  onClick={handleContinue}
                >
                  Place Order
                </div>

              </div>

            </div>
          </div> :
          <div align='center'>
            <img src='https://bakestudio.in/assets/images/cart/empty-cart.gif' alt="IMG" />
            <h1>Your cart is empty</h1>
            <button className="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-20"
              onClick={handleHome}>
              Shop Now
            </button>
          </div>}
      </div>
      <Footer />
    </div>
  )
}

export default Cart
