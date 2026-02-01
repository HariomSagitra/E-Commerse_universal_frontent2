import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { REGISTER } from '../utility/Constant'
import axios from 'axios'

const Register = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [mobile, setmobile] = useState("")
    const [state, setstate] = useState("")
    const [city, setcity] = useState("")
    const [pincode, setpincode] = useState("")
    const [gender, setgender] = useState("Male")
    const [address, setaddress] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name)
        console.log(email)
        console.log(password)
        console.log(mobile)
        console.log(state)
        console.log(city)
        console.log(pincode)
        console.log(gender)
        console.log(address)
        let params = {
            name,
            email,
            password,
            mobile,
            state,
            city,
            pincode,
            address,
            gender
        }
        axios.post(REGISTER,params)
        .then((response)=>{
            alert(response.data.msg)
        })
        .catch((err)=>{
            alert(err)
        })

        setaddress("")
        setname("")
        setcity("")
        setemail("")
        setmobile("")
        setpassword("")
        setpincode("")
        setstate("")
        setgender("Male")

    }


    return (
        <div>
            <Header />
            <div align='center'>
                <h1 className="p-t-50">Sign Up</h1>
                <form className='m-b-20' onSubmit={handleSubmit}>
                    <div className="bor19 size-218 m-b-20">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            placeholder="Enter a Name *"
                            autoFocus

                        />
                    </div>
                    <div className="bor19 size-218 m-b-20">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="text" name="email" placeholder="Enter a Email *"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>

                    <div className="bor19 size-218 m-b-20">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="password" name="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            placeholder="Enter a Password *" />
                    </div>
                    <div className="bor19 size-218 m-b-20">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="text" name="mobile" placeholder="Enter a Mobile *"
                            value={mobile}
                            onChange={(e) => setmobile(e.target.value)}
                        />
                    </div>
                    <div className="bor19 size-218 m-b-20">
                        <select
                            className="form-select stext-111 cl2 plh3 size-116"
                            style={{ fontSize: 13, border: 'none', backgroundColor: 'white', paddingLeft: 16, boxShadow: 'none' }}
                            value={state}
                            onChange={(e) => setstate(e.target.value)}
                        >
                            <option
                            >Select a State *</option>                  <option value="M.P">M.P</option>
                            <option value="U.P">U.P</option>
                        </select>
                    </div>

                    <div className="size-218 m-b-20 bor19">
                        <select
                            className="form-select stext-111 cl2 plh3 size-116 p-lr-14"
                            style={{ fontSize: 13, border: 'none', backgroundColor: 'white', paddingLeft: 16, boxShadow: 'none' }}
                            value={city}
                            onChange={(e) => setcity(e.target.value)}
                        >
                            <option
                            >Select a City *</option>                  <option value="Indore">Indore</option>
                            <option value="Ujjain">Ujjain</option>
                            <option value="Kanpur">Kanpur</option>
                            <option value="Mirzapur">Mirzapur</option>
                        </select>
                    </div>

                    <div className="bor19 size-218 m-b-20">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="text" name="pincode" placeholder="Enter a Pincode*"
                            value={pincode}
                            onChange={(e) => setpincode(e.target.value)}
                        />
                    </div>
                    <div className="bor19 size-218 m-b-20">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="text" name="address" placeholder="Enter a Address *"
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                        />
                    </div>

                    <div className="size-218 m-b-20"
                        style={{ display: 'flex', justifyContent: 'center', marginLeft: -30 }}
                    >
                        <div className="form-check" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <input className="form-check-input" type="radio"
                                name="gender"
                                id="exampleRadios"
                                value="Male"
                                checked={gender === "Male"}
                                onChange={(e) => setgender(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="exampleRadios">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Male
                            </label>
                        </div>
                        <div className="form-check"
                            style={{ display: 'flex', justifyContent: 'space-evenly' }}
                        >
                            <input className="form-check-input" type="radio"
                                name="gender"
                                id="exampleRadios2"
                                value="Female"
                                checked={gender === "Female"}
                                onChange={(e) => setgender(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Female
                            </label>
                        </div>
                        <div className="form-check" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <input className="form-check-input" type="radio"
                                name="gender" id="exampleRadios3"
                                value="Other"
                                checked={gender === "Other"}
                                onChange={(e) => setgender(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="exampleRadios3">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
                            </label>
                        </div>
                    </div>

                    <button className="flex-c-m stext-100 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04"
                        type='submit'
                    >
                        SignUp
                    </button>
                </form>

                <div className="size-218 p-b-60">
                    <Link to="/login"
                    > LogIn</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register
