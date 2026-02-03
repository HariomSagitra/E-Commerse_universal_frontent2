import React,{useState,useEffect} from 'react'
import Footer from '../components/Footer'
import {SEND_EMAIL} from '../utility/Constant'
import {useNavigate} from 'react-router-dom'

import axios from 'axios'
import Header from '../components/Header'
const SendEmail = () => {
  const navigate = useNavigate()  
  const [email, setemail] = useState("")
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    let params = {
        email:email
    }
    axios.post(SEND_EMAIL,params)
    .then((response)=>{
        console.log(response)
        alert(response.data.msg);
        localStorage.setItem("id",response.data.id)
        localStorage.setItem("forgottoken",response.data.token)
        setemail("")
        navigate("/login")
    })
    .catch((err)=>{
        console.log(err)
    })

  }  

  return (
    <div>
      <Header />  
       <section class="bg0 p-t-20 p-b-85">
        <div class="container" >
          <div class="flex-w flex-tr">
            <div class="size-210 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md" style={{ margin: 'auto' }}>
              <form onSubmit={handleSubmit}>
                <h4 class="mtext-105 cl2 txt-center p-b-30">
                  Forgot Password
                </h4>
                <div class="bor8 m-b-20 how-pos4-parent">
                  <input
                    class="stext-105 cl2 plh3 size-116 p-l-62 p-r-30" type="text" 
                    name="email"
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Your Email Address" 
                    />
                </div>
                
                <button class="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" 
                type='submit'
                style={{marginTop:20}}>
                  Send Email
                </button>
              </form>
              
              
            </div>
          </div>
        </div>
      </section>
       <Footer />
    </div>
  )
}

export default SendEmail
