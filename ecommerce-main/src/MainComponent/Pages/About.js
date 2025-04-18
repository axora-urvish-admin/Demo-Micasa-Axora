import axios from "axios";

import React, { useEffect, useState } from "react";
import { BASE_URL, IMG_URL } from "../../AdminComponent/BaseUrl";
import { Helmet } from "react-helmet";
import useBreadcrumb from "../../Utils/Breadcrum";
import payments from '../../assets/frontimg/payments.png'
import '../../Style.css'
import { Link } from 'react-router-dom'
import logo2 from  '../../assets/images/mica.png'

const About = () => {
  const [data, setData] = useState([]);
  const [metadata, setMeta] = useState([]);
  const breaddata = useBreadcrumb(3);

  async function getaboutadetail() {
    axios.get(`${BASE_URL}/AboutUs_data`, data).then((res) => {
      setData(res.data);
    });
  }

  async function getmetadetail() {
    const data = {
      page_id: 3,
    };
    axios.post(`${BASE_URL}/getmetadetail`, data).then((res) => {
      setMeta(res.data[0]);
    });
  }

  useEffect(() => {
    getmetadetail();
    getaboutadetail();
  }, []);

  return (
    <div>
      <div id="site-main" class="site-main">
        <Helmet>
          <title>{metadata.seo_title}</title>
          <meta
            name="description"
            content={metadata.seo_desc}
            dangerouslySetInnerHTML={{ __html: metadata.top_desc }}
          />
          <meta name="author" content={metadata.seo_title} />
        </Helmet>
        <div id="main-content" class="main-content m-0 p-0">
          <div id="primary" class="content-area">
            <div
              id="title"
              className="page-title m-0"
              style={{
                backgroundImage: `url('${IMG_URL}/Breadcrumbs/${breaddata}')`,
              }}
            >
              <div class="section-container d-flex justify-content-center">
                <div class="content-title-heading">
                </div>
                <div 
                  class="breadcrumbs bg-light"
                  style={{
                    width: "fit-content",
                    padding: "5px 10px",
                }}>
                  <a href="index.html">Home</a>
                  <span class="delimiter"></span>About
                </div>
              </div>
            </div>

            <div id="content" class="site-content m-0 p-0" role="main">
              <div class="page-contact m-0 p-0">
                <section class="section section-padding m-0 p-0">
                  <div className="m-0 p-0">
                    <div className="m-0 p-0">
                      <div className="block-widget-wrap m-0 p-0">
                        {data.map((item) => {
                          return (
                            <div className="m-0 p-0">
                              <img
                                src={`${IMG_URL}/AboutUS/${item.image1}`}
                                alt="Description for image 1"
                                className="w-100 m-0 p-0"
                              />
                              <img
                                src={`${IMG_URL}/AboutUS/${item.image2}`}
                                alt="Description for image 2"
                                className="w-100 m-0 p-0"
                              />
                              <img
                                src={`${IMG_URL}/AboutUS/${item.image3}`}
                                alt="Description for image 3"
                                className="w-100 m-0 p-0"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
			<footer id="site-footer" className="site-footer m-0">
				<div className="footer">
					<div className="section-padding">
						<div className="section-container">
							<div className="block-widget-wrap">
								<div className="row">
									<div className="col-lg-3 col-md-6">
										<div className="block block-image">
											<img width="100" src={logo2} alt="logo.png" />
										</div>
									</div>
									<div className="col-lg-3 col-md-6">
										<div className="block block-menu">
											<h2 className="block-title">Contact Us</h2>
											<div className="block-content">
												<ul>
													
													<li>
														<a href="tel:8989000066">Mo.: +91 8989000066</a>
													</li>
													<li>
														<a href="mailto:info@micasasucasa.in">info@micasasucasa.in</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-md-6">
										<div className="block block-menu">
											<h2 className="block-title">Services</h2>
											<div className="block-content">
												<ul>
													<li>
														<Link to='/about' >About US</Link>
													</li>
													<li>
														<Link to='/contact'>Contact US</Link>
													</li>
													<li>
														<Link to='/terms' >Terms & Conditions</Link>
													</li>
													<li>
														<Link to='/privacy' >Privacy Policy</Link>
													</li>
													<li>
														<Link to='/shippingpolicy' >Shipping Policy</Link>
													</li>
													<li>
														<Link to='/refund' >Return & Refund</Link>
													</li>
													<li>
														<Link to='/sitefaq' >Faq</Link>
													</li>
													<li>
														<Link to='/imagegallery' >Image Gallery</Link>
													</li>
												
												</ul>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-md-6">
										<div className="block block-newsletter">
											<h2 className="block-title">Newsletter</h2>
											<div className="block-content">
												<div className="newsletter-text">Enter your email below to be the first to know about new collections and product launches.</div>
												<form action="" method="post" className="newsletter-form">
													<input type="email" name="your-email" value="" size="40" placeholder="Email address" />
													<span className="btn-submit">
														<input type="submit" value="Subscribe" />
													</span>
												</form>
											</div>
										</div>

										<div className="block block-image">
											<img width="400" height="79" src={payments} alt="" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<div class="back-top button-show" >
					<i class="arrow_carrot-up"></i>
				</div>


				<div className="footer-bottom">
					<div className="section-padding">
						<div className="section-container">
							<div className="block-widget-wrap">
								<div className="row">
									<div className="col-md-6">
										<div className="footer-left">
											<p className="copyright">Copyright © 2022. All Right Reserved</p>
										</div>
									</div>
									<div className="col-md-6">
										<div className="footer-right">
											<div className="block block-social">
												<ul className="social-link">
												    <li><a href="mailto:info@micasasucasa.in"><i className="fa fa-envelope" ></i></a></li>
													<li><a href="http://instagram.com/_u/micasasucasa.in/"><i className="fa fa-instagram" ></i></a></li>
													<li><a href="#"><i className="fa fa-dribbble" ></i></a></li>
													<li><a href="#"><i className="fa fa-behance" ></i></a></li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
    </div>
  );
};

export default About;
