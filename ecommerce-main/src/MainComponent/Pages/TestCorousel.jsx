// import React, { useEffect } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';
// import SwiperCore, { Navigation, Thumbs } from 'swiper';

// SwiperCore.use([Navigation, Thumbs]);


// const TestCorousel = () => {
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);

//     const [data, setData] = useState([])


//     async function getimages() {

//         axios.get(`${BASE_URL}/get_gallery`, data)
//             .then((res) => {
//                 setData(res.data)
//             })
//     }

//     useEffect(() =>{
//           getimages()
//     },[])

//     return (
//         <div className="carousel-container">
//             {/* Main Image Carousel */}
//             <Swiper
//                 spaceBetween={10}
//                 navigation={true}
//                 thumbs={{ swiper: thumbsSwiper }}
//                 className="main-carousel"
//             >
//                 {data.map((item, index) => (
//                     <SwiperSlide key={index}>
//                         <img src={`${IMG_URL}/gallery/${item.upload_image}`} alt={`Slide ${index}`} />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>

//             {/* Thumbnail Carousel */}
//             <Swiper
//                 onSwiper={setThumbsSwiper}
//                 spaceBetween={10}
//                 slidesPerView={3}
//                 direction="vertical"
//                 className="thumbnail-carousel"
//             >
//                 {data.map((item, index) => (
//                     <SwiperSlide key={index}>
//                         <img src={`${IMG_URL}/gallery/${item.upload_image}`} alt={`Thumbnail ${index}`} />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     )
// }

// export default TestCorousel