import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    var token = localStorage.getItem("token")
    if (token != null) {
      localStorage.removeItem("token")
      localStorage.removeItem("role")
      navigate("/login")
    }
  }, [])

}

export default Logout
