import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl';
import useBreadcrumb from '../../Utils/Breadcrum';

const CustomizationPage = () => {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});
    const [value, setValue] = useState({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
        mobile: "",
        image: null,
    });

    const breaddata = useBreadcrumb(2)

    const handlechange = (e) => {
        if (e.target.name === 'image') {
            setValue((prev) => ({ ...prev, image: e.target.files[0] }));
        } else {
            setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };
    

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
        e.preventDefault();
        
        if (validateForm()) {
            const formData = new FormData();
            formData.append('name', `${value.firstname} ${value.lastname}`);
            formData.append('inquiry', value.message);
            formData.append('email', value.email);
            formData.append('mobile', value.mobile);
            formData.append('image', value.image);  // Ensure image is appended
    
            // Double-check that the image is not null
            console.log("Image being sent:", value.image);  
    
            axios.post(`${BASE_URL}/sendinquiry`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                if (res.data) {
                    alert("Form Submitted");
                    setValue({
                        firstname: "",
                        lastname: "",
                        email: "",
                        message: "",
                        mobile: "",
                        image: null,
                    });
                }
            });
        }
    };
    
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
                                    <a href="index.html">Home</a><span class="delimiter"></span>Customization
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
                                                    <h2>Send us customization request.</h2>
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
                                                                    {errors.firstname && (<span className="text-danger">{errors.firstname}</span>)}
                                                                </div>
                                                                <div class="col-sm-12 col-md-6">
                                                                    <label class="required">Lastname</label><br />
                                                                    <span class="form-control-wrap">
                                                                        <input type="text" value={value.lastname} onChange={handlechange} name="lastname" size="40" class="form-control" aria-required="true" />
                                                                    </span>
                                                                    {errors.lastname && (<span className="text-danger">{errors.lastname}</span>)}
                                                                </div>
                                                                <div class="col-sm-12 col-md-6">
                                                                    <label class="required">Email</label><br />
                                                                    <span class="form-control-wrap">
                                                                        <input type="email" value={value.email} onChange={handlechange} name="email" size="40" class="form-control" aria-required="true" />
                                                                    </span>
                                                                    {errors.email && (<span className="text-danger">{errors.email}</span>)}
                                                                </div>
                                                                <div class="col-sm-12 col-md-6">
                                                                    <label class="required">Mobile</label><br />
                                                                    <span class="form-control-wrap">
                                                                        <input type="text" value={value.mobile} onChange={handlechange} name="mobile" size="40" class="form-control" aria-required="true" />
                                                                    </span>
                                                                    {errors.mobile && (<span className="text-danger">{errors.mobile}</span>)}
                                                                </div>
                                                                <div class="col-sm-12 col-md-6">
                                                                    <label class="required">Product Image(That you like)</label><br />
                                                                    <span class="form-control-wrap">
                                                                        <input type="file" onChange={handlechange} name="image" size="40" class="form-control" aria-required="true" />
                                                                    </span>
                                                                    {errors.image && (<span className="text-danger">{errors.image}</span>)}
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

export default CustomizationPage