import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import './BannerSliderBtn.css'
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl';
import { Link } from 'react-router-dom';

const BannerSection = ({ setLoader }) => {
  const [banner, setBanner] = useState([]);
  const [minHeight, setMinHeight] = useState('100vh'); // Default to desktop
  const [fontSize, setFontSize] = useState('24px'); // Default font size for desktop

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  async function getTrendingData() {
    axios.get(`${BASE_URL}/main_Banner`)
      .then((res) => {
        console.log(res.data);

        const filteredData = res.data.filter(item => {
          if (window.innerWidth <= 768) {
            return item.view === 1; // Mobile
          } else {
            return item.view === 2; // Desktop
          }
        });

        setBanner(filteredData);

        const timeoutId = setTimeout(() => {
          setLoader(false);
        }, 500);

        return () => clearTimeout(timeoutId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getTrendingData();

    const updateStyles = () => {
      if (window.innerWidth <= 768) {
        setMinHeight('25vh'); // Mobile
        setFontSize('16px'); // Smaller font size for mobile
        console.log('Styles updated for mobile: MinHeight 25vh, FontSize 16px');
      } else {
        setMinHeight('100vh'); // Desktop
        setFontSize('24px'); // Larger font size for desktop
        console.log('Styles updated for desktop: MinHeight 100vh, FontSize 24px');
      }
    };

    updateStyles(); // Set initial values
    window.addEventListener('resize', updateStyles);

    return () => window.removeEventListener('resize', updateStyles);
  }, []);

  return (
    <section class="section">
      <div class="block block-sliders">
        <Slider {...settings}>
          {banner?.map((item) => {
            return (
              <Link to={item.link} class="item slick-slide">
                <div class="item-content">
                  <div class="content-image" >
                    <img width="100" height="100" style={{ minHeight }} src={`${IMG_URL}/banner/${item.upload_image}`} alt="Slider" />
                  </div>
                  <div class="section-padding">
                    <div class="section-container">
                      <div class="item-info horizontal-start vertical-middle">
                        <div class="content">
                          <h2 class="title-slider" style={{ fontSize }}>{item.title}</h2>
                          <div class="description-slider" style={{ fontSize }}>{item.description} </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </Slider>
      </div>
    </section>
  )
}

export default BannerSection
