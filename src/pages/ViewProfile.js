import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { CUSTOMER_PROFILE, CUSTOMER_PROFILE_PIC, CUSTOMER_UPLOAD_DOC } from '../utility/Constant'

const ViewProfile = () => {
  const [profilepic, setprofilepic] = useState("")
  const [upload_doc, setupload_doc] = useState("")

  const [customerdetails, setcustomerdetails] = useState({})
  useEffect(() => {
    getCustomerProfilePic()
    getCustomerProfile()
  }, [])

  const saveFile = (e) => {
    console.log(e.target.files.length)
    console.log(e.target.files[0])
    setupload_doc(e.target.files[0])
  }

  const getCustomerProfile = () => {
    var id = localStorage.getItem("id")
    axios.get(CUSTOMER_PROFILE + id)
      .then((response) => {
        console.log(response.data)
        setcustomerdetails(response.data.record)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getCustomerProfilePic = () => {
    var id = localStorage.getItem("id")
    axios.get(CUSTOMER_PROFILE_PIC + id)
      .then((response) => {
        console.log(response.data)
        setprofilepic(response.data.data.upload_doc)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = (e) => {

    e.preventDefault()
    var _id = localStorage.getItem("id")
    console.log(_id)
    console.log("this is uploaddoc", upload_doc)

    const formdata = new FormData()
    formdata.append("customer_id", _id)
    formdata.append("upload_doc", upload_doc)
    axios.post(CUSTOMER_UPLOAD_DOC, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log(response)
        alert("Profile Pic Uploaded Successfully!!!")
        setupload_doc("")
        getCustomerProfilePic()
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <div>
      <Header />
      

      {/* ==================Customer Home======================= */}
      <div className="row" style={{ marginTop: 50 }}>
        <div className="order-md-2 col-md-7 col-lg-8 p-b-30" align='left'>
          <div className="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
            <h3 className="mtext-111 cl2 p-b-16">
              {/* Name:{customerdetails.name} */}
            </h3>


            {/* <p className="stext-113 cl6 p-b-26">
                            Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum rhoncus dignissim risus, sed consectetur erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam maximus mauris sit amet odio convallis, in pharetra magna gravida. Praesent sed nunc fermentum mi molestie tempor. Morbi vitae viverra odio. Pellentesque ac velit egestas, luctus arcu non, laoreet mauris. Sed in ipsum tempor, consequat odio in, porttitor ante. Ut mauris ligula, volutpat in sodales in, porta non odio. Pellentesque tempor urna vitae mi vestibulum, nec venenatis nulla lobortis. Proin at gravida ante. Mauris auctor purus at lacus maximus euismod. Pellentesque vulputate massa ut nisl hendrerit, eget elementum libero iaculis.
                        </p> */}
            <div className="bor16 p-l-29 p-b-9 m-t-0">
              <p className="stext-114 cl6 p-r-40 p-b-11">
                Name: {customerdetails.name}<br></br>
                Email: {customerdetails.email}<br></br>
                Mobile: {customerdetails.mobile}<br></br>
                Gender: {customerdetails.gender}<br></br>
                Address:- {customerdetails.city} {customerdetails.state} {customerdetails.pincode}
              </p>
              {/* <span className="stext-111 cl8">
                                - Steve Job’s 
                            </span> */}
            </div>
          </div>
        </div>

        <div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
          <div className="hov-img0">
            <img src={profilepic}
              alt="IMG"
            />
          </div>
          <div align="center">
            <form onSubmit={handleSubmit}>
              <input type='file' onChange={saveFile}
              name='upload_doc'/> <br></br>
              <button className="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-20"
              type='submit'
              >
                Upload Pic
              </button>
            </form>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default ViewProfile
