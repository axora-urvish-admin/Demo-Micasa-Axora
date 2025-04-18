import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl'
import { Helmet } from "react-helmet";
import useBreadcrumb from '../../Utils/Breadcrum';
import { Link } from 'react-router-dom';

const Contact = () => {
    const [data, setData] = useState([])
    const [errors, setErrors] = useState({});
    const [value, setValue] = useState({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
        mobile: "",

    })
    const breaddata = useBreadcrumb(1)

    const handlechange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const validateForm = () => {
        let errors = {};
        let isValid = true;


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.email)) {
            isValid = false;
            errors.email = "Invalid email format";
        }
        if (!value.firstname) {
            errors.firstname = 'Firstname is required';
            isValid = false;
        }
        if (!value.lastname) {
            errors.lastname = 'Lastname is required';
            isValid = false;
        }
        const mobileNumberRegex = /^\d{10,15}$/;
        if (!mobileNumberRegex.test(value.mobile)) {
            isValid = false;
            errors.mobile = "Mobile number must be between 10 ";
        }


        setErrors(errors);

        return isValid;
    };


    const handlesubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const data = {
                firstname: value.firstname,
                lastname: value.lastname,
                email: value.email,
                mobile: value.mobile,
                message: value.message
            }

            console.log(data)

            axios.post(`${BASE_URL}/getintouch`, data)
                .then((res) => {
                    console.log(res)
                    if (res.data) {
                        alert("Form Submitted")
                        setValue({
                            firstname: "",
                            lastname: "",
                            email: "",
                            message: "",
                            mobile: "",

                        })
                    }
                })
        }


    }

    async function getmetadetail() {
        const data = {
            page_id: 1
        }
        axios.post(`${BASE_URL}/getmetadetail`, data)
            .then((res) => {
                setData(res.data[0])
            })
    }

    useEffect(() => {
        getmetadetail()
    }, [])

    return (
        <div>
            <div id="site-main" class="site-main">
                <div
                    className="fixed-button"
                    style={{
                        position: "fixed",
                        right: 20,
                        top: "30%",
                        zIndex: 1000,
                        transform: "translateY(-50%)",
                    }}>
                    <Link to="/vendorregister"><button className="btn fw-bold" style={{ writingMode: "vertical-rl", textOrientation: "mixed", backgroundColor:"#000000", color:"#fff" }}> Vendor Register </button></Link>
                </div>
                <Helmet>
                    <title>{data.seo_title}</title>
                    <meta name="description" content={data.seo_desc} dangerouslySetInnerHTML={{ __html: data.seo_desc }} />
                    <meta name="author" content={data.seo_title} />
                </Helmet>
                <div id="main-content" class="main-content">
                    <div id="primary" class="content-area">

                        <div id="title" className="page-title" style={{ backgroundImage: `url('${IMG_URL}/Breadcrumbs/${breaddata}')` }}>
                            <div class="section-container d-flex justify-content-center">
                                <div class="content-title-heading">
                                </div>
                                <div 
                                class="breadcrumbs bg-light"
                                style={{
                                    width: "fit-content",
                                    padding: "5px 10px",
                                }}>
                                    <a href="index.html">Home</a><span class="delimiter"></span>Contact Us
                                </div>
                            </div>
                        </div>

                        <div id="content" class="site-content" role="main">
                            <div class="page-contact">
                                <section class="section section-padding">
                                    <div class="section-container small">

                                        <div class="block block-contact-map">
                                            <div class="block-widget-wrap">

                                                {/* <iframe src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near" aria-label="London Eye, London, United Kingdom"></iframe> */}

                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section class="section section-padding m-b-70">
                                    <div class="section-container">

                                        <div class="block block-contact-info">
                                            <div class="block-widget-wrap">
                                                {/* <div class="info-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="svg-icon2 plant" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path xmlns="http://www.w3.org/2000/svg" d="m320.174 28.058a8.291 8.291 0 0 0 -7.563-4.906h-113.222a8.293 8.293 0 0 0 -7.564 4.907l-66.425 148.875a8.283 8.283 0 0 0 7.564 11.655h77.336v67.765a20.094 20.094 0 1 0 12 0v-67.765h27.7v288.259h-48.441a6 6 0 0 0 0 12h108.882a6 6 0 0 0 0-12h-48.441v-288.259h117.04a8.284 8.284 0 0 0 7.564-11.657zm-103.874 255.567a8.094 8.094 0 1 1 8.094-8.093 8.1 8.1 0 0 1 -8.094 8.093zm-77.61-107.036 63.11-141.437h108.4l63.11 141.437z" fill="" data-original="" style=""></path></g></svg>
                                                </div> */}


                                                <div class="info-title">
                                                    <h2>Need Help?</h2>
                                                </div>
                                                <div class="info-items">
                                                    <div class="row">
                                                        <div class="col-md-4 sm-m-b-30">
                                                            <div class="info-item">
                                                                <div class="item-tilte">
                                                                    <h2>Phone</h2>
                                                                </div>
                                                                <div class="item-content">
                                                                +91-8989000066
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4 sm-m-b-30">
                                                            <div class="info-item">
                                                                <div class="item-tilte">
                                                                    <h2>Customer Service</h2>
                                                                </div>
                                                                <div class="item-content">
                                                                    <p>Monday to Friday</p>
                                                                    <p>9:00am – 6:00pm India</p>
                                                                    <p>Saturday and Sunday closed</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="info-item">
                                                                <div class="item-tilte">
                                                                    <h2>Returns</h2>
                                                                </div>
                                                                <div class="item-content small-width">
                                                                    For information on Returns and Refunds, please click <a href="#">here.</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section class="section section-padding  m-b-0">
                                    <div class="section-container small">

                                        <div class="block block-contact-form">
                                            <div class="block-widget-wrap">
                                                <div class="block-title">
                                                    <h2>Send Us Your Questions!</h2>
                                                    <div class="sub-title">We’ll get back to you within two days.</div>
                                                </div>
                                                <div class="block-content">
                                                    <form onSubmit={handlesubmit} action="" method="post" class="contact-form" novalidate="novalidate">
                                                        <div class="contact-us-form">
                                                            <div class="row">
                                                                <div class="col-sm-12 col-md-6">
                                                                    <label class="required">Firstname</label><br />
                                                                    <span class="form-control-wrap">
                                                                        <input type="text" value={value.firstname} onChange={handlechange} name="firstname" size="40" class="form-control" aria-required="true" />
                                                                    </span>
                                                                    {errors.firstname && (<span className="text-danger">{errors.firstname}</span>
                                                                    )}
                                                                </div>
                                                                <div class="col-sm-12 col-md-6">
                                                                    <label class="required">Lastname</label><br />
                                                                    <span class="form-control-wrap">
                                                                        <input type="text" value={value.lastname} onChange={handlechange} name="lastname" size="40" class="form-control" aria-required="true" />
                                                                    </span>
                                                                    {errors.lastname && (<span className="text-danger">{errors.lastname}</span>
                                                                    )}
                                                                </div>
                                                                <div class="col-sm-12 col-md-6">
                                                                    <label class="required">Email</label><br />
                                                                    <span class="form-control-wrap">
                                                                        <input type="email" value={value.email} onChange={handlechange} name="email" size="40" class="form-control" aria-required="true" />
                                                                    </span>
                                                                    {errors.email && (<span className="text-danger">{errors.email}</span>
                                                                    )}
                                                                </div>
                                                                <div class="col-sm-12 col-md-6">
                                                                    <label class="required">Mobile</label><br />
                                                                    <span class="form-control-wrap">
                                                                        <input type="text" value={value.mobile} onChange={handlechange} name="mobile" size="40" class="form-control" aria-required="true" />
                                                                    </span>
                                                                    {errors.mobile && (<span className="text-danger">{errors.mobile}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-sm-12">
                                                                    <label class="required">Message</label><br />
                                                                    <span class="form-control-wrap">
                                                                        <textarea name="message" value={value.message} onChange={handlechange} cols="40" rows="10" class="form-control" aria-required="true"></textarea>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="form-button">
                                                                <input type="submit" value="Submit" class="button" />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact