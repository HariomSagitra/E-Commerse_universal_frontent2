import React from "react";
import Slider from "react-slick";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "lightgrey" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "lightgrey"
            }}
            onClick={onClick}
        />
    );
}

export default function SlickSlider(props) {
    var settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,

    };
    return (
        <Slider {...settings} style={{backgroundColor:'white'}}>
            {props.data?.map((imgdata, index) =>
                <div className="item-slick3" data-thumb={imgdata.path}
                    key={index}
                >
                    <div className="wrap-pic-w pos-relative">
                        <img src={imgdata.path} alt="IMG-PRODUCT"
                        style={{ height: 450,objectFit:'contain'}}
                        />
                        <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl11 bg0 hov-btn3 trans-04" href={imgdata.path}>
                            <i className="fa fa-expand"></i></a>
                    </div>
                </div>
            )}
        </Slider>
    );
}