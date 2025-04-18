import React from "react";
import { useState } from "react";
// import logo from '../../assets/frontimg/logo.png'
import payments from "../../assets/frontimg/payments.png";
import "../../Style.css";
import { Link } from "react-router-dom";
import logo2 from "../../assets/images/mica.png";

const SiteFooter = () => {
    const [email, setEmail] = useState("")

    const handleTop = () => {
        // window.scrollTo(0, 0,);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div>
            <footer id="site-footer" className="site-footer">
                <div className="footer">
                    <div className="section-padding">
                        <div className="section-container">
                            <div className="block-widget-wrap">
                                <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <div className="block block-image">
                                            <img
                                                width="100"
                                                src={logo2}
                                                alt="logo.png"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="block block-menu">
                                            <h2 className="block-title">
                                                Contact Us
                                            </h2>
                                            <div className="block-content">
                                                <ul>
                                                    <li>
                                                        <a href="tel:8989000066">
                                                            Mo.: +91 8989000066
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="mailto:info@micasasucasa.in">
                                                            info@micasasucasa.in
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="block block-menu">
                                            <h2 className="block-title">
                                                Services
                                            </h2>
                                            <div className="block-content">
                                                <ul>
                                                    <li>
                                                        <Link to="/about">
                                                            About US
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/contact">
                                                            Contact US
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/terms">
                                                            Terms & Conditions
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/privacy">
                                                            Privacy Policy
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/shippingpolicy">
                                                            Shipping Policy
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/refund">
                                                            Return & Refund
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/sitefaq">
                                                            FAQ
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/imagegallery">
                                                            Image Gallery
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="block block-newsletter">
                                            <h2 className="block-title">
                                                Newsletter
                                            </h2>
                                            <div className="block-content">
                                                <div className="newsletter-text">
                                                    Enter your email below to be
                                                    the first to know about new
                                                    collections and product
                                                    launches.
                                                </div>
                                                <form
                                                    action=""
                                                    method="post"
                                                    className="newsletter-form"
                                                >
                                                    <input
                                                        type="email"
                                                        name="your-email"
                                                        value={email}
                                                        onChange={(e)=>setEmail(e.target.value)}
                                                        size="40"
                                                        placeholder="Email address"
                                                    />
                                                    <span className="btn-submit">
                                                        <input
                                                            type="submit"
                                                            value="Subscribe"
                                                        />
                                                    </span>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="block block-image">
                                            <img
                                                width="400"
                                                height="79"
                                                src={payments}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="back-top button-show" onClick={handleTop}>
                    <i class="arrow_carrot-up"></i>
                </div>

                <div className="footer-bottom">
                    <div className="section-padding">
                        <div className="section-container">
                            <div className="block-widget-wrap">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="footer-left">
                                            <p className="copyright">
                                                Copyright © 2022. All Right
                                                Reserved
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="footer-right">
                                            <div className="block block-social">
                                                <ul className="social-link">
                                                    <li>
                                                        <a href="mailto:info@micasasucasa.in">
                                                            <i className="fa fa-envelope"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="http://instagram.com/_u/micasasucasa.in/">
                                                            <i className="fa fa-instagram"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fa fa-dribbble"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fa fa-behance"></i>
                                                        </a>
                                                    </li>
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
    );
};

export default SiteFooter;
