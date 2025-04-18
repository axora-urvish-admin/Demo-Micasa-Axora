import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AboutSection from '../HomeSubCompponent/AboutSection'
import AdvertiseSection from '../HomeSubCompponent/AdvertiseSection'
import AmenitiesSection from '../HomeSubCompponent/AmenitiesSection'
import TrendingSection from '../HomeSubCompponent/TrendingSection'
import BannerSection from '../HomeSubCompponent/BannerSection'
import CategorySection from '../HomeSubCompponent/CategorySection'
import axios from 'axios'
import { BASE_URL } from '../../AdminComponent/BaseUrl'
import custdecryptedUserId from '../../Utils/CustUserid'
import Cookies from 'js-cookie';
import { getCartCount } from '../../Store/Cart/cart-action'
import { useDispatch } from 'react-redux'
import { Helmet } from "react-helmet";
import MovingCategory from '../HomeSubCompponent/MovingCategory'
import Advertise2 from '../HomeSubCompponent/Advertise2'
import SiteLoader from '../Ui/SiteLoader'




const DashBoard = () => {

  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)

  async function getmetadetail() {
    const data = {
      page_id: 6
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
    <div id="site-main" class="site-main" style={{marginTop:"84px"}}>
            {loader && <SiteLoader />}
      <Helmet>
        <title>{data.seo_title}</title>
        <meta name="description" content={data.seo_desc} dangerouslySetInnerHTML={{ __html: data.seo_desc }} />
        <meta name="author" content={data.seo_title} />
      </Helmet>

      <div id="main-content" class="main-content">
        <div id="primary" class="content-area">
          <div id="content" class="site-content" role="main">

            <BannerSection setLoader={setLoader} />

            <MovingCategory />

            <AdvertiseSection />
            <Advertise2 />

            {/* <CategorySection /> */}

            <TrendingSection />


            {/* <AboutSection /> */}

            <AmenitiesSection />


          </div>
        </div>
      </div>
    </div>

  )
}

export default DashBoard