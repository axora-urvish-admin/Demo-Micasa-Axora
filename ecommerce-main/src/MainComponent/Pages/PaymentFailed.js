import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import check from '../../assets/images/check.png';
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from 'axios';
import { BASE_URL } from '../../AdminComponent/BaseUrl';

const PaymentFailed = () => {
    const [data, setData] = useState([])
    const Name = localStorage.getItem('Name')

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get('transactionid');
   
    console.log(transactionId , "dnjkad")
    alert(transactionId)

    async function getmetadetail() {
        const data = {
            page_id: 8
        }
        axios.post(`${BASE_URL}/getmetadetail`, data)
            .then((res) => {
                setData(res.data[0])
            })
    }

    useEffect (() => {
        getmetadetail()
    }, [])
    return (
        <div>
            <div id="site-main" class="site-main" style={{paddingTop : "100px"}}>
                <Helmet>
                    <title>{data.seo_title}</title>
                    <meta name="description" content={data.seo_desc} dangerouslySetInnerHTML={{ __html: data.seo_desc }} />
                    <meta name="author" content={data.seo_title} />
                </Helmet>
                <div id="main-content" class="main-content">
                    <div id="primary" class="content-area">

                        <div id="content" class="site-content" role="main">
                            <div class="page-contact">


                                <section class="section section-padding m-b-70">
                                    <div class="section-container">

                                        <div class="">
                                            <div class="block-widget-wrap text-center my-5">
                                                <img src={check} style={{width : "100px"}} alt='logo' />
                                                <h1 className='my-2 text-danger'>PAYMENT FAILED</h1>
                                                <p>Dear <b>{Name}</b> ,Your transactionid is <b>{transactionId}</b></p>
                                                <Link style={{color : "blue",textDecoration : "underline"}} to="/profile/order">Click here to check more details</Link>
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

export default PaymentFailed;