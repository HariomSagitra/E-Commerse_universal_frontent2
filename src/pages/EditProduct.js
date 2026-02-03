import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import { EDIT_PRODUCT, PRODUCT_DETAILS } from '../utility/Constant'
import Header from '../components/Header'

const EditProduct = () => {
  let imgarr = []
  const location = useLocation();
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
  const [existingImages, setExistingImages] = useState([]);

  const [newFiles, setNewFiles] = useState([]);

  const handleFileChange = (e) => {
    setNewFiles(Array.from(e.target.files));
  };

  useEffect(() => {
    getProductDetails()
  }, [])

  const getProductDetails = () => {
    var pid = location.state
    axios.get(PRODUCT_DETAILS + pid)
      .then((response) => {
        console.log(response)
        const {product_brand,product_variant_name,product_availability,product_description,product_discount,product_mrp,product_quantity,product_sp,product_size,product_color} = response.data.singleproduct
        var arrImages = response.data.singleproduct.product_imageurl.map((image)=>{
            return image.path
        })
        setExistingImages(arrImages)
        setp_brand(product_brand)
        setp_color(product_color)
        setp_variant(product_variant_name)
        setp_category(product_variant_name)
        setp_availability(product_availability)
        setpdesc(product_description)
        setp_discount_percentage(product_discount)
        setp_mprice(product_mrp)
        setp_quantity(product_quantity)
        setp_sprice(product_sp)
        setp_size(product_size)
        
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleEditProduct = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("product_brand", p_brand)
    formdata.append("product_variant_name", p_variant)
    formdata.append("product_mrp", p_mprice)
    formdata.append("product_sp", p_sprice)
    formdata.append("product_discount", p_discount_percentage)
    formdata.append("product_color", p_color)
    formdata.append("product_size", p_size)
    formdata.append("product_description", pdesc)
    formdata.append("product_quantity", p_quantity)
    formdata.append("product_availability", p_availability)
    newFiles.forEach(image => {
      formdata.append("product_imageurl", image)
    });
    axios.put(EDIT_PRODUCT+location.state, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log(response)
        alert("Edit Product Successfully!!!")
        getProductDetails()
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
              <form onSubmit={handleEditProduct}>
                <h4 className="mtext-105 cl2 txt-center p-b-10">
                  Edit Product<br></br>
                </h4>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_brand"
                    required
                    value={p_brand}
                    onChange={(e) => setp_brand(e.target.value)}
                    placeholder="Enter a Product Brand"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_variant"
                    value={p_variant}
                    required
                    onChange={(e) => setp_variant(e.target.value)}
                    placeholder="Enter a Product Variant"
                  />
                </div>
                {/* <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_category"
                    required
                    value={p_category}
                    onChange={(e) => setp_category(e.target.value)}
                    placeholder="Enter a Product Category"
                  />
                </div> */}
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_mprice"
                    required
                    value={p_mprice}
                    onChange={(e) => setp_mprice(e.target.value)}
                    placeholder="Enter a Product Max Price"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_sprice"
                    required
                    value={p_sprice}
                    onChange={(e) => setp_sprice(e.target.value)}
                    placeholder="Enter a Product Selling Price"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_color"
                    required
                    value={p_color}
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
                    value={p_discount_percentage}
                    placeholder="Enter a Product Discount Percentage"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_size"
                    required
                    value={p_size}
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
                    value={pdesc}
                    placeholder="Enter a Product Description"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_quantity"
                    required
                    value={p_quantity}
                    onChange={(e) => setp_quantity(e.target.value)}
                    placeholder="Enter a Product Quantity"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text"
                    name="p_availability"
                    required
                    value={p_availability}
                    onChange={(e) => setp_availability(e.target.value)}
                    placeholder="Enter a Product Availability"
                  />
                </div>
                {/* <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="file"
                    multiple
                    name="upload_doc"
                    required
                    onChange={saveFile}
                  />
                </div> */}
                <h3>Upload New Images</h3>
      <input type="file" 
      multiple 
      required
      onChange={handleFileChange} />

      {newFiles.length > 0 && (
        <div>
          <h4>New Images Selected:</h4>
          <ul>
            {newFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
                <div style={{ display: 'flex', gap: '10px' }}>
        {existingImages.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Existing ${index}`}
            style={{ width: 100, height: 100, objectFit: 'cover', border: '1px solid #ccc' }}
          />
        ))}
      </div>
                <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 p-lr-15 trans-04 pointer">
                  Edit Product
                </button>
              </form>
            </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default EditProduct
