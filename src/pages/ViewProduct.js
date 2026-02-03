import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { C_URL, PRODUCT_LIST, FILTER, DELETE_PRODUCT } from '../utility/Constant'
import { useNavigate } from 'react-router-dom'
const ViewProduct = () => {
    const navigate = useNavigate()

    const [productDetails, setproductDetails] = useState([])

    const getProductDetails = () => {
        axios.get(PRODUCT_LIST)
            .then((response) => {
                console.log(response)
                setproductDetails(response.data.allproduct)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getProductDetails()
    }, [])



    const handleDelete = (product_id) => {
        var url = DELETE_PRODUCT + product_id
        console.log(url)
        axios.delete(url)
            .then((response) => {
                getProductDetails()
                alert(response.data.msg)
            })
            .catch((err) => {
                console.log(err)
                alert("Product Not Deleted")
            })
    }

    const handleHome = () => {
        navigate("/admin/addproduct")
    }

    const handleEditProduct = (product_id) => {
        navigate("/admin/editproduct", { state: product_id })
    }

    return (
        <div>
            <Header />
            <div className="row" style={{marginTop:50}}>
                {productDetails.length > 0 ?
                    <div className="col-lg-12 col-xl-12 m-b-50">
                        <div className="wrap-table-shopping-cart">
                            <table className="table-shopping-cart">
                                <thead>
                                    <tr className="table_head">
                                        <th className="column-1">S.No</th>
                                        <th className="column-1">Image</th>
                                        <th className="column-1">Product</th>
                                        <th className="column-1">Price</th>
                                        <th className="column-1">Quantity</th>
                                        <th className="column-1">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productDetails.map((product, index) =>
                                        <tr className="table_row" key={index}>
                                            <td className="column-1">{index + 1}</td>
                                            <td className="column-1">
                                                <div className="how-itemcart1">
                                                    <img src={product.product_imageurl[0].path} alt="IMG" />
                                                </div>
                                            </td>
                                            <td className="column-1">
                                                {product.product_brand} |    {product.product_variant_name}
                                            </td>
                                            <td className="column-1">&#8377;
                                                {product.product_sp}
                                            </td>
                                            <td className="column-1">
                                                {product.product_quantity}
                                            </td>
                                            <td className="column-1">
                                                <button
                                                    className="flex-c-m stext-101 cl0 size-121 bg10 bor1 hov-btn3 p-lr-15 trans-04 pointer"
                                                    onClick={() => handleDelete(product._id)}
                                                >
                                                    DELETE
                                                </button>
                                            </td>
                                            <td className="column-1">
                                                <button
                                                    className="flex-c-m stext-101 cl0 size-121 bg11 bor1 hov-btn3 p-lr-15 trans-04 pointer"
                                                    onClick={() => handleEditProduct(product._id)}
                                                >
                                                    Edit Product
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>



                    </div> :
                    <div align='center'>

                        <h1>No Product Found</h1>
                        <button className="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-20"
                            onClick={handleHome}>
                            Add Product
                        </button>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}

export default ViewProduct
