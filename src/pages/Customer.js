import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PRODUCT_LIST, C_URL } from "../utility/Constant";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Customer = () => {
  const [pList, setpList] = useState([]);
  const [show, setshow] = useState(false);
  const [categorylist, setcategorylist] = useState([]);
  const searchdata = useRef();
  const [productDetails, setproductDetails] = useState([]);

  const getAllProduct = () => {
    axios
      .get(PRODUCT_LIST)
      .then((response) => {
        console.log(response);
        setpList(response.data.allproduct);
        setproductDetails(response.data.allproduct);
        setcategorylist(response.data.allproduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleSearch = () => {
    var value = searchdata.current.value;
    console.log(value.toLowerCase());
    if (value !== "") {
      var newData = productDetails.filter((prod) => {
        var arr = Object.values(prod);
        console.log("Arr:", arr);
        var str = arr[1] + " " + arr[4];
        return str.toLowerCase().includes(value.toLowerCase());
      });
      console.log("NewData:", newData);
      setproductDetails(newData);
    } else {
      setproductDetails(categorylist);
    }
  };

  return (
    <div>
      <Header />
      <section className="bg0 p-t-40 p-b-140">
        <div className="container">
          <div
            className="flex-w flex-sb-m m-l-10 m-r-10"
            style={{ backgroundColor: "white" }}
          >
            <div
              class="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search"
              onClick={() => setshow(!show)}
            >
              {show ? (
                <i class="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close"></i>
              ) : (
                <i class="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
              )}
              Search
            </div>
          </div>
          <AnimatePresence initial={false}>
            {show && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ overflow: "hidden", marginBottom: 5 }}
              >
                <div className="bor8 dis-flex p-l-10 m-l-10 m-r-10 search-wrapper">
                  <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                    <i className="zmdi zmdi-search"></i>
                  </button>

                  <input
                    className="mtext-107 cl2 size-114 plh2 p-r-15"
                    type="text"
                    name="search-product"
                    placeholder="Search by Brand Name"
                    ref={searchdata}
                    onChange={handleSearch}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="row isotope-grid">
            {productDetails?.map((p, index) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item"
                key={index}
              >
                <div className="block2">
                  <div className="block2-pic hov-img0">
                    {/* <img src={p.product_imageurl[2].path} alt="IMG-PRODUCT" height={320} 
                                        style={{objectFit:'contain'}}
                                        /> */}
                    <img
                      src={
                        p?.product_imageurl?.[2]?.path ||
                        p?.product_imageurl?.[0]?.path ||
                        "/no-image.png"
                      }
                      alt="IMG-PRODUCT"
                      height={320}
                      style={{ objectFit: "contain" }}
                    />

                    <Link
                      to={`${C_URL}customer/productdetails/${p._id}`}
                      className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                    >
                      Quick View
                    </Link>
                  </div>

                  <div className="block2-txt flex-w flex-t p-t-14">
                    <div className="block2-txt-child1 flex-col-l ">
                      <a
                        href="product-detail.html"
                        className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                      >
                        {p.product_description}
                      </a>

                      <span className="stext-105 cl3">
                        &#8377;{p.product_mrp}
                      </span>
                    </div>

                    <div className="block2-txt-child2 flex-r p-t-3">
                      <a
                        href="#"
                        className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                      >
                        <img
                          className="icon-heart1 dis-block trans-04"
                          src="images/icons/icon-heart-01.png"
                          alt="ICON"
                        />
                        <img
                          className="icon-heart2 dis-block trans-04 ab-t-l"
                          src="images/icons/icon-heart-02.png"
                          alt="ICON"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Customer;
