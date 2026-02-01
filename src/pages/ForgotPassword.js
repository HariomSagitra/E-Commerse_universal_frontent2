import React,{useState} from 'react'
import axios from 'axios'
import {FORGOT_PASSWORD} from '../utility/Constant'
import {useNavigate} from 'react-router-dom'
const ForgotPassword = () => {
  const navigate = useNavigate()

  const [confirm_password, setconfirm_password] = useState("")
  const [password, setpassword] = useState("")

  const handleSubmit=(e)=>{
    e.preventDefault()
    let params = { 
      password:password, 
      confirm_password:confirm_password
  }
    var id = localStorage.getItem("id")
    var forgottoken = localStorage.getItem("forgottoken")
    var url = FORGOT_PASSWORD+id+"&token="+forgottoken
    axios.post(url,params)
    .then((response)=>{
      console.log(response)
      alert(response.data.msg);
      navigate("/login")
    })
    .catch((err)=>{
      console.log(err)
      alert("Password not reset","error");
    })
  }
  return (
    <div>
        <section class="bg0 p-t-20 p-b-85">
        <div class="container" >
          <div class="flex-w flex-tr">
            <div class="size-210 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md" style={{ margin: 'auto' }}>
              <form onSubmit={handleSubmit}>
                <h4 class="mtext-105 cl2 txt-center p-b-30">
                  Reset Password
                </h4>
                <div class="bor8 m-b-20 how-pos4-parent">
                  <input
                    class="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text" 
                    name="password"
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="New Password" 
                    />
                </div>
                <div class="bor8 m-b-20 how-pos4-parent">
                  <input
                    class="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text" 
                    name="confirm_password"
                    onChange={(e) => setconfirm_password(e.target.value)}
                    placeholder="Confirm Password" 
                    />
                </div>
                
                <button class="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" style={{marginTop:20}}>
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForgotPassword
