import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { ALL_CUSTOMER, DELETE_CUSTOMER, VERIFY_CUSTOMER } from '../utility/Constant'
import {useNavigate} from 'react-router-dom'

const ManageCustomer = () => {
  const [customers, setcustomers] = useState([])
  const navigate = useNavigate()  
  useEffect(()=>{
   getCustomers()
  },[])

  const getCustomers=()=>{
    axios.get(ALL_CUSTOMER)
    .then((response)=>{
        console.log(response)
        setcustomers(response.data.record)
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  
  const handleDelete=(gId)=>{
    console.log(gId)
    axios.put(DELETE_CUSTOMER+gId)
    .then((response)=>{
        console.log(response)
        alert(response.data.msg) 
        getCustomers()
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  const handleManageCustomer=(gId,s)=>{
    console.log(gId,s)
    axios.put(VERIFY_CUSTOMER+gId+"&s="+s)
    .then((response)=>{
        console.log(response)
        getCustomers()
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  const handleViewOrders=(gId)=>{
    navigate("/admin/vieworders",{state:gId})
  }

  return (
    <div>
        <Header />
        <div className="row">
                {customers.length > 0 ?
                    <div className="col-lg-12 col-xl-12 m-b-50">
                        <div className="wrap-table-shopping-cart">
            <table className="table-shopping-cart">
            <thead>
                <tr className="table_head">
                    <th className="column-1">S.No</th>
                    <th className="column-1">Name</th>
                    <th className="column-1">Email</th>
                    <th className="column-1">Contact</th>
                    <th className="column-1">Address</th>
                    <th className="column-1"
                    colSpan={3}
                    >Action</th>
                </tr>
            </thead>         
            <tbody>           
            {customers.map((customer, index) =>
                customer.role==="customer" ?
                <tr className="table_row" key={index}>
                        <td className="column-1">{index + 1}</td>

                        <td className="column-1">
                        {customer.name} 
                        </td>
                        <td className="column-1">
                            {customer.email}
                        </td>
                        <td className="column-1">
                            {customer.mobile}
                        </td>
                        <td className="column-1">
                            {customer.address}
                        </td>
                        <td className="column-1">
                            <button
                            className="flex-c-m stext-101 cl0 size-121 bg10 bor1 hov-btn3 p-lr-15 trans-04 pointer"
                            onClick={()=> handleDelete(customer._id)}
                            >
                                DELETE
                            </button>
                        </td>
                        <td className="column-1">
                            <button
                            className="flex-c-m stext-101 cl0 size-121 bg7 bor1 p-lr-15 trans-04 pointer"
                            onClick={()=>handleViewOrders(customer._id)}
                            >
                                VIEW ORDERS
                            </button>
                        </td>
                        <td className="column-1">
                            {customer.status === 1 ? 
                            <button
                            className="flex-c-m stext-101 cl0 size-121 bg11 bor1 p-lr-15 trans-04 pointer"
                            onClick={()=>handleManageCustomer(customer._id,"block")}
                            >
                                BLOCK
                            </button> :
                            <button
                            className="flex-c-m stext-101 cl0 size-121 bg12 bor1 p-lr-15 trans-04 pointer"
                            onClick={()=>handleManageCustomer(customer._id,"verify")}
                            >
                                VERIFY
                            </button> }
                        </td>
                </tr>:null
            )}
            </tbody>
                            </table>
                        </div>
                        


                    </div> :
                    <div align='center'>
                        <h1>No Customer Found</h1>
                    </div>
                }
        </div>
        <Footer />
    </div>
  )
}

export default ManageCustomer
