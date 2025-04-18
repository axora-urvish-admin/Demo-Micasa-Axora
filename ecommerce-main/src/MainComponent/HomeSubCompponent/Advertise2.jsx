import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl';
import { Link } from 'react-router-dom';

const Advertise2 = () => {
  const [data, setData] = useState([]);
  const [slot, setSlot] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function getLocation() {
    const requestData = { locid: 2 };

    try {
      const response = await axios.post(`${BASE_URL}/getlocation`, requestData);
      setData(response.data);
      setSlot(Number(response.data[0]?.slot || 1)); // Default to 1 if slot is undefined
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <section className="section section-padding m-b-70">
        <div className="section-container">
          <div className="row">
            {isLoading ? (
              <p>Loading...</p> // Optional loading state
            ) : (
              <Swiper
                spaceBetween={20}
                slidesPerView={4}
                modules={[Navigation, Thumbs]}
                navigation
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: slot, // Dynamically set slot
                  },
                  1024: {
                    slidesPerView: slot,
                  },
                }}
              >
                {data.map((item) => (
                  <SwiperSlide key={item.id}>
                    {item.type === 'Image' ? (
                      <Link to={item.link}>
                        <img src={`${IMG_URL}/Advertisement/${item.image}`} alt={item.title} />
                      </Link>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: item.iframe }} />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Advertise2;
