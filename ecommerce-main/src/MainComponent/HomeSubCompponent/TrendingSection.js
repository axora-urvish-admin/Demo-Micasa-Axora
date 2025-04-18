import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Slider from 'react-slick';
import axios from "axios";
import { BASE_URL, IMG_URL } from "../../AdminComponent/BaseUrl";
import { Link } from "react-router-dom";
import addToCart from "../../Utils/AddtoCart";
import SiteLoader from "../Ui/SiteLoader";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import custdecryptedUserId from "../../Utils/CustUserid";
import { addToWishList } from "../../Store/WishList/wishlist-actions";
import LoginForm from "../Authentication/LoginForm";
import { Cookie } from "@mui/icons-material";
import Cookies from "js-cookie";
import { getCartCount } from "../../Store/Cart/cart-action";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Mousewheel, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../App.css";

var settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  autoplay: true,
  responsive: [
    {
      breakpoint: 600, // Adjust this breakpoint according to your needs
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const notify = () => toast("Product added to the cart");
const wishify = () => toast("Product added to the wishlist");

const TrendingSection = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleToggle = (e) => {
    setOpen(!open);
  };

  async function getTrendingData() {
    axios
      .get(`${BASE_URL}/trending_products`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getTrendingData();
  }, []);

  const dispatch = useDispatch();
  const addWishList = (data) => {
    const id = data;
    const userId = custdecryptedUserId();
    const wishData = {
      id,
      userId,
    };

    dispatch(addToWishList(wishData));
  };

  return (
    <section class="section section-padding">
      <div class="section-container">
        {/* {loader && <h1>hiffjj</h1>} */}
        <ToastContainer theme="dark" position="bottom-right" />
        <div class="block block-products slider">
          <div class="block-widget-wrap">
            <div class="block-title">
             {data.length > 0 && <h2>Best Seller</h2> } 
            </div>
            <div class="block-content">
              <div class="content-product-list slick-wrap">
                <div
                  class="slick-sliders products-list grid"
                  data-slidestoscroll="true"
                  data-dots="false"
                  data-nav="1"
                  data-columns4="1"
                  data-columns3="2"
                  data-columns2="3"
                  data-columns1="3"
                  data-columns1440="4"
                  data-columns="4"
                >
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    modules={[Navigation, Thumbs]}
                    navigation
                    breakpoints={{
                      320: {
                        slidesPerView: 2,
                      },
                      640: {
                        slidesPerView: 3,
                      },
                      768: {
                        slidesPerView: 4,
                      },
                      1024: {
                        slidesPerView: 5,
                      },
                    }}
                  >
               {Array.isArray(data) && data.map((item) => {
                      return (
                        <SwiperSlide>
                          <div class="item-product ">
                            <div class="items">
                              <div class="products-entry clearfix product-wapper">
                                <div class="products-thumb">
                                  {item.customizable == 1 && (
                                    // <div className="product-lable">
                                    //   <div className="hot text-light"
                                    //     style={{
                                    //       height: "60px",
                                    //       width: "26%",
                                    //       borderRadius:"100% 0% 100% 0% / 0% 0% 100% 100%",
                                    //       display: "grid",
                                    //       placeItems: "center",
                                    //       top: "0px",
                                    //       left: "0px",
                                    //        backgroundColor: "#D8B64B"
                                    //     }}>
                                    //     <div style={{position:"absolute", top:"8px",left: "12px"}}>Luxe</div>
                                    //   </div>
                                    //   <div
                                    //     className="hot text-dark"
                                    //     style={{ backgroundColor: "#fbecd6" }}>
                                    //     customizable
                                    //   </div>
                                    // </div>
                                    <div
                                      className="product-label"
                                      style={{ position: "relative" }}
                                    >
                                      <div
                                        style={{
                                          width: "0px",
                                          height: "0px",
                                          borderRight: "90px solid transparent",
                                          borderTop: "90px solid transparent",
                                          position: "absolute",
                                          top: "0",
                                          left: "0",
                                          zIndex: "1",
                                        }}
                                      >
                                        <div className="triangle"
                                          style={{
                                            position: "absolute",
                                            top: "-90px",
                                            left: "0",
                                            width: "90px",
                                            height: "90px",
                                            background:
                                              "linear-gradient(rgb(216, 182, 75), rgb(255, 193, 7))",
                                            clipPath:
                                              "polygon(0 0, 100% 0, 0 100%)",
                                          }}
                                        ></div>
                                      </div>
                                      <div className="luxe"
                                        style={{
                                          position: "absolute",
                                          top: "8px",
                                          left: "12px",
                                          zIndex: "20",
                                          color: "#fff",
                                        }}
                                      >
                                        Luxe
                                      </div>
                                      <div
                                        className="hot text-light mqs"
                                        style={{
                                          backgroundColor: "#000000",
                                          zIndex: "1",
                                          padding: "5px",
                                          // top: window.innerWidth <= 481 ? "20px" : "175px",
                                          // fontSize: window.innerWidth <= 481 ? "12px" : "12px",
                                        }}
                                      >
                                        customizable
                                      </div>
                                    </div>
                                  )}

                                  <div class="product-thumb-hover">
                                    <Link to={`/product/${item.slug}`}>
                                      <img
                                        width="600"
                                        height="600"
                                        src={
                                          `${IMG_URL}/productimg/` + item.image1
                                        }
                                        class="post-image"
                                        alt=""
                                      />

                                      <img
                                        width="600"
                                        height="600"
                                        src={
                                          `${IMG_URL}/productimg/` + item.image2
                                        }
                                        class="hover-image back"
                                        alt=""
                                      />
                                    </Link>
                                  </div>

                                  <div class="product-button">
                                    <div
                                      class="btn-wishlist"
                                      data-title="Wishlist"
                                    >
                                      {!Cookies.get(`custuserid`) ? (
                                        <button
                                          class="product-btn"
                                          onClick={() => {
                                            handleToggle();
                                          }}
                                        >
                                          Add to wishlist
                                        </button>
                                      ) : (
                                        <button
                                          class="product-btn"
                                          onClick={() => {
                                            addWishList(item.id);
                                            wishify();
                                          }}
                                        >
                                          Add to wishlist
                                        </button>
                                      )}
                                    </div>

                                    {/* <div class="btn-compare" data-title="Compare">
                                            <button class="product-btn">Compare</button>
                                        </div>
                                        <span class="product-quickview" data-title="Quick View">
                                            <Link href="#" class="quickview quickview-button">Quick View <i class="icon-search"></i></Link>
                                        </span> */}
                                  </div>
                                </div>

                                <div class="products-content">
                                  <div class="contents">
                                    <h3 class="product-title">
                                      <Link to={`/product/${item.slug}`}>
                                        {item.title}
                                      </Link>
                                    </h3>
                                    <span className="price">
                                      {item.price !== 0 &&
                                      item.price !== item.disc_price ? (
                                        <del aria-hidden="true">
                                          <span>₹{item.price}</span>
                                        </del>
                                      ) : null}
                                      <ins>
                                        <span>₹{item.disc_price}</span>
                                      </ins>
                                    </span>
                                    <div class="btn-add-to-cart">
                                      {item.stock == null ||
                                      item.stock == 0 ||
                                      item.stock == item.r_stock ||
                                      item.stock < 0 ? (
                                        <div data-title="Out of stock">
                                          <Link to={``} className="text-danger">
                                            Out of stock
                                          </Link>
                                        </div>
                                      ) : (
                                        <div data-title="Add to cart">
                                          <Link
                                            class="button"
                                            onClick={() => {
                                              addToCart(
                                                item.id,
                                                item.title,
                                                item.catid,
                                                item.disc_price,
                                                dispatch,
                                                "1",
                                                item.v_id,
                                                item.gst
                                              );
                                              notify();
                                            }}
                                          >
                                            Add to cart
                                          </Link>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
            {open && <LoginForm setOpen={setOpen} open={open} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
