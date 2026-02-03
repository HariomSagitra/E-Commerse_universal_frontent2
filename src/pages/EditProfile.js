// import React, { useState, useEffect } from 'react'
// import Header from '../components/Header'
// import Footer from '../components/Footer'
// import { EDITPROFILE, CUSTOMER_PROFILE } from '../utility/Constant'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'
// const EditProfile = () => {
//     const navigate = useNavigate()
//     const [name, setname] = useState("")
//     const [email, setemail] = useState("")
//     const [mobile, setmobile] = useState("")
//     const [state, setstate] = useState("")
//     const [city, setcity] = useState("")
//     const [pincode, setpincode] = useState("")
//     const [gender, setgender] = useState("Male")

//     const [customerdetails, setcustomerdetails] = useState({})

//     const getCustomerProfile = () => {
//         var id = localStorage.getItem("id")
//         axios.get(CUSTOMER_PROFILE + id)
//             .then((response) => {
//                 console.log(response.data)
//                 setcustomerdetails(response.data.record)
//                 const { name, city, gender, email, mobile, pincode, state } = response.data.record
//                 setname(name)
//                 setemail(email)
//                 setcity(city)
//                 setgender(gender)
//                 setmobile(mobile)
//                 setpincode(pincode)
//                 setstate(state)
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }

//     useEffect(() => {
//         getCustomerProfile()
//     }, [])


//     const handleSubmit = (e) => {
//         e.preventDefault()
//         let params = {
//             name: name,
//             mobile: mobile,
//             state: state,
//             city: city,
//             pincode: pincode,
//             gender: gender
//         }
//         console.log(params)
//         var id = localStorage.getItem("id")
//         var token = localStorage.getItem("token")
//         axios.put(EDITPROFILE + id, params, {
//             headers: {
//                 'Authorization': 'Bearer ' + token,
//                 'Content-Type': 'application/json',
//             },
//         })
//             .then((response) => {
//                 console.log(response)
//                 getCustomerProfile()
//                 alert(response.data.msg)
//             })
//             .catch((error) => {
//                 console.log(error)
//                 alert(error.response.data.msg)
//                 if (error.response.data.msg) {
//                     localStorage.removeItem("token")
//                     localStorage.removeItem("role")
//                     navigate("/login")
//                 }
//             })
//     }

//     return (
//         <div>
//             <Header />
//             <h3 style={{ marginTop: 60 }}>EDITPROFILE</h3>
//             <div className="p-t-10" align='center'>
//                 <form onSubmit={handleSubmit}>
//                     <div className="bor19 size-218">
//                         <input className="stext-111 cl2 plh3 size-116 p-lr-18"
//                             type="text"
//                             name="name"
//                             value={name}
//                             onChange={(e) => setname(e.target.value)}
//                             placeholder="Name *" />
//                     </div>
//                     <div className="bor19 size-218 m-b-20">
//                         <input className="stext-111 cl2 plh3 size-116 p-lr-18"
//                             type="email"
//                             name="email"
//                             value={email}
//                             onChange={(e) => setemail(e.target.value)}
//                             disabled
//                             placeholder="Email *" />
//                     </div>

//                     <div className="bor19 size-218 m-b-20">
//                         <input className="stext-111 cl2 plh3 size-116 p-lr-18"
//                             type="text"
//                             name="mobile"
//                             value={mobile}
//                             onChange={(e) => setmobile(e.target.value)}
//                             placeholder="Mobile *" />
//                     </div>

//                     <div className="bor19 size-218 m-b-20">
//                         <select
//                             className="form-select stext-111 cl2 plh3 size-116"
//                             style={{ fontSize: 13, border: 'none', backgroundColor: 'white', paddingLeft: 16, boxShadow: 'none' }}
//                             value={state}
//                             onChange={(e) => setstate(e.target.value)}

//                         >
//                             <option selected
//                             >Select a State *</option>                  <option value="M.P">M.P</option>
//                             <option value="U.P">U.P</option>
//                         </select>
//                     </div>

