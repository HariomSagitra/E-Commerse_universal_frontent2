import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router, Routes, NavLink } from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

const activeStyle = {
    color: "brown",
    textDecoration: 'none', 
    fontWeight: 'bold',
    fontSize:18
}

const inActiveStyle = {
    color: "gray",
    textDecoration:'none', 
    fontWeight:'normal',
    fontSize:18
}
const Header = () => {
  const [header, setheader] = useState()
  useEffect(()=>{
    var token = localStorage.getItem("token")
    var role = localStorage.getItem("role")
    if (role==="customer" && token!=null) {
        setheader(
            <div style={{position:'fixed',top:0,left:0,width:'100%',zIndex:1}}>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" >

                        <NavLink
                            to="/customer"
                            end
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}

                        >
                            CustomerHome
                        </NavLink>&nbsp;&nbsp;
                        <NavLink
                            to="/customer/cart"
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                        >
                            Cart
                        </NavLink>&nbsp;&nbsp;
                        <NavLink
                            to="/customer/editprofile"
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                        >
                            EditProfile
                        </NavLink>&nbsp;&nbsp;
                        <NavLink
                            to="/customer/orders"
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                        >
                            MyOrders
                        </NavLink>&nbsp;&nbsp;

                        <NavLink
                            to="/customer/changepassword"
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                        >
                            ChangePassword
                        </NavLink>&nbsp;&nbsp;

                        <NavLink
                            to="/customer/viewprofile/"
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                        >
                            ViewProfile
                        </NavLink>&nbsp;&nbsp;



                         <NavLink
                            to="/logout"
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                        >
                            Logout
                        </NavLink>&nbsp;&nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
        )
    }else if(role==="admin" && token!=null){
        setheader(
            <div style={{position:'fixed',top:0,left:0,width:'100%',zIndex:1}}>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" >

                        <NavLink
                            to="/admin"
                            end
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                        >
                            AdminHome
                        </NavLink>&nbsp;&nbsp;
                        <NavLink
                            to="/admin/addproduct"
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                        >
                            AddProduct
                        </NavLink>&nbsp;&nbsp;
                        <NavLink
                            to="/admin/managecustomer"
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                        >
                            ManageCustomer
                        </NavLink>&nbsp;&nbsp;
                        <NavLink
                            to="/admin/viewproduct"
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                        >
                            ViewProduct
                        </NavLink>&nbsp;&nbsp;
                        
                         <NavLink
                            to="/logout"
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                        >
                            Logout
                        </NavLink>&nbsp;&nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
        )
    }else{
        setheader( <div style={{position:'fixed',top:0,left:0,width:'100%',zIndex:1}}>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" >

                        <NavLink
                            to="/"
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                        >
                            Index
                        </NavLink>&nbsp;&nbsp;

                         <NavLink
                            to="/login"
                            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                        >
                            Login
                        </NavLink>&nbsp;&nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>)
    }    
  },[])  
  return header
}

export default Header
