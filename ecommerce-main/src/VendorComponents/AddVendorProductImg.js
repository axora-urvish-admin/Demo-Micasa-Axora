import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import img1 from "../assets/images/product_default_image.jpg";
import EditIcon from "@mui/icons-material/Edit";
import InnerHeader from './InnerHeader';
import axios from 'axios';
import { BASE_URL, IMG_URL } from '../AdminComponent/BaseUrl';
import { Autocomplete, TextField } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import CustomHeder from './CustomHeder';
import Loader from './Loader';
import CloseIcon from '@mui/icons-material/Close';
import decryptedvendorid from '../Utils/Vendorid';

const AddVendorProductImg = () => {
    const [value, setValue] = useState({
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        title: "",
        colorcode: "",
    })

    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [image3, setImage3] = useState()
    const [image4, setImage4] = useState()
    const [loader, setLoader] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    const [color_id, setId] = useState("")
    const [color, setColor] = useState([])
    const [productimg, setProductimg] = useState([])
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const { product_id, product_name } = useParams()
    const [error, setError] = useState({})
    const [error2, setError2] = useState({})

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!image1) {
            isValid = false;
            newErrors.image1 = "Upload 1 is required"
        }
        if (!image2) {
            isValid = false;
            newErrors.image2 = "Upload 2 is required"
        }
        if (!image3) {
            isValid = false;
            newErrors.image3 = "Upload 3 is required"
        }

        if (!color_id) {
            isValid = false
            newErrors.color_id = "color is required"
        }


        setError(newErrors)
        return isValid
    }


    const validateForm2 = () => {
        let isValid = true
        const newErrors2 = {}


        if (!value.title) {
            isValid = false;
            newErrors2.title = "title is require"
        }


        setError2(newErrors2)
        return isValid
    }


    async function getColorData() {
        axios.get(`${BASE_URL}/color_data`)
            .then((res) => {
                console.log(res.data)
                setColor(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function getProductimgData() {

        const data = {
            product_id: product_id
        }

        axios.post(`${BASE_URL}/product_img_data`, data)
            .then((res) => {
                console.log(res.data)
                setProductimg(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {
        getProductimgData()
        getColorData()
    }, [])


    const handleClick = (id) => {
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: true,
        }));
    };

    const handleCancel = (id) => {
        // Hide the confirmation dialog without performing the delete action
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleDelete = (id) => {

        setLoader(true)

        const data = {
            product_id: id
        }


        axios.post(`${BASE_URL}/product_img_delete`, data)
            .then((res) => {
                setLoader(false)
                getProductimgData()
            })

            .catch((err) => {
                console.log(err)
            })
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }




    async function ImageBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        const data = new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });

        return data;
    }

    const handleupload1 = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage1(file);
            const data = await ImageBase64(file);
            setValue((prev) => ({
                ...prev,
                image1: data,
            }));
        }
    };

    const handleupload2 = async (e) => {
        const file = e.target.files[0];
        setImage2(file)
        // setHide(true)

        const data = await ImageBase64(e.target.files[0]);
        setValue((prev) => {
            return {
                ...prev,
                image2: data,
            };
        });
    }

    const handleupload3 = async (e) => {
        const file = e.target.files[0];
        setImage3(file)
        // setHide(true)

        const data = await ImageBase64(e.target.files[0]);
        setValue((prev) => {
            return {
                ...prev,
                image3: data,
            };
        });
    }

    const handleupload4 = async (e) => {
        const file = e.target.files[0];
        setImage4(file)
        // setHide(true)

        const data = await ImageBase64(e.target.files[0]);
        setValue((prev) => {
            return {
                ...prev,
                image4: data,
            };
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            setLoader(true)
            const formdata = new FormData()
            formdata.append("image1", image1)
            formdata.append("image2", image2)
            formdata.append("image3", image3)
            formdata.append("image4", image4)
            formdata.append("color_id", color_id)
            formdata.append("product_id", product_id)
            formdata.append("user_id", decryptedvendorid())

            axios.post(`${BASE_URL}/add_product_img`, formdata)
                .then((res) => {
                    console.log(res)
                    alert(res.data)
                    setLoader(false)
                    getProductimgData()
                    window.location.reload()
                })
                .catch((err) =>{
                    console.log(err , "$$$")
                })
        }



    }

    const handleSubmit2 = (e) => {


        if (validateForm2()) {

            const data = {
                title: value.title,
                colorcode: value.colorcode,
                user_id: decryptedvendorid(),

            }


            axios.post(`${BASE_URL}/add_color`, data)
                .then((res) => {
                    alert(res.data)
                    getColorData()
                    setValue({
                        title:"",
                        colorcode :""
                    })

                })
                .catch((err) => {
                    console.log(err)
                })

        }

    }

    const HandleChange = (selectedValue) => {
        if (selectedValue) {
            console.log(selectedValue, "::::")
            const selectedId = selectedValue.id;
            setSelectedOption(selectedValue);
            // Now you have the selected id, you can use it in your application logic
            setId(selectedId)
        }
    };







    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }



    return (
        <div class="container-fluid page-body-wrapper position-relative col-lg-12" >
            {loader && <Loader />}
         <div class="main-panel">
                <div class="content-wrapper" style={{ height: "100vh" }}>
                    <CustomHeder />
                    <div className='py-3'>
                        <h5>Product Name: {product_name}</h5>
                    </div>
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <form onSubmit={handleSubmit} method='POST'>
                                <div class="card">
                                    <div class="card-body">

                                        <div class="card mt-3" id="media">
                                            <div class="card-head" style={{ padding: "20px 22px 0px" }}>
                                                <h5
                                                    style={{
                                                        color: "#000000DE",
                                                        fontSize: "20px",
                                                        margin: "0",
                                                    }}
                                                >
                                                    Media
                                                </h5>
                                                <p class="para">Manage your product's image gallery.</p>
                                            </div>

                                            <div class="card-body" style={{ padding: "20px 10px" }}>




                                                <div className='row'>

                                                    <div class="form-group col-lg-6">
                                                        <label>Img Upload 1<span className='text-danger'>*</span></label>

                                                        <input type="file" class="form-control file-upload-info" name='image1' accept="image/*" onChange={handleupload1} />
                                                        {error.image1 && <span className='text-danger'>{error.image1}</span>}
                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label>Img Upload 2<span className='text-danger'>*</span></label>

                                                        <input type="file" class="form-control file-upload-info" name='image2' accept="image/*" onChange={handleupload2} />
                                                        {error.image2 && <span className='text-danger'>{error.image2}</span>}
                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label>Img Upload 3<span className='text-danger'>*</span></label>

                                                        <input type="file" class="form-control file-upload-info" name='image3' accept="image/*" onChange={handleupload3} />
                                                        {error.image3 && <span className='text-danger'>{error.image3}</span>}
                                                    </div>
                                                    <div class="form-group col-lg-6">
                                                        <label>Video upload 4</label>

                                                        <input type="file" class="form-control file-upload-info" name='image4' accept="video/*" onChange={handleupload4} />

                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Colour<span className='text-danger'>*</span></label>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={color}
                                                            // value={setSelectedOption}
                                                            size='small'
                                                            getOptionLabel={(option) => option.title}
                                                            getOptionSelected={(option, value) => option.id === value.id}
                                                            sx={{ width: "100%", border: "none", borderRadius: "5px" }}
                                                            renderInput={(params) => <TextField label="Select Colour" {...params} />}
                                                            onChange={(event, value) => HandleChange(value)}
                                                            name="color"
                                                        />
                                                        {error.color_id && <span className='text-danger'>{error.color_id}</span>}
                                                    </div>
                                                    <div class="form-group col-lg-6 mt-4">


                                                        <button className='btn btn-primary mt-2 float-right' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Colour +</button>

                                                        <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                   
                                                                        <CloseIcon style={{width:"30px"}} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <form class="forms-sample py-3" >

                                                                            <div class="form-group">
                                                                                <label for="exampleInputUsername1">Title <span className='text-danger'>*</span></label>
                                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.title} placeholder="Title" name='title' onChange={onhandleChange} />
                                                                                {error2.title && <span className='text-danger'>{error2.title}</span>}
                                                                            </div>

                                                                            <div class="form-group ">
                                                                                <label for="exampleTextarea1">Color code <span className='text-danger'>*</span></label>                                    
                                                                                <input type="color" class="form-control" value={value.colorcode} name='colorcode' onChange={onhandleChange} />
                                                                            </div>

                                                                           <> 
                                                                             <button type="button" onClick={handleSubmit2} class="btn btn-primary mr-2" data-bs-dismiss="modal">Submit</button>

                                                                                {/* <button type='button' onClick={() => {
                                                                                    window.location.reload()
                                                                                }} class="btn btn-light">Cancel</button> */}
                                                                                </>
                                                                                
                                                                                

                                                                        </form>
                                                                    </div>
                                                                 
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className='row'>
                                                    <div className="col-lg-12 my-3">

                                                      <> <button type='submit' className="btn btn btn-primary mr-2">Add</button>
                                                            <button type='button' onClick={() => {
                                                                window.location.reload()
                                                            }} class="btn btn-light">Cancel</button></>

                                                    </div>
                                                </div>



                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-lg-3 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Image Preview</h4>
                                    <div className='row'>
                                        <div className='col-lg-6 py-2' >
                                            <img
                                                class=""
                                                data-bs-toggle="tooltip"
                                                data-placement="top"
                                                src={value.image1 == "" ? img1 : value.image1}

                                                title=""
                                                alt=""
                                                data-bs-original-title=""
                                            ></img>
                                        </div>
                                        <div className='col-lg-6 py-2'>
                                            <img
                                                class=""
                                                data-bs-toggle="tooltip"
                                                data-placement="top"
                                                src={value.image2 == "" ? img1 : value.image2}
                                                title=""
                                                alt=""
                                                data-bs-original-title=""
                                            ></img>
                                        </div>
                                        <div className='col-lg-6 py-2'>
                                            <img
                                                class=""
                                                data-bs-toggle="tooltip"
                                                data-placement="top"
                                                src={value.image3 == "" ? img1 : value.image3}
                                                title=""
                                                alt=""
                                                data-bs-original-title=""
                                            ></img>
                                        </div>
                                        <div className='col-lg-6 py-2'>
                                            <img
                                                class=""
                                                data-bs-toggle="tooltip"
                                                data-placement="top"
                                                src={value.image4 == "" ? img1 : value.image4}
                                                title=""
                                                alt=""
                                                data-bs-original-title=""
                                            ></img>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">List Of Images</h4>
                                    <div class="table-responsive pt-3">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th width="18%">Sr. No.</th>
                                                    <th width="60%">Image</th>
                                                    <th width="20%">Color</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {productimg.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{item.images[0] ? <img src={`${IMG_URL}/productimg/` + item.images[0]} alt='' /> : <></>}{item.images[1]? <img src={`${IMG_URL}/productimg/` + item.images[1]} alt='' /> : <></>}{item.images[2] ? <img src={`${IMG_URL}/productimg/` + item.images[2]} alt='' /> : <></>}{item.images[3] && <img src={`${IMG_URL}/productimg/` + item.images[3]} alt='' /> }</td>
                                                            <td>{item.title}</td>
                                                            <td>
                                                        <Link>
                                                                    <DeleteIcon style={{ color: "red" }} onClick={() => handleClick(item.id)} />
                                                                </Link>

                                                            </td>
                                                            {confirmationVisibleMap[item.id] && (
                                                                <div className='confirm-delete'>
                                                                    <p>Are you sure you want to delete?</p>
                                                                    <button onClick={() => handleDelete(item.id)} className='btn btn-sm btn-primary'>OK</button>
                                                                    <button onClick={() => handleCancel(item.id)} className='btn btn-sm btn-danger'>Cancel</button>
                                                                </div>
                                                            )}
                                                        </tr>
                                                    )
                                                })}



                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>





                    </div>
                </div>
            </div> 

        </div>
    )
}

export default AddVendorProductImg