//                     <div className="size-218 m-b-20 bor19">
//                         <select
//                             className="form-select stext-111 cl2 plh3 size-116 p-lr-14"
//                             style={{ fontSize: 13, border: 'none', backgroundColor: 'white', paddingLeft: 16, boxShadow: 'none' }}
//                             value={city}
//                             onChange={(e) => setcity(e.target.value)}
//                         >
//                             <option selected
//                             >Select a City *</option>                  <option value="Indore">Indore</option>
//                             <option value="Ujjain">Ujjain</option>
//                             <option value="Kanpur">Kanpur</option>
//                             <option value="Mirzapur">Mirzapur</option>
//                         </select>
//                     </div>
//                     <div className="bor19 size-218 m-b-20">
//                         <input className="stext-111 cl2 plh3 size-116 p-lr-18"
//                             type="text"
//                             name="pincode"
//                             value={pincode}
//                             onChange={(e) => setpincode(e.target.value)}
//                             placeholder="Pincode *" />
//                     </div>
//                     <div className="size-218 m-b-20"
//                         style={{ display: 'flex', justifyContent: 'center', marginLeft: -30 }}
//                     >
//                         <div className="form-check" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
//                             <input className="form-check-input" type="radio"
//                                 name="gender"
//                                 id="exampleRadios"
//                                 value="Male"
//                                 checked={gender === "Male"}
//                                 onChange={(e) => setgender(e.target.value)}
//                             />
//                             <label className="form-check-label" htmlFor="exampleRadios">
//                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Male
//                             </label>
//                         </div>
//                         <div className="form-check"
//                             style={{ display: 'flex', justifyContent: 'space-evenly' }}
//                         >
//                             <input className="form-check-input" type="radio"
//                                 name="gender"
//                                 id="exampleRadios2"
//                                 value="Female"
//                                 checked={gender === "Female"}
//                                 onChange={(e) => setgender(e.target.value)}
//                             />
//                             <label className="form-check-label" htmlFor="exampleRadios2">
//                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Female
//                             </label>
//                         </div>
//                         <div className="form-check" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
//                             <input className="form-check-input" type="radio"
//                                 name="gender" id="exampleRadios3"
//                                 value="Other"
//                                 checked={gender === "Other"}
//                                 onChange={(e) => setgender(e.target.value)}
//                             />
//                             <label className="form-check-label" htmlFor="exampleRadios3">
//                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
//                             </label>
//                         </div>
//                     </div>
//                     <button className="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-20">
//                         Update
//                     </button>
//                 </form>

//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default EditProfile


import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { EDITPROFILE, CUSTOMER_PROFILE } from "../utility/Constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");
  const [gender, setgender] = useState("Male");

  useEffect(() => {
    getCustomerProfile();
  }, []);

  const getCustomerProfile = () => {
    const id = localStorage.getItem("id");

    axios
      .get(CUSTOMER_PROFILE + id)
      .then((response) => {
        const data = response.data.record;
        setname(data.name || "");
        setemail(data.email || "");
        setmobile(data.mobile || "");
        setstate(data.state || "");
        setcity(data.city || "");
        setpincode(data.pincode || "");
        setgender(data.gender || "Male");
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = {
      name,
      mobile,
      state,
      city,
      pincode,
      gender,
    };

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    axios
      .put(EDITPROFILE + id, params, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert(response.data.msg);
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.data?.msg) {
          alert(error.response.data.msg);
          localStorage.clear();
          navigate("/login");
        }
      });
  };

  return (
    <div>
      <Header />
      <h3 style={{ marginTop: 80, textAlign: "center" }}>Edit Profile</h3>

      <div className="p-t-10" align="center">
        <form onSubmit={handleSubmit}>
          <input
            className="stext-111 cl2 size-218 bor19 m-b-10 p-lr-18"
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Name"
          />

          <input
            className="stext-111 cl2 size-218 bor19 m-b-10 p-lr-18"
            type="email"
            value={email}
            disabled
            placeholder="Email"
          />

          <input
            className="stext-111 cl2 size-218 bor19 m-b-10 p-lr-18"
            type="text"
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
            placeholder="Mobile"
          />

          <select
            className="form-select size-218 bor19 m-b-10"
            value={state}
            onChange={(e) => setstate(e.target.value)}
          >
            <option value="">Select State</option>
            <option value="M.P">M.P</option>
            <option value="U.P">U.P</option>
          </select>

          <select
            className="form-select size-218 bor19 m-b-10"
            value={city}
            onChange={(e) => setcity(e.target.value)}
          >
            <option value="">Select City</option>
            <option value="Indore">Indore</option>
            <option value="Ujjain">Ujjain</option>
            <option value="Kanpur">Kanpur</option>
            <option value="Mirzapur">Mirzapur</option>
          </select>

          <input
            className="stext-111 cl2 size-218 bor19 m-b-10 p-lr-18"
            type="text"
            value={pincode}
            onChange={(e) => setpincode(e.target.value)}
            placeholder="Pincode"
          />

          {/* Gender */}
          <div className="m-b-20">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} style={{ marginRight: 20 }}>
                <input
                  type="radio"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setgender(e.target.value)}
                />{" "}
                {g}
              </label>
            ))}
          </div>

          <button className="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3">
            Update Profile
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default EditProfile;
