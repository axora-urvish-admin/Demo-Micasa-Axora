import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BASE_URL, IMG_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from "./Loader";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


const Banner = () => {


    const [errors, setErrors] = useState({})
    const [image, setImage] = useState('')
    const [uid, setupdateDate] = useState([])
    const [banner, setBanner] = useState([])
    const [loader , setLoader] = useState(false)
    const [value, setValue] = useState({
        title: "" || uid.title,
        banner: "" || uid.banner,
        target: "" || uid.target,
        link: "" || uid.link,
        view: "" || uid.view,
        description: "" || uid.description,

    })
    const [searchQuery, setSearchQuery] = useState('');



    useEffect(() => {
        setValue({
            title: uid.title,
            banner: uid.banner,
            target: uid.target,
            link: uid.link,
            view: uid.view,
            description: uid.description,

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
            newErrors.banner = "Banner is required";
        }
        if (!value.link) {
            isValid = false;
            newErrors.link = "Link is required"
        }
        if (!value.target) {
            isValid = false;
            newErrors.target = "Target is required"
        }
        if (!value.view) {
            isValid = false;
            newErrors.view = "View is required"
        }



        setErrors(newErrors);
        setTimeout(() => {
            setErrors("")
        }, 5000);

        return isValid;


    }



    async function bannerdata() {
        axios.get(`${BASE_URL}/banner_data`)
            .then((res) => {
                console.log(res)
                setBanner(res.data)
            })
    }



    const handleUpdate = (id) => {
        setValue({
            description: ""
        })

        setLoader(true)

        const data = {
            bannerid: id
        }
        axios.post(`${BASE_URL}/banner_updateid`, data)
            .then((res) => {

                setupdateDate(res.data[0])
                setLoader(false)
            })


    }






    useEffect(() => {
        bannerdata()
    }, [])


    const handleClick = (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            setLoader(true);
            axios.delete(`${BASE_URL}/banner_delete/${id}`)
                .then((res) => {
                    alert("Banner deleted successfully");
                    bannerdata(); // Refresh the banner list
                    setLoader(false);
                })
                .catch((err) => {
                    console.error(err);
                    alert("Error deleting banner");
                    setLoader(false);
                });
        }
    };



    const handleSubmit = (e, viewid) => {
        e.preventDefault()


        if (validateForm()) {

            setLoader(true)

            const formdata = new FormData()
            formdata.append('title', value.title)
            
            if(image){
                formdata.append('image', image)
            }else{
                formdata.append('image', uid.upload_image)

            }
            formdata.append('link', value.link)
            formdata.append('target', value.target)
            formdata.append('viewid', value.view)
            formdata.append('uid', uid.id)
            formdata.append('description', value.description)



            axios.post(`${BASE_URL}/add_banner`, formdata)
                .then((res) => {
                    bannerdata()
                    setLoader(false)
                    alert("Data Submitted Successfully");

                    setValue({
                        title: "",
                        banner: "",
                        target: "",
                        link: "",
                        view: "",
                        description: "",
                    });
                    setupdateDate([])
                    setImage('');

                 
                })
                .catch((err) => {
                    console.log(err)
                    
                })

        }

    }


    const handleUpload = async (e) => {
        const file = e.target.files[0];
        setImage(file);

    };


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    var viewid = String(value.view);

    // Function to handle search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter banners based on search query
    const filteredBanners = banner.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (

        <div className="container-fluid page-body-wrapper col-lg-10" style={{position :"relative"}}>
            <InnerHeader />
            {loader &&  <Loader />}
            <div className="main-panel">

                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">


                                    <form onSubmit={(e) => handleSubmit(e, 1)}>
                                        <h4 className="card-title">Banner For Desktop</h4>
                                        <div className="form-group">
                                            <label htmlFor="title">Title<span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id="title" placeholder="Title" name='title' value={value.title} onChange={onhandleChange} />
                                            {errors.title && <div className="text-danger">{errors.title}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="ban_img">Banner Image<span className='text-danger'>*</span></label>
                                            <input type="file" className="form-control" id="ban_img" placeholder="" name='banner' value={value.banner} onChange={handleUpload}  />
                                            {errors.banner && <div className="text-danger">{errors.banner}</div>}
                                        </div>
                                        <div>
                                            <img style={{ width: "200px" }} src={`${IMG_URL}/banner/${uid.upload_image}`} alt="" />
                                        </div>
                                        <div className="form-group ">
                                            <label htmlFor="exampleFormControlSelect1">Target<span className='text-danger'>*</span></label>
                                            <select className="form-control form-control-lg" id="exampleFormControlSelect1" name='target' value={value.target} onChange={onhandleChange}>
                                                <option >Select</option>
                                                <option value="_blank">blank</option>
                                                <option value="_self">same</option>
                                            </select>
                                            {errors.target && <div className="text-danger">{errors.target}</div>}

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="link1">Link<span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id="link1" placeholder="Link" value={value.link} name='link' onChange={onhandleChange} />
                                            {errors.link && <div className="text-danger">{errors.link}</div>}
                                        </div>
                                        <div class="form-group ">
                                            <label for="exampleTextarea1">Description</label>
                                            <textarea class="form-control" id="exampleTextarea1" rows="4" value={value.description} name='description' onChange={onhandleChange}></textarea>
                                        </div>
                                        <div className="form-group">
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="view"
                                                onChange={onhandleChange}
                                                value={viewid}
                                                defaultValue={viewid}
                                            >
                                                <FormControlLabel value="1" control={<Radio />} label="Mobile View" />
                                                <FormControlLabel value="2" control={<Radio />} label="Desktop View" />

                                            </RadioGroup>
                                            {errors.view && <div className="text-danger">{errors.view}</div>}

                                        </div>
                                        <button type="submit" className="btn btn-sm btn-primary mr-2">Submit</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>
                                        {/* <Link to="/webapp/banner"><button className="btn btn-sm btn-light">Cancel</button></Link> */}
                                    </form>
                                </div>



                            </div>
                        </div>
                        <div className="col-lg-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 className="card-title"> List Of Gallery </h4>
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

                                    <div className="table-responsive pt-3">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th>
                                                        Title
                                                    </th>
                                                    <th>
                                                        Target
                                                    </th>
                                                    <th>
                                                        View
                                                    </th>

                                                    <th width="17%">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {filteredBanners.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>
                                                                {item.title}
                                                            </td>
                                                            <td>
                                                                {item.target}
                                                            </td>
                                                            <td>
                                                                {item.view == 2 ? "Desktop" : "Mobile"}
                                                            </td>

                                                            <td>
                                                                <EditIcon onClick={() => handleUpdate(item.id)} />
                                                                <DeleteIcon style={{ color: "red" }}  onClick={() => handleClick(item.id)} />
                                                                {/* <button className='btn btn-sm btn-danger' onClick={() => handleClick(item.id)}>Delete</button> */}
                                                            </td>

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

export default Banner;