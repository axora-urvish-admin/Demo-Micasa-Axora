import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../AdminComponent/BaseUrl'
import { Helmet } from "react-helmet";


const VendorRegister = () => {
    const [data, setData] = useState([])
    const [errors, setErrors] = useState({});
    const [value, setValue] = useState({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
        mobile: "",

    })

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

            axios.post(`${BASE_URL}/vendor_regitration_request`, data)
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
            page_id: 17
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
                <Helmet>
                    <title>{data.seo_title}</title>
                    <meta name="description" content={data.seo_desc} dangerouslySetInnerHTML={{ __html: data.seo_desc }} />
                    <meta name="author" content={data.seo_title} />
                </Helmet>
                <div id="main-content" class="main-content">
                    <div id="primary" class="content-area">
                        <div id="title" class="page-title">
                            <div class="section-container d-flex justify-content-center">
                                <div class="content-title-heading">
                                
                                </div>
                                <div 
                                    class="breadcrumbs bg-light" 
                                    style={{
                                        width: "fit-content",
                                        padding: "5px 10px",
                                    }}
                                >
                                    <a href="index.html">Home</a><span class="delimiter"></span>Vendor Registration
                                </div>
                            </div>
                        </div>

                        <div id="content" class="site-content" role="main">
                            <div class="page-contact">

                                <section class="section section-padding  m-b-0">
                                    <div class="section-container small">

                                        <div class="block block-contact-form">
                                            <div class="block-widget-wrap">
                                                <div class="block-title">
                                                    <h2>Fill this form for registration!</h2>
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
                                                                    <label>Message</label><br />
                                                                    <span class="form-control-wrap">
                                                                        <textarea name="message" value={value.message} onChange={handlechange} cols="40" rows="10" class="form-control" aria-required="true"></textarea>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="form-button">
                                                                <input type="submit" value="Register" class="button" />
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

export default VendorRegister