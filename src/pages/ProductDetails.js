import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { PRODUCT, ADD_TO_CART } from '../utility/Constant'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import SlickSlider from '../components/SlickSlider'

const ProductDetails = () => {
    const navigate = useNavigate()
    const { pid } = useParams()
    const [sizeArr, setsizeArr] = useState([])
    const [colorArr, setcolorArr] = useState([])
    const [quantity, setquantity] = useState(1)
    const [productObj, setproductObj] = useState({})

    const singleProduct = () => {
        axios.get(PRODUCT + pid)
            .then((response) => {
                console.log(response.data.singleproduct)
                setproductObj(response.data.singleproduct)
                const { product_size, product_color } = response.data.singleproduct
                setsizeArr(product_size.split(","))
                setcolorArr(product_color.split(","))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        singleProduct()
    }, [])

    const increQuantity = () => {
        // console.log("increment")
        setquantity(quantity + 1)
    }
    const decreQuantity = () => {
        // console.log("decrement")
        if (quantity > 1) {
            setquantity(quantity - 1)
        }
    }
    const addToCart = () => {
        navigate("/login")
    }

    return (
        <div>
            <Header />
            <section className="sec-product-detail bg0 p-t-50 p-b-60">
                <div className="row">
                    <div className="col-md-6 col-lg-7 p-b-30">
                        <div className="p-l-25 p-r-30 p-lr-0-lg">
                            <div className="wrap-slick3 flex-sb flex-w">
                                <div className="wrap-slick3-dots"></div>
                                <div className="wrap-slick3-arrows flex-sb-m flex-w"></div>
                                <div className="slick3 gallery-lb">
                                    <SlickSlider
                                        data={productObj.product_imageurl}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-5 p-b-30">
                        <div className="p-r-50 p-t-5 p-lr-0-lg">
                            <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                                {productObj.product_brand}&nbsp;
                                {productObj.product_variant_name}
                            </h4>

                            <span className="mtext-106 cl2">
                                &#8377; {productObj.product_mrp}
                            </span>

                            <p className="stext-102 cl3 p-t-23">
                                {productObj.product_description}
                            </p>

                            <div className="p-t-33">
                                <div className="flex-w flex-r-m p-b-10">
                                    <div className="size-203 flex-c-m respon6">
                                        Size
                                    </div>

                                    <div className="size-204 respon6-next bor19">
                                        <select
                                            className="form-select stext-100 cl2 plh3 size-116 p-lr-14"
                                            style={{ fontSize: 15, border: 'none', backgroundColor: 'white', paddingLeft: 16, boxShadow: 'none' }}
                                        >
                                            <option selected>Select a Size *</option>
                                            {sizeArr.map((sizedata, index) =>
                                                <option value={sizedata} key={index}>{sizedata}</option>)}

                                        </select>
                                    </div>
                                </div>

                                <div className="flex-w flex-r-m p-b-10">
                                    <div className="size-203 flex-c-m respon6">
                                        Color
                                    </div>

                                    <div className="size-204 respon6-next bor19">
                                        <select
                                            className="form-select stext-100 cl2 plh3 size-116 p-lr-14"
                                            style={{ fontSize: 15, border: 'none', backgroundColor: 'white', paddingLeft: 16, boxShadow: 'none' }}
                                        >
                                            <option selected>Select a Color *</option>
                                            {colorArr.map((colordata, index) =>
                                                <option value={colordata} key={index}>{colordata}</option>)}

                                        </select>
                                    </div>
                                </div>

                                <div className="flex-w flex-r-m p-b-10">
                                    <div className="size-204 flex-w flex-m respon6-next">
                                        <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                            <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                                onClick={decreQuantity}
                                            >
                                                <i className="fs-16 zmdi zmdi-minus"></i>
                                            </div>
                                            <input className="mtext-104 cl3 txt-center num-product"
                                                type="number"
                                                value={quantity}
                                                name="quantity"
                                                onChange={(e) => setquantity(e.target.value)}
                                            />

                                            <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                                onClick={increQuantity}
                                            >
                                                <i className="fs-16 zmdi zmdi-plus"></i>
                                            </div>
                                        </div>

                                        <button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
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
