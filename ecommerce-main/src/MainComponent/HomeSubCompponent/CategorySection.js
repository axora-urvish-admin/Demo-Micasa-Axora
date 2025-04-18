import procat1 from '../../assets/frontimg/banner/product-cat-1.jpg'
import procat2 from '../../assets/frontimg/banner/product-cat-2.jpg'
import procat3 from '../../assets/frontimg/banner/product-cat-3.jpg'
import procat4 from '../../assets/frontimg/banner/product-cat-4.jpg'
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const CategorySection = () => {
  const [banner, setBanner] = useState([])


  async function getTrendingData() {
    axios.get(`${BASE_URL}/group_data`)
      .then((res) => {
        console.log(res)
        setBanner(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }



  useEffect(() => {
    getTrendingData()
  }, [])
  return (
    <section class="section section-padding m-b-60 py-5 bg-dark">
      <div class="section-container">

        <div class="block block-banners layout-1 banners-effect">
          <div class="section-row">
            <div class="section-column left sm-m-b">
              <div class="section-column-wrap">
                <div class="block-widget-wrap">
                  <div class="block-widget-banner layout-1">
                    <div class="bg-banner">
                      <div class="banner-wrapper banners">
                        <div class="banner-image">
                          <Link to={`/shoproduct/${banner[0]?.slug}`}>
                            <img width="571" height="622" src={`${IMG_URL}/group/${banner[0]?.image}`} alt="Banner" />
                          </Link>
                        </div>
                        <div class="banner-wrapper-infor">
                          <div class="info">
                            <div class="content">
                              <Link class="button button-white" to={`/shoproduct/${banner[0]?.slug}`}>{banner[0]?.title}</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="section-column right">
              <div class="section-column-wrap">
                <div class="block-widget-wrap p-0">

                  {/* <div class="block-section m-b-15">
                    <div class="section-container">
                      <div class="section-row">
                        <div class="section-column column-50 sm-m-b">
                          <div class="block-widget-wrap">
                            <div class="block-widget-banner layout-1">
                              <div class="bg-banner">
                                <div class="banner-wrapper banners">
                                  <div class="banner-image">
                                    <Link href="shop-grid-left.html">
                                      <img width="406" height="304" src={`${IMG_URL}/group/${banner[1]?.image}`}  alt="Banner" />
                                    </Link>
                                  </div>
                                  <div class="banner-wrapper-infor">
                                    <div class="info">
                                      <div class="content">
                                        <Link class="button button-white"  href={`https://ecom.thetalentclub.co.in/${banner[1]?.slug}`}>{banner[1]?.title}</Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="section-column column-50">
                          <div class="block-widget-wrap">
                            <div class="block-widget-banner layout-1">
                              <div class="bg-banner">
                                <div class="banner-wrapper banners">
                                  <div class="banner-image">
                                    <Link href="shop-grid-left.html">
                                      <img width="406" height="304" src={`${IMG_URL}/group/${banner[2]?.image}`} alt="Banner" />
                                    </Link>
                                  </div>
                                  <div class="banner-wrapper-infor">
                                    <div class="info">
                                      <div class="content">
                                        <Link class="button button-white"  href={`https://ecom.thetalentclub.co.in/${banner[2]?.slug}`}>{banner[2]?.title}</Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div class="block-section m-b-15">
                    <div class="section-container">
                      <div class="section-row">
                        <div class="section-column">
                          <div class="block-widget-wrap">
                            <div class="block-widget-banner layout-1">
                              <div class="bg-banner">
                                <div class="banner-wrapper banners">
                                  <div class="banner-image">
                                    <Link to={`/shoproduct/${banner[1]?.slug}`}>
                                      <img width="406" height="304" src={`${IMG_URL}/group/${banner[1]?.image}`} alt="Banner" />
                                    </Link>
                                  </div>
                                  <div class="banner-wrapper-infor">
                                    <div class="info">
                                      <div class="content">
                                        <Link class="button button-white"  to={`/shoproduct/${banner[1]?.slug}`}>{banner[1]?.title}</Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="block-section">
                    <div class="section-container">
                      <div class="section-row">
                        <div class="section-column">
                          <div class="block-widget-wrap">
                            <div class="block-widget-banner layout-1">
                              <div class="bg-banner">
                                <div class="banner-wrapper banners">
                                  <div class="banner-image">
                                    <Link to={`/shoproduct/${banner[2]?.slug}`}>
                                      <img width="406" height="304" src={`${IMG_URL}/group/${banner[2]?.image}`} alt="Banner" />
                                    </Link>
                                  </div>
                                  <div class="banner-wrapper-infor">
                                    <div class="info">
                                      <div class="content">
                                        <Link class="button button-white"  to={`/shoproduct/${banner[2]?.slug}`}>{banner[2]?.title}</Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategorySection