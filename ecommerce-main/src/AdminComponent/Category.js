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
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';



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

const Category = () => {

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
        description: "" || uid.description,
    })

    const [searchQuery, setSearchQuery] = useState('');

    // useEffect(() => {
    //     setValue({
    //         title: uid.title,
    //         description: uid.description,
    //         slug: uid.slug,
    //     })
    // }, [uid])
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

        if (!value.slug) {
            isValid = false
            newErrors.slug = "slug is required"
        }
        if (uid.image == undefined && !image) {
            isValid = false;
            newErrors.logo = "image is required";
        }
        if (!selectedOption) {
            isValid = false;
            newErrors.group = "group is required"
        }

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
    async function getcatwebData() {
        axios.get(`${BASE_URL}/category_data_weblog`)
            .then((res) => {
                console.log(res.data)
                setCatData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    async function getgroupData() {
        axios.get(`${BASE_URL}/group_data`)
            .then((res) => {
                console.log(res.data)
                setGroupData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getgroupData()
        getcatData()
        getcatwebData()
    }, [])





    const handleToggle = (id, currentStatus) => {
        const newStatus = currentStatus === 1 ? 0 : 1;
        console.log("Toggling ID:", id, "New Status:", newStatus);
        axios.post(`${BASE_URL}/toggle_category`, { toggle_id: id, status: newStatus })
            .then(() => {
                // Update local state to reflect the change
                setCatData(prev => prev.map(item => 
                    item.id === id ? { ...item, Moving_Category: newStatus } : item
                ));

                alert("Status Changed")

                getcatData()
            })
            .catch(err => {
                console.error("Error toggling category status:", err);
            });
    };

    const handleToggleActive = (id, currentStatus) => {
        const newStatus = currentStatus === 1 ? 0 : 1;
        console.log("Toggling Active Status ID:", id, "New Status:", newStatus);
        axios.post(`${BASE_URL}/toggle_active`, { toggle_id: id, status: newStatus })
            .then(() => {
                // Update local state to reflect the change
                setCatData(prev => prev.map(item => 
                    item.id === id ? { ...item, active: newStatus } : item
                ));
            })
            .catch(err => {
                console.error("Error toggling Active status:", err);
            });
    };

    const handleClick = (id) => {
        setCid(id)
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


    const handleUpload = async (e) => {
        const file = e.target.files[0]
        setImage(file)
    }


    const handleDelete = (id) => {
        const data = {
            cat_id: id
        }

        axios.post(`${BASE_URL}/category_delete`, data)
            .then((res) => {
                getcatData()

            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
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

            // const data = {
            //     title: value.title,
            //     description: value.description,
            //     slug: value.slug,
            //     user_id: decryptedUserId(),
            //     u_id: uid.id,
            //     image :
            // }

            const formdata = new FormData();

            setLoader(true)
            formdata.append('title', value.title)
            formdata.append('description', value.description)
            formdata.append('slug', value.slug)
            if(image){

                formdata.append('image', image)
            }else{
                formdata.append('image', uid.image)

            }
            formdata.append('group_id', group_id)
            formdata.append('user_id', decryptedUserId())
            formdata.append('u_id', uid.id)

            axios.post(`${BASE_URL}/add_category`, formdata)
                .then((res) => {
                    console.log(res.data)
                    getcatData()
                    setLoader(false)
                    // window.location.pathname = '/webapp/category'

                    setValue({
                        title: "" ,
                        slug: "" ,
                        description: "" ,
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

                        <img src={`${IMG_URL}/category/${param.row.image}`} alt='' />
                    </div>
                )
            }
        },
        
        // {
        //     field: 'Moving_Category',
        //     headerName: 'Moving Category',
        //     flex: 1,
        //     renderCell: (params) => (
        //         <FormControlLabel
        //             control={
        //                 <Android12Switch
        //                     checked={params.row.moving_category === 1}
        //                     onChange={() => handleToggle(params.row.id, params.row.moving_category)}
        //                 />
        //             }
        //             label=""
        //         />
        //     ),
        // },
        {
            field: 'active',
            headerName: 'Active',
            flex: 1,
            renderCell: (params) => (
                <FormControlLabel
                    control={
                        <Android12Switch
                            checked={params.row.active === 1}
                            onChange={() => handleToggleActive(params.row.id, params.row.active)}
                        />
                    }
                    label=""
                />
            ),
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
                        {roleaccess > 3 && <DeleteIcon style={{ color: "red" }} onClick={() => handleClick(params.row.id)} />}
                    </>
                )
            }
        },
    ];
    const rowsWithIds = cat.map((row, index) => ({ index: index + 1, ...row }));

    const HandleChange = (selectedValue) => {
        if (selectedValue) {
            console.log(selectedValue, "::::")
            const selectedId = selectedValue.id;
            setSelectedOption(selectedValue);
            // Now you have the selected id, you can use it in your application logic
            setId(selectedId)

            console.log(selectedId,"ID")
        }
    };

    useEffect(() => {
        // If you have received the ID from the API, find the option that matches the ID
        if (uid.group_id) {

            const selected = group.find(option => option.id === uid.group_id);
          
            setSelectedOption(selected);
            console.log(selected,"^^^^")

            setId(selected.id)
        }
    }, [uid, group]);

    
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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredCategoryData = cat.filter(category => 
        category.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                                    <h4 class="card-title">Add Category</h4>

                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                    <div class="form-group">
                                            <label for="exampleInputUsername1">Group<span className='text-danger'>*</span></label>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                size='small'
                                                options={group}
                                                value={selectedOption}
                                                getOptionLabel={(option) => option.title}
                                                getOptionSelected={(option, value) => option.id === value.id}
                                                sx={{ width: "100%", border: "none", borderRadius: "5px" }}
                                                renderInput={(params) => <TextField {...params} />}
                                                onChange={(event, value) => HandleChange(value)}
                                                name="category"

                                            />
                                            {error.group && <span className='text-danger'>{error.group}</span>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Title<span className='text-danger'>*</span></label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.title} placeholder="Title" name='title' onChange={onhandleChange} />
                                            {error.title && <span className='text-danger'>{error.title}</span>}
                                        </div>
                                      
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Category Slug<span className='text-danger'>*</span></label>
                                            <input type="text" onClick={handleslugclick} class="form-control" id="exampleInputUsername1" placeholder="Enter.." name='slug' value={value.slug} onChange={onhandleChange} />
                                            {error.slug && <span className='text-danger'>{error.slug}</span>}

                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Image<span className='text-danger'>*</span></label>
                                            <input type="file" class="form-control" id="exampleInputUsername1" onChange={handleUpload} name="image" placeholder="Enter.." />
                                            {error.logo && <span className='text-danger'>{error.logo}</span>}

                                        </div>
                                        <div>
                                            <img style={{ width: "200px" }} src={`${IMG_URL}/category/${uid.image}`} alt="" />
                                        </div>
                                        <div class="form-group ">
                                            <label for="exampleTextarea1">Description</label>
                                            <textarea class="form-control" id="exampleTextarea1" rows="4" value={value.description} name='description' onChange={onhandleChange}></textarea>

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
                                            <h4 class="card-title">Category </h4>
                                            <p class="card-description">
                                                List Of Category
                                            </p>
                                        </div>

                                    </div>
                                    <div>
                                        <TextField
                                            fullWidth
                                            label="Search Category"
                                            variant="outlined"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            sx={{ marginBottom: 2 }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />

                                        <DataGrid
                                            sx={{width:"100%"}}
                                            rows={filteredCategoryData.map((row, index) => ({ index: index + 1, ...row }))}
                                            columns={columns}
                                            getRowId={(row) => row.id}
                                            initialState={{
                                                pagination: {
                                                  paginationModel: { pageSize: 10, page: 0 },
                                                },
                                            }}
                                        />

                                        {confirmationVisibleMap[cid] && (
                                            <div className='confirm-delete'>
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={() => handleDelete(cid)} className='btn btn-sm btn-primary'>OK</button>
                                                <button onClick={() => handleCancel(cid)} className='btn btn-sm btn-danger'>Cancel</button>
                                            </div>
                                        )}
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

export default Category