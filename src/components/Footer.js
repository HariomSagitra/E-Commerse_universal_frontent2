import React from 'react'

const Footer = () => {
    return (
            <p className="cl6 txt-center bg3" style={{padding:15,position:'fixed',left:0,bottom:0,width:'100%',marginBottom:0}}>
                Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | Made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a> &amp; distributed by <a href="https://themewagon.com" target="_blank">ThemeWagon</a>
            </p>
    )
}

export default Footer
