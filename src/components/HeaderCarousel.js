import React from "react";
import Slider from "react-slick";

const HeaderCarousel = () => {
  const settings = {
    dots: false,
    arrows: false, // Remove arrows for a cleaner look
    infinite: true,
    speed: 30000, // Slow down the speed for continuous scrolling
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // Needed for continuous scrolling
    cssEase: "linear",
    pauseOnHover: false, // Continue scrolling on hover
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-brownie-100 z-40">
      <div className="max-w-full overflow-hidden">
        <Slider {...settings}>
          <div className="text-white text-center py-2">
            <p className="text-sm">
              <strong>20% Off</strong> on all products! Limited time offer.
            </p>
          </div>
          <div className="text-white text-center py-2">
            <p className="text-sm">
              <strong>Free Shipping</strong> on orders over ₹500!
            </p>
          </div>
          <div className="text-white text-center py-2">
            <p className="text-sm">
              Check out our <strong>New Arrivals</strong> today!
            </p>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default HeaderCarousel;

