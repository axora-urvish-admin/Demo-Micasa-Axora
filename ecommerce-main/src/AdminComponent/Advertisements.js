// import axios from 'axios';
// import Loader from "./Loader";
// import React, { useEffect, useState } from 'react';
// import { BASE_URL } from './BaseUrl';
// import InnerHeader from './InnerHeader';
// const Advertisements = () => {

//     const [errors, setErrors] = useState({})
//     const [image, setImage] = useState()
//     const [uid, setupdateDate] = useState([])
//     const [banner, setBanner] = useState([])
//     const [loader , setLoader] = useState(false)
//     const [value, setValue] = useState({
//         title: "" || uid.title,
//         banner: "" || uid.banner,
//         target: "" || uid.target,
//         link: "" || uid.link,
//         view: "" || uid.view,
//         description: "" || uid.description,

//     })



//     useEffect(() => {
//         setValue({
//             title: uid.title,
//             banner: uid.banner,
//             target: uid.target,
//             link: uid.link,
//             view: uid.view,
//             description: uid.description,

//         })
//     }, [uid])

//     console.log(uid.upload_image)

//     const validateForm = () => {
//         let isValid = true;
//         const newErrors = { ...errors };

//         if (!value.title) {
//             isValid = false;
//             newErrors.title = "Title is required";
//         }
//         if (uid.upload_image == undefined && !image) {
//             isValid = false;
//             newErrors.banner = "Banner is required";
//         }
//         if (!value.link) {
//             isValid = false;
//             newErrors.link = "Link is required"
//         }
//         if (!value.target) {
//             isValid = false;
//             newErrors.target = "Target is required"
//         }
//         if (!value.target) {
//             isValid = false;
//             newErrors.target = "Target is required"
//         }
//         if (!value.view) {
//             isValid = false;
//             newErrors.view = "View is required"
//         }



//         setErrors(newErrors);
//         setTimeout(() => {
//             setErrors("")
//         }, 5000);

//         return isValid;


//     }



//     async function bannerdata() {
//         axios.get(`${BASE_URL}/banner_data`)
//             .then((res) => {
//                 console.log(res)
//                 setBanner(res.data)
//             })
//     }



//     const handleUpdate = (id) => {
//         setValue({
//             description: ""
//         })

//         setLoader(true)

//         const data = {
//             bannerid: id
//         }
//         axios.post(`${BASE_URL}/banner_updateid`, data)
//             .then((res) => {

//                 setupdateDate(res.data[0])
//                 setLoader(false)
//             })


//     }






//     useEffect(() => {
//         bannerdata()
//     }, [])













//     const handleSubmit = (e, viewid) => {
//         e.preventDefault()


//         if (validateForm()) {

//             setLoader(true)

//             const formdata = new FormData()
//             formdata.append('title', value.title)
//             if(image){

//                 formdata.append('image', image)
//             }else{
//                 formdata.append('image', uid.upload_image)

//             }
//             formdata.append('link', value.link)
//             formdata.append('target', value.target)
//             formdata.append('viewid', value.view)
//             formdata.append('uid', uid.id)
//             formdata.append('description', value.description)



//             axios.post(`${BASE_URL}/add_banner`, formdata)
//                 .then((res) => {
//                     bannerdata()
//                     if (res.data) {
//                         //    navigate('/vendormaster')
//                     }
//                     setLoader(false)
//                     alert("Data Submitted Successfully")
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 })

//         }

//     }

//   return (
//     <div className="container-fluid page-body-wrapper col-lg-10" style={{position :"relative"}}>
//             <InnerHeader />
//             {loader &&  <Loader />}
//             <div className="container mt-5">
//         <h3 className="mb-4">List of Advertisements</h3>
//         <div className="table-responsive">
//           <table className="table table-hover align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th scope="col">ID</th>
//                 <th scope="col">Advertisement Name</th>
//                 <th scope="col">Type</th>
//                 <th scope="col">Preview</th>
//                 <th scope="col">Position</th>
//                 <th scope="col">Status</th>
//                 <th scope="col">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>1</td>
//                 <td>Ad Slot 1</td>
//                 <td>Image</td>
//                 <td>
//                   <img
//                     src="./chair.jpg"
//                     className="img-fluid"
//                     width="50px"
//                     alt="Ad Preview"
//                   />
//                 </td>
//                 <td>2-slot</td>
//                 <td>
//                   <div className="form-check form-switch">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       role="switch"
//                       id="flexSwitchCheckDefault"
//                       checked
//                     />
//                   </div>
//                 </td>
//                 <td>
//                   <button className="btn btn-sm btn-outline-primary">
//                     <i className="bi bi-pencil-fill"></i>
//                   </button>
//                   <button className="btn btn-sm btn-outline-danger">
//                     <i className="bi bi-trash-fill"></i>
//                   </button>
//                 </td>
//               </tr>
//               <tr>
//                 <td>2</td>
//                 <td>Ad Slot 2</td>
//                 <td>Iframe</td>
//                 <td>
//                   <iframe
//                     width="50"
//                     height="50"
//                     src="https://www.youtube.com/embed/ThPinA3THas?si=zg76TJCzVQchBZAU"
//                     title="YouTube video player"
//                     frameborder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                     referrerpolicy="strict-origin-when-cross-origin"
//                     allowfullscreen
//                   ></iframe>
//                 </td>
//                 <td>4-slot</td>
//                 <td>
//                   <div className="form-check form-switch">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       role="switch"
//                       id="flexSwitchCheckDefault"
//                     />
//                   </div>
//                 </td>
//                 <td>
//                   <button className="btn btn-sm btn-outline-primary">
//                     <i className="bi bi-pencil-fill"></i>
//                   </button>
//                   <button className="btn btn-sm btn-outline-danger">
//                     <i className="bi bi-trash-fill"></i>
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//         </div>
//   );
// };

// export default Advertisements;
