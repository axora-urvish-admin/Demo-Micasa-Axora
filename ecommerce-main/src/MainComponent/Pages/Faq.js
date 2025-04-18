import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl'
import { Helmet } from "react-helmet";
import useBreadcrumb from '../../Utils/Breadcrum';

const SiteFaq = () => {
    const [data, setData] = useState([])
    const [metadata, setMeta] = useState([])
    const breaddata = useBreadcrumb(5)
    
    async function getmetadetail() {

        axios.get(`${BASE_URL}/getfaq`, data)
            .then((res) => {
                setData(res.data)
            })
    }

    async function getmetadetails() {
        const data = {
            page_id: 5
        }
        axios.post(`${BASE_URL}/getmetadetail`, data)
            .then((res) => {
                setMeta(res.data[0])
            })
    }

    useEffect(() => {
        getmetadetail()
        getmetadetails()
    }, [])

    return (
        <div>
            <div id="site-main" class="site-main">
                <Helmet>
                    <title>{metadata.seo_title}</title>
                    <meta name="description" content={metadata.seo_desc} dangerouslySetInnerHTML={{ __html: metadata.seo_desc }} />
                    <meta name="author" content={metadata.seo_title} />
                </Helmet>
                <div id="main-content" class="main-content">
                    <div id="primary" class="content-area">
                    <div id="title" className="page-title" style={{backgroundImage:`url('${IMG_URL}/Breadcrumbs/${breaddata}')`}}>
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
                                    <a href="index.html">Home</a><span class="delimiter"></span>Faq
                                </div>
                            </div>
                        </div>

                        <div id="content" class="site-content" role="main">
                            <div class="page-contact">


                                <section class="section section-padding m-b-70">
                                    <div class="section-container">

                                        <div class="">
                                            <div class="block-widget-wrap">


                                                {data.map((item) => {
                                                    return (
                                                        <div class="">
                                                            <h2>{item.title}</h2>
                                                            <p  dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                                                            <hr/>
                                                        </div>
                                                    )
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
        </div>
    )
}

export default SiteFaq;