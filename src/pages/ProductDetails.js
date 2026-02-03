import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { PRODUCT_DETAILS } from '../utility/Constant'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import SlickSlider from '../components/SlickSlider'

const ProductDetails = () => {
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

      // safe split
      if (product?.product_size) {
        setSizeArr(product.product_size.split(','))
      }
      if (product?.product_color) {
        setColorArr(product.product_color.split(','))
      }
    } catch (error) {
      console.error("Product fetch error:", error)
    }
  }

  useEffect(() => {
    singleProduct()
  }, [])

  // ================= QUANTITY =================
  const increQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decreQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  // ================= ADD TO CART =================
  const addToCart = () => {
    navigate('/login')
  }

  if (!productObj) return null

  return (
    <div>
      <Header />

      <section className="sec-product-detail bg0 p-t-50 p-b-60">
        <div className="row">

          {/* ========== LEFT : IMAGES ========== */}
          <div className="col-md-6 col-lg-7 p-b-30">
            <div className="p-l-25 p-r-30 p-lr-0-lg">
              <div className="wrap-slick3 flex-sb flex-w">
                <div className="wrap-slick3-dots"></div>
                <div className="wrap-slick3-arrows flex-sb-m flex-w"></div>

                <div className="slick3 gallery-lb">
                  {/* ✅ CLOUDINARY IMAGE ARRAY */}
                  <SlickSlider data={productObj?.product_imageurl || []} />
                </div>
              </div>
            </div>
          </div>

          {/* ========== RIGHT : DETAILS ========== */}
          <div className="col-md-6 col-lg-5 p-b-30">
            <div className="p-r-50 p-t-5 p-lr-0-lg">

              <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                {productObj.product_brand} {productObj.product_variant_name}
              </h4>

              <span className="mtext-106 cl2">
                ₹ {productObj.product_sp}
              </span>

              <p className="stext-102 cl3 p-t-23">
                {productObj.product_description}
              </p>

              {/* ========== OPTIONS ========== */}
              <div className="p-t-33">

                {/* SIZE */}
                <div className="flex-w flex-r-m p-b-10">
                  <div className="size-203 flex-c-m respon6">Size</div>
                  <div className="size-204 respon6-next bor19">
                    <select className="form-select stext-100 cl2 plh3 size-116 p-lr-14">
                      <option>Select a Size *</option>
                      {sizeArr.map((size, i) => (
                        <option key={i} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* COLOR */}
                <div className="flex-w flex-r-m p-b-10">
                  <div className="size-203 flex-c-m respon6">Color</div>
                  <div className="size-204 respon6-next bor19">
                    <select className="form-select stext-100 cl2 plh3 size-116 p-lr-14">
                      <option>Select a Color *</option>
                      {colorArr.map((color, i) => (
                        <option key={i} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* QUANTITY + CART */}
                <div className="flex-w flex-r-m p-b-10">
                  <div className="size-204 flex-w flex-m respon6-next">

                    <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                      <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                        onClick={decreQuantity}>
                        <i className="fs-16 zmdi zmdi-minus"></i>
                      </div>

                      <input
                        className="mtext-104 cl3 txt-center num-product"
                        type="number"
                        value={quantity}
                        readOnly
                      />

                      <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                        onClick={increQuantity}>
                        <i className="fs-16 zmdi zmdi-plus"></i>
                      </div>
                    </div>

                    <button
                      className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                      onClick={addToCart}
                    >
                      Add to cart
                    </button>

                  </div>
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

export default ProductDetails
