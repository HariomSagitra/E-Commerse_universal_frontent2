import React,{useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {useNavigate,Link} from 'react-router-dom'
import { LOGIN } from '../utility/Constant'
import axios from 'axios'
function Login() {
  const navigate = useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const handleLogin = (e) => {
        e.preventDefault()
        let params = {
            "email": email,
            "password": password
        }
        axios.post(LOGIN, params)
            .then((response) => {
                console.log("API:", response.data)
                const { token, msg } = response.data
                const { role, email, status, _id } = response.data.record
                console.log(token, role)
                if (response.data.record.status === 1) {
                    localStorage.setItem("id", _id)
                    localStorage.setItem("email",email)
                    localStorage.setItem("token",token)
                    localStorage.setItem("role",role)
                    alert(response.data.msg)
                    role === "admin" ? navigate("/admin") : navigate("/customer")
                }else{
                    alert("Please contact admin to verify customer")
                }
            })
            .catch((error) => {
                alert(error.response.data.msg)
                console.log(error)
            })
        setemail("")
        setpassword("")
  }


  return (
    <div>
      <Header />
      <div align='center'>
        <h1 className="p-t-75">Login</h1>
        <form className='m-b-20' onSubmit={handleLogin}>
          <div class="bor19 size-218 m-b-20">
            <input class="stext-111 cl2 plh3 size-116 p-lr-18" type="text" name="email" placeholder="Enter a Email *" 
            autoFocus
            value={email}
            onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div class="bor19 size-218 m-b-20">
            <input class="stext-111 cl2 plh3 size-116 p-lr-18" type="password" name="password" placeholder="Enter a Password *" 
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <div class="size-218 m-b-20" align="right">
            <Link to="/sendemail" 
            >Forgot Password?</Link>
          </div>

          <button class="flex-c-m stext-100 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04"
          type='submit'
          >
            LogIn
          </button>
        </form>

        <div class="size-218 m-b-20">
          Don't have an Account?  
            <Link to='/register'
            > SignUp</Link>
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login

