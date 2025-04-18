import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL, IMG_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { param } from 'jquery';
import Loader from './Loader';
import { Hidden } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleData } from '../Store/Role/role-action';
import Switch from '@mui/material/Switch';
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";



const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&::after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

const CategoryBreadcrum = () => {

    const [cat, setCatData] = useState([])
    const [group, setGroupData] = useState([])
    const [error, setError] = useState({})
    const [selectedOption, setSelectedOption] = useState(null);
    const [image, setImage] = useState()
    const [uid, setUid] = useState([])
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [cid, setCid] = useState("")
    const [loader, setLoader] = useState(false)
    const [group_id, setId] = useState("")
    const [products, setProducts] = useState([]);
    const [value, setValue] = useState({
        title: "" || uid.title,
        slug: "" || uid.slug,
    })

    useEffect(() => {
        if (uid) {
            setValue({
                title: uid.title || "",
                description: uid.description || "",
                slug: uid.slug || "",
            });
        }
    }, [uid]);

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!value.title) {
            isValid = false;
            newErrors.title = "title is required"
        }

        // if (!value.slug) {
        //     isValid = false
        //     newErrors.slug = "slug is required"
        // }
        if (uid.image == undefined && !image) {
            isValid = false;
            newErrors.logo = "image is required";
        }
        // if (!selectedOption) {
        //     isValid = false;
        //     newErrors.group = "group is required"
        // }

        setError(newErrors)
        return isValid
    }

    async function getcatData() {
        axios.get(`${BASE_URL}/category_data`)
            .then((res) => {
                console.log(res.data)
                setCatData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    

    useEffect(() => {
        getcatData()
    }, [])


    const handleUpload = async (e) => {
        const file = e.target.files[0]
        setImage(file)
    }



    const handleUpdate = (id) => {
        setValue({
            description: ""
        })
        setLoader(true)
        axios.post(`${BASE_URL}/category_update`, { u_id: id })
            .then((res) => {
                setUid(res.data[0])
                setLoader(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    console.log(uid)



    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {

            const formdata = new FormData();

            setLoader(true)
            formdata.append('title', value.title)
            formdata.append('slug', value.slug)
            if(image){

                formdata.append('image', image)
            }else{
                formdata.append('image', uid.image)

            }
            formdata.append('group_id', group_id)
            formdata.append('u_id', uid.id)

            axios.post(`${BASE_URL}/Category_breadcrumb_update`, formdata)
                .then((res) => {
                    console.log(res.data)
                    getcatData()
                    setLoader(false)

                    setValue({
                        title: "" ,
                        slug: "" ,
                    })

                    setImage(null)
                    setUid([])
                    setSelectedOption(null)

                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const columns = [
        {
            field: 'index',
            headerName: 'ID',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 1,
            filterable: false,
        },
        { field: 'title', headerName: 'Title', flex: 2 },
        {
            field: 'image', headerName: 'image', flex: 2, renderCell: (param) => {
                return (
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", display: "flex", overflow: "hidden", alignItems: "center", justifyContent: "center" }}>

<img
              src={`${IMG_URL}/Breadcrumbs/${param.row.breadcrumb}`}
              alt="image"
            />
                    </div>
                )
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        {roleaccess >= 2 && <EditIcon sx={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />}
                    </>
                )
            }
        },
    ];
    const rowsWithIds = cat.map((row, index) => ({ index: index + 1, ...row }));

    
    const handleslugclick = () => {


        axios.post(`${BASE_URL}/check_slug`, { slug: value.title && value.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-') , table_name : "awt_category" })
        .then((res) => {
            setValue({
                slug: res.data.newslug,
                title : value.title
            })
        })


    }


    const roledata = {
        role: Cookies.get(`role`),
        pageid: 6
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])

    return (

        <div class="container-fluid page-body-wrapper position-relative col-lg-10" >
            <InnerHeader />
            {loader && <Loader />}
            {roleaccess > 1 ? <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Category Breadcrum</h4>

                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Title</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.title} placeholder="Title" name='title' disabled/>
                                            {error.title && <span className='text-danger'>{error.title}</span>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Image<span className='text-danger'>*</span></label>
                                            <input type="file" class="form-control" id="exampleInputUsername1" onChange={handleUpload} name="image" placeholder="Enter.." />
                                            {error.logo && <span className='text-danger'>{error.logo}</span>}

                                        </div>
                                        <div>
                                            <img style={{ width: "200px" }} src={`${IMG_URL}/Breadcrumbs/${uid.breadcrumb}`} alt="image" />
                                        </div>
                                        {roleaccess > 2 && <><button type="submit" class="btn btn-primary mr-2">Submit</button>
                                            <button type='button' onClick={() => {
                                                window.location.reload()
                                            }} class="btn btn-light">Cancel</button> </>}

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Category Breadcrum </h4>
                                            <p class="card-description">
                                                List Of Category Breadcrum
                                            </p>
                                        </div>

                                    </div>
                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            disableColumnFilter
                                            disableColumnSelector
                                            disableDensitySelector
                                            getRowId={(row) => row.id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 10, page: 0 },
                                                },
                                            }}
                                            // slots={{ toolbar: GridToolbar }}
                                            // slotProps={{
                                            //     toolbar: {
                                            //         showQuickFilter: true,
                                            //     },
                                            // }}
                                        />
                                    </div>

                                    {/* <div class="table-responsive pt-3">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th>
                                                        Title
                                                    </th>

                                                    <th>
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {cat.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>
                                                                {item.title}
                                                            </td>

                                                            <td>
                                                                <EditIcon onClick={() => handleUpdate(item.id)} />
                                                                <DeleteIcon style={{ color: "red" }} onClick={() => handleClick(item.id)} />
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
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null}

        </div>

    )
}

export default CategoryBreadcrum