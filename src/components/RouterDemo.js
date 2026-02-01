import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Index from '../pages/Index'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductDetails from '../pages/ProductDetails'
import Customer from '../pages/Customer'
import Admin from '../pages/Admin'
import Logout from '../pages/Logout'
import CustomerProductDetails from '../pages/CustomerProductDetails'
import Cart from '../pages/Cart'
import AddProduct from '../pages/AddProduct'
import MakePayment from '../pages/MakePayment'
import PaymentSuccess from '../pages/PaymentSuccess'
import MyOrders from '../pages/MyOrders'
import SendEmail from '../pages/SendEmail'
import ForgotPassword from '../pages/ForgotPassword'
import EditProfile from '../pages/EditProfile'
import ChangePassword from '../pages/ChangePassword'
import ViewProfile from '../pages/ViewProfile'
import ManageCustomer from '../pages/ManageCustomer'
import ViewOrders from '../pages/ViewOrders'
import ViewProduct from '../pages/ViewProduct'
import EditProduct from '../pages/EditProduct'
const RouterDemo = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<Index />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/sendemail' element={<SendEmail />}></Route>
                <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
                <Route path='/logout' element={<Logout />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/customer' element={<Customer />}></Route>
                <Route path='/admin' element={<Admin />}></Route>
                <Route path='/productdetails/:pid' element={<ProductDetails />}></Route>

                <Route path='/admin/addproduct' element={<AddProduct />}></Route>
                <Route path='/customer/makepayment' element={<MakePayment />}></Route>
                <Route path='/customer/editprofile' element={<EditProfile />}></Route>
                <Route path='/customer/paymentsuccess' element={<PaymentSuccess />}></Route>
<Route path='/customer/orders/' element={<MyOrders />}></Route>
<Route path='/customer/changepassword/' element={<ChangePassword />}></Route>
<Route path='/customer/viewprofile/' element={<ViewProfile />}></Route>
                

                <Route path='/customer/productdetails/:pid' element={<CustomerProductDetails />}></Route>
                <Route path='/customer/cart' element={<Cart />}></Route>
                <Route path="/admin/managecustomer" element={<ManageCustomer />}></Route>
                <Route path="/admin/vieworders" element={<ViewOrders />}></Route>
<Route path="/admin/viewproduct" element={<ViewProduct />}></Route>
<Route path="/admin/editproduct" element={<EditProduct />}></Route>

                
            </Routes>
        </Router>
    </div>
  )
}

export default RouterDemo
