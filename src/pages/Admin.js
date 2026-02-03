// import React, { useState, useEffect } from 'react'
// import Header from '../components/Header'
// import Footer from '../components/Footer'
// import { useNavigate, Link } from 'react-router-dom'
// import axios from 'axios'
// import { CUSTOMER_PROFILE, CUSTOMER_PROFILE_PIC, CUSTOMER_UPLOAD_DOC } from '../utility/Constant'

// const Admin = () => {
//   const [profilepic, setprofilepic] = useState("")
//   const [upload_doc, setupload_doc] = useState("")

//   const [customerdetails, setcustomerdetails] = useState({})
//   useEffect(() => {
//     getCustomerProfilePic()
//     getCustomerProfile()
//   }, [])

//   const saveFile = (e) => {
//     console.log(e.target.files.length)
//     console.log(e.target.files[0])
//     setupload_doc(e.target.files[0])
//   }

//   const getCustomerProfile = () => {
//     var id = localStorage.getItem("id")
//     axios.get(CUSTOMER_PROFILE + id)
//       .then((response) => {
//         console.log(response.data)
//         setcustomerdetails(response.data.record)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

//   const getCustomerProfilePic = () => {
//     var id = localStorage.getItem("id")
//     axios.get(CUSTOMER_PROFILE_PIC + id)
//       .then((response) => {
//         console.log(response.data)
//         setprofilepic(response.data.data.upload_doc)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

//   const handleSubmit = (e) => {

//     e.preventDefault()
//     var _id = localStorage.getItem("id")
//     console.log(_id)
//     console.log("this is uploaddoc", upload_doc)

//     const formdata = new FormData()
//     formdata.append("customer_id", _id)
//     formdata.append("upload_doc", upload_doc)
//     axios.post(CUSTOMER_UPLOAD_DOC, formdata, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//       .then((response) => {
//         console.log(response)
//         alert("Profile Pic Uploaded Successfully!!!")
//         setupload_doc("")
//         getCustomerProfilePic()
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }


//   return (
//     <div>
//       <Header />
//       {/* ==================Admin Home======================= */}
//       <div className="row" style={{ marginTop: 20 }}>
//         <div className="order-md-2 col-md-7 col-lg-8 p-b-30" align='left'>
//           <div className="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
//             <h3 className="mtext-111 cl2 p-b-16">
//               {/* Name:{customerdetails.name} */}
//             </h3>


//             <div className="bor16 p-l-29 p-b-9 m-t-0">
//               <p className="stext-114 cl6 p-r-40 p-b-11">
//                 Name: {customerdetails.name}<br></br>
//                 Email: {customerdetails.email}<br></br>
//                 Mobile: {customerdetails.mobile}<br></br>
//                 Gender: {customerdetails.gender}<br></br>
//                 Address:- {customerdetails.city} {customerdetails.state} {customerdetails.pincode}
//               </p>
             
//             </div>
//           </div>
//         </div>

//         <div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-10">
//           <div className="hov-img0">
//             <img src={profilepic}
//               alt="IMG"
//             />
//           </div>
//           <div align="center">
//             <form onSubmit={handleSubmit}>
//               <input type='file' onChange={saveFile}
//               name='upload_doc'/> <br></br>
//               <button className="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-20"
//               type='submit'
//               >
//                 Upload Pic
//               </button>
//             </form>
//           </div>
//         </div>

//       </div>

//       <Footer />
//     </div>
//   )
// }

// export default Admin

import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import {
  CUSTOMER_PROFILE,
  CUSTOMER_PROFILE_PIC,
  CUSTOMER_UPLOAD_DOC
} from '../utility/Constant'

const Admin = () => {

  const [profilepic, setProfilePic] = useState(null)
  const [upload_doc, setUploadDoc] = useState(null)
  const [customerdetails, setCustomerDetails] = useState({})

  useEffect(() => {
    getCustomerProfile()
    getCustomerProfilePic()
  }, [])

  // ================= GET PROFILE =================
  const getCustomerProfile = async () => {
    try {
      const id = localStorage.getItem("id")
      const res = await axios.get(CUSTOMER_PROFILE + id)
      setCustomerDetails(res.data.record)
    } catch (err) {
      console.log(err)
    }
  }

  // ================= GET PROFILE PIC =================
  const getCustomerProfilePic = async () => {
    try {
      const id = localStorage.getItem("id")
      const res = await axios.get(CUSTOMER_PROFILE_PIC + id)

      const img = res?.data?.data?.upload_doc
      console.log("PROFILE IMAGE 👉", img)

      setProfilePic(img || null)
    } catch (err) {
      console.log(err)
    }
  }

  // ================= FILE SELECT =================
  const saveFile = (e) => {
    setUploadDoc(e.target.files[0])
  }

  // ================= UPLOAD PROFILE PIC =================
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!upload_doc) {
      alert("Please select an image")
      return
    }

    try {
      const id = localStorage.getItem("id")
      const formData = new FormData()
      formData.append("customer_id", id)
      formData.append("upload_doc", upload_doc)

      await axios.post(CUSTOMER_UPLOAD_DOC, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      alert("Profile Pic Uploaded Successfully")

      setUploadDoc(null)

      setTimeout(() => {
        getCustomerProfilePic()
      }, 500)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Header />

      <div className="row" style={{ marginTop: 20 }}>
        {/* DETAILS */}
        <div className="col-md-7 col-lg-8">
          <p>
            <b>Name:</b> {customerdetails.name}<br />
            <b>Email:</b> {customerdetails.email}<br />
            <b>Mobile:</b> {customerdetails.mobile}<br />
            <b>Gender:</b> {customerdetails.gender}<br />
            <b>Address:</b> {customerdetails.city} {customerdetails.state}
          </p>
        </div>

        {/* IMAGE */}
        <div className="col-md-5 col-lg-4 text-center">
          {profilepic ? (
            <img
              src={profilepic}
              alt="Profile"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "50%"
              }}
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="Default"
              style={{ width: "200px" }}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input type="file" onChange={saveFile} />
            <br /><br />
            <button type="submit">Upload Pic</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Admin
