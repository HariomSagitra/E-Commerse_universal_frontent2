import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { PRODUCT_DETAILS, ADD_TO_CART } from '../utility/Constant'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import SlickSlider from '../components/SlickSlider'

const CustomerProductDetails = () => {
  const navigate = useNavigate()
  const { pid } = useParams()

  const [sizeArr, setSizeArr] = useState([])
  const [colorArr, setColorArr] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [productObj, setProductObj] = useState(null)

  // ================= FETCH SINGLE PRODUCT =================
  const singleProduct = async () => {
    try {
      const res = await axios.get(PRODUCT_DETAILS + pid)
      const product = res.data.singleproduct
      console.log("PRODUCT:", product)

      setProductObj(product)

      if (product?.product_size) {
        setSizeArr(product.product_size.split(','))
      }
      if (product?.product_color) {
        setColorArr(product.product_color.split(','))
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    singleProduct()
  }, [])

  // ================= QUANTITY =================
  const increQuantity = () => setQuantity(prev => prev + 1)
  const decreQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1)
  }

  // ================= ADD TO CART =================
  const addToCart = async () => {
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (!token || role !== "customer") {
      navigate("/login")
      return
    }

    const params = {
      product_id: pid,
      product_quantity: quantity,
      product_brand: productObj.product_brand,
      product_variant_name: productObj.product_variant_name,
      product_description: productObj.product_description,
      product_price: productObj.product_sp,
      product_imageurl: productObj?.product_imageurl?.[0]?.path || ""
    }

    try {
      const res = await axios.post(ADD_TO_CART + id, params)
      alert(res.data.msg)
      navigate("/customer/cart")
    } catch (err) {
      alert("Not added Item in Cart")
    }
  }

  if (!productObj) return null

  return (
    <div>
      <Header />

      <section className="sec-product-detail bg0 p-t-50 p-b-60">
        <div className="row">

          {/* LEFT : IMAGES */}
          <div className="col-md-6 col-lg-7 p-b-30">
            <div className="p-l-25 p-r-30 p-lr-0-lg">
              <div className="wrap-slick3 flex-sb flex-w">
                <div className="wrap-slick3-dots"></div>
                <div className="wrap-slick3-arrows flex-sb-m flex-w"></div>

                <div className="slick3 gallery-lb">
                  <SlickSlider data={productObj.product_imageurl || []} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT : DETAILS */}
          <div className="col-md-6 col-lg-5 p-b-30">
            <div className="p-r-50 p-t-5 p-lr-0-lg">

              <h4 className="mtext-105 cl2 p-b-14">
                {productObj.product_brand} {productObj.product_variant_name}
              </h4>

              <span className="mtext-106 cl2">
                ₹{productObj.product_sp}&nbsp;&nbsp;
                <del style={{ color: 'darkgoldenrod' }}>
                  ₹{productObj.product_mrp}
                </del>
                <span style={{ color: 'green' }}>
                  &nbsp;{productObj.product_discount}% Off
                </span>
              </span>

              <p className="stext-102 cl3 p-t-23">
                {productObj.product_description}
              </p>

              {/* OPTIONS */}
              <div className="p-t-33">

                {/* SIZE */}
                <div className="flex-w flex-r-m p-b-10">
                  <div className="size-203 flex-c-m respon6">Size</div>
                  <div className="size-204 respon6-next bor19">
                    <select className="form-select">
                      <option>Select a Size *</option>
                      {sizeArr.map((s, i) => (
                        <option key={i}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* COLOR */}
                <div className="flex-w flex-r-m p-b-10">
                  <div className="size-203 flex-c-m respon6">Color</div>
                  <div className="size-204 respon6-next bor19">
                    <select className="form-select">
                      <option>Select a Color *</option>
                      {colorArr.map((c, i) => (
                        <option key={i}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* QUANTITY + CART */}
                <div className="flex-w flex-r-m p-b-10">
                  <div className="wrap-num-product flex-w m-r-20">
                    <button onClick={decreQuantity}>-</button>
                    <input value={quantity} readOnly />
                    <button onClick={increQuantity}>+</button>
                  </div>

                  <button onClick={addToCart}>
                    Add to cart
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CustomerProductDetails
