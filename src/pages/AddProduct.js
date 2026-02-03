import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import axios from 'axios'
import { ADD_PRODUCT } from '../utility/Constant'
import Header from '../components/Header'

const AddProduct = () => {
  let imgarr = []
  const [pdesc, setpdesc] = useState("")
  const [p_sprice, setp_sprice] = useState(0.0)
  const [p_mprice, setp_mprice] = useState(0.0)
  const [p_color, setp_color] = useState("")
  const [p_brand, setp_brand] = useState("")
  const [p_variant, setp_variant] = useState("")
  const [p_category, setp_category] = useState("")
  const [p_availability, setp_availability] = useState("")
  const [p_discount_percentage, setp_discount_percentage] = useState()
  const [p_size, setp_size] = useState("")
  const [p_quantity, setp_quantity] = useState(1)


  const saveFile = (e) => {
    console.log(e.target.files.length, e.target.files[0])
    for (var a = 0; a < e.target.files.length; a++) {
      imgarr.push(e.target.files[a])
    }
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("product_brand", p_brand)
    formdata.append("product_variant_name", p_variant)
    formdata.append("product_mrp", p_mprice)
    formdata.append("product_sp", p_sprice)
    formdata.append("product_category", p_category)
    formdata.append("product_discount", p_discount_percentage)
    formdata.append("product_color", p_color)
    formdata.append("product_size", p_size)
    formdata.append("product_description", pdesc)
    formdata.append("product_quantity", p_quantity)
    formdata.append("product_availability", p_availability)
    imgarr.forEach(image => {
      formdata.append("product_imageurl", image)
    });
    axios.post(ADD_PRODUCT, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log(response)
        alert("Add Product Successfully!!!")
        setp_brand("")
        setp_variant("")
        setp_category("")
        setp_availability("")
        setpdesc("")
        setp_discount_percentage("")
        setp_mprice("")
        setp_quantity("")
        setp_sprice("")
        setp_size("")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Header />
      <section className="bg0 p-t-40 p-b-50">
        <div className="container">
            <div className="size-210 p-lr-70 p-t-10 p-b-20 p-lr-15-lg w-full-md" style={{ margin: 'auto' }}>
              <form onSubmit={handleAddProduct}>
                <h4 className="mtext-105 cl2 txt-center p-b-10">
                  Add Product
                </h4>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_brand"
                    required
                    onChange={(e) => setp_brand(e.target.value)}
                    placeholder="Enter a Product Brand"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_variant"
                    required
                    onChange={(e) => setp_variant(e.target.value)}
                    placeholder="Enter a Product Variant"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_category"
                    required
                    onChange={(e) => setp_category(e.target.value)}
                    placeholder="Enter a Product Category"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_mprice"
                    required
                    onChange={(e) => setp_mprice(e.target.value)}
                    placeholder="Enter a Product Max Price"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_sprice"
                    required
                    onChange={(e) => setp_sprice(e.target.value)}
                    placeholder="Enter a Product Selling Price"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_color"
                    required
                    onChange={(e) => setp_color(e.target.value)}
                    placeholder="Enter a Product Color"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_discount_percentage"
                    required
                    onChange={(e) => setp_discount_percentage(e.target.value)}
                    placeholder="Enter a Product Discount Percentage"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_size"
                    required
                    onChange={(e) => setp_size(e.target.value)}
                    placeholder="Enter a Product Size"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="pdesc"
                    required
                    onChange={(e) => setpdesc(e.target.value)}
                    placeholder="Enter a Product Description"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_quantity"
                    required
                    onChange={(e) => setp_quantity(e.target.value)}
                    placeholder="Enter a Product Quantity"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_availability"
                    required
                    onChange={(e) => setp_availability(e.target.value)}
                    placeholder="Enter a Product Availability"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="file"
                    multiple
                    name="upload_doc"
                    required
                    onChange={saveFile}
                  />
                </div>
                <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 p-lr-15 trans-04 pointer">
                  Add Product
                </button>
              </form>
            </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default AddProduct
