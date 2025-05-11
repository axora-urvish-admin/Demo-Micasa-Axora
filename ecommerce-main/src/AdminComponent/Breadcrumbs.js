import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import decryptedUserId from '../Utils/UserID';
import { BASE_URL, IMG_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const Breadcrumbs = () => {
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [errors, setErrors] = useState({})
    const [image, setImage] = useState()
    const [uid, setUpdateData] = useState([])
    const [Breadcrumbs, setBreadcrumbs] = useState([])
    const [value, setValue] = useState({
        title: "" || uid.title,
        image: '' || uid.upload_image,


    })
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setValue({
            title: uid.title
        })
    }, [uid])

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!value.title) {
            isValid = false;
            newErrors.title = "Title is required";
        }
        if (uid.upload_image == undefined && !image) {
            isValid = false;
            newErrors.image = "Breadcrumbs is required";
        }




        setErrors(newErrors);
        setTimeout(() => {
            setErrors("")
        }, 5000);
        return isValid;


    }



    async function getBreadcrumbsData() {
        axios.get(`${BASE_URL}/Breadcrumbs_data`)
            .then((res) => {

                setBreadcrumbs(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getBreadcrumbsData()
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

    const handleupdateId = (id) => {
        const data = {
            Breadcrumbs_id: id
        }
        axios.post(`${BASE_URL}/Breadcrumbs_update_data`, data)
            .then((res) => {
                console.log(res)
                setUpdateData(res.data[0])
            })
    }

    const handleDelete = (id) => {


        const data = {
            Breadcrumbs_id: id
        }
        axios.post(`${BASE_URL}/Breadcrumbs_delete`, data)
            .then((res) => {
                getBreadcrumbsData()
            })

            .catch((err) => {
                console.log(err)
            })
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {


            const formdata = new FormData()

            formdata.append("title", value.title)

            formdata.append('image', image)
            if(image){

            }else{
                formdata.append('image', uid.upload_image)

            }

            formdata.append('u_id', uid.id)
            formdata.append('user_id', decryptedUserId())

            axios.post(`${BASE_URL}/add_Breadcrumbs`, formdata)
                .then((res) => {
                    alert(res.data)
                    getBreadcrumbsData()
                    if (res.data) {
                        //    navigate('/vendormaster')
                        setValue({
                            title: ""
                        })

                        setUpdateData([])
                        setImage(null)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleUpload = async (e) => {
        const file = e.target.files[0];
        setImage(file);

    };

    // Function to handle search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter breadcrumbs based on search query
    const filteredBreadcrumbs = Breadcrumbs.filter(breadcrumb =>
        breadcrumb.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Breadcrumbs Image</h4>

                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="brand">Title</label>
                                            <input type="text" class="form-control" id="image" placeholder="Enter title" value={value.title} name='title' onChange={onhandleChange} disabled />
                                            {errors.title && <div className="text-danger">{errors.title}</div>}
                                        </div>
                                        <div class="form-group">
                                            <label for="image">Image</label>
                                            <input type="file" class="form-control" id="image" placeholder="" name='image' onChange={handleUpload} />
                                            {errors.image && <div className="text-danger">{errors.image}</div>}
                                        </div>
                                        <div>
                                            <img style={{ width: "200px" }} src={`${IMG_URL}/Breadcrumbs/${uid.upload_image}`} alt="" />
                                        </div>
                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title"> List Of Breadcrumbs </h4>
                                        </div>
                                        <div>
                                            <TextField
                                                label="Search by Title"
                                                variant="outlined"
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                                sx={{ width: '300px', marginRight: '10px' }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div class="table-responsive pt-3">
                                        <table class="table table-bordered">
                                            <thead>

                                                <tr>
                                                    <th width="10%">
                                                        #
                                                    </th>
                                                    <th width="30%">
                                                        Title
                                                    </th>

                                                    <th width="50%">
                                                        Image
                                                    </th>
                                                    <th width="10%">
                                                        Edit
                                                    </th>
                                                </tr>


                                            </thead>
                                            <tbody>

                                                {
                                                    filteredBreadcrumbs.map((item, index) => {
                                                        return (
                                                            <tr >
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    {item.title}
                                                                </td>
                                                                <td>
                                                                    <img style={{width:"100%",borderRadius:"0px",height:"auto"}} src={`${IMG_URL}/Breadcrumbs/${ item.upload_image}`} alt="Breadcrumbs Image" />
                                                                </td>
                                                                <td className="text-center">
                                                                    <Link><EditIcon  onClick={() =>handleupdateId(item.id)}/></Link>
                                                                    {/* <DeleteIcon style={{ color: "red" }} onClick={() => handleClick(item.id)} /> */}

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
                                                    })
                                                }

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
export default Breadcrumbs