import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Autocomplete, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from '@mui/material/Switch';
import { styled } from "@mui/material/styles";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleData } from '../Store/Role/role-action';
import decryptedUserId from '../Utils/UserID';
import { BASE_URL, IMG_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { InputAdornment } from '@mui/material';
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

const Collection = () => {

    const [cat, setCatData] = useState([])
    const [group, setGroupData] = useState([])
    const [error, setError] = useState({})
    const [selectedOption, setSelectedOption] = useState(null);
    const [image, setImage] = useState('')
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



    // async function getcatData() {
    //     axios.get(`${BASE_URL}/collection_data`)
    //         .then((res) => {
    //             console.log(res.data)
    //             setCatData(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    async function getcatwebsData() {
        axios.get(`${BASE_URL}/collection_data_web`)
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
        // getcatData()
        getcatwebsData()
    }, [])


    const handleToggle = (id, currentStatus) => {
        console.log("dddd",currentStatus);
        
        const newStatus = currentStatus ? 1 : 0;
        
        // console.log("Toggling ID:", id, "New Status:", newStatus);
        axios.post(`${BASE_URL}/toggle_collection`, { toggle_id: id, status: newStatus })
            .then(() => {
                // Update local state to reflect the change
                setCatData(prev => prev.map(item => 
                    item.id === id ? { ...item, Moving_Collection: newStatus } : item
                ));

                alert("Status Changed")

                getcatwebsData()
            })
            .catch(err => {
                console.error("Error toggling category status:", err);
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
        console.log(file);
    }


    const handleDelete = (id) => {
        const data = {
            cat_id: id
        }

        axios.post(`${BASE_URL}/collection_delete`, data)
            .then((res) => {
                getcatwebsData()

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
        axios.post(`${BASE_URL}/collection_update`, { u_id: id })
            .then((res) => {
                setUid(res.data[0])
                setLoader(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }



// console.log(value.title, "rrr")

const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
        const formdata = new FormData();

        setLoader(true);
        formdata.append('title', value.title);
        formdata.append('description', value.description)
        formdata.append('slug', value.slug)
        if (image) {
            formdata.append('image', image);
        } else {
            formdata.append('image', uid.image);
        }
        console.log([...formdata]);
        formdata.append('group_id', group_id)
        formdata.append('u_id', uid.id);
        formdata.append('user_id', decryptedUserId())

        axios.post(`${BASE_URL}/add_collection`, formdata)
            .then((res) => {
                alert(res.data.message); 
                getcatwebsData();
                setLoader(false);
                setValue({
                    title: "",
                    slug: "" ,
                    description: "" ,
                });
                setImage('');
                setUid([]);
                setSelectedOption(null)
            })
            .catch((err) => {
                console.log(err);
            });
    }
};


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))

        if (value.slug) {
            axios.post(`${BASE_URL}/check_againslug`, { slug: value.slug })
                .then((res) => {
                    console.log(res)
                })
        }

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

                        <img src={`${IMG_URL}/Collection/${param.row.image}`} alt='image' />
                    </div>
                )
            }
        },
        {
            field: 'Moving_Collection',
            headerName: 'Moving Collection',
            flex: 1,
            renderCell: (params) => (
                <FormControlLabel
                    control={
                        <Android12Switch
                            checked={params.row.moving_collection === 1}
                            onChange={(e) =>{handleToggle(params.row.id, e.target.checked)}}
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
            // console.log(selected,"^^^^")

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
        pageid: 16
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])

    // Function to handle search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter collections based on search query
    const filteredCollections = cat.filter(collection =>
        collection.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (

        <div class="container-fluid page-body-wrapper position-relative col-lg-10" >
            <InnerHeader />
            {loader && <Loader />}
            {roleaccess > 1 ? <div class="main-panel">
                <div class="content-wrapper">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h4 className="card-title">Collections</h4>
                            <p className="card-description">List of Collections</p>
                        </div>
                        <div>
                            <TextField
                                label="Search Collection"
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
                            {roleaccess > 3 && (
                                <Link to="/webapp/collection/add">
                                    <button className="btn btn-primary">
                                        Add Collection
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-5 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Add Collection</h4>

                                    <form className="forms-sample py-3" onSubmit={handleSubmit}>
                                    <div className="form-group">
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
                                        <div className="form-group">
                                            <label for="exampleInputUsername1">Title<span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" id="exampleInputUsername1" value={value.title} placeholder="Title" name='title' onChange={onhandleChange} />
                                            {error.title && <span className='text-danger'>{error.title}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputUsername1">Category Slug<span className='text-danger'>*</span></label>
                                            <input type="text" onClick={handleslugclick} className="form-control" id="exampleInputUsername1" placeholder="Enter.." name='slug' value={value.slug} onChange={onhandleChange} />
                                            {error.slug && <span className='text-danger'>{error.slug}</span>}

                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputUsername1">Image<span className='text-danger'>*</span></label>
                                            <input type="file" className="form-control" id="exampleInputUsername1" onChange={handleUpload} name="image" value={value.logo} placeholder="Enter.." />
                                            {error.logo && <span className='text-danger'>{error.logo}</span>}

                                        </div>
                                        <div>
                                            <img style={{ width: "200px" }} src={`${IMG_URL}/Collection/${uid.image}`} alt="" />
                                        </div>
                                        <div className="form-group ">
                                            <label for="exampleTextarea1">Description</label>
                                            <textarea className="form-control" id="exampleTextarea1" rows="4" value={value.description} name='description' onChange={onhandleChange}></textarea>

                                        </div>
                                        {roleaccess > 2 && <>  <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                            <button type='button' onClick={() => {
                                                window.location.reload()
                                            }} className="btn btn-light">Cancel</button></>}

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 className="card-title">Collection</h4>
                                            <p className="card-description">
                                                List Of Collection
                                            </p>
                                        </div>

                                    </div>
                                    <div>
                                        <DataGrid
                                            rows={filteredCollections}
                                            columns={columns}
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

                                        {confirmationVisibleMap[cid] && (
                                            <div className='confirm-delete'>
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={() => handleDelete(cid)} className='btn btn-sm btn-primary'>OK</button>
                                                <button onClick={() => handleCancel(cid)} className='btn btn-sm btn-danger'>Cancel</button>
                                            </div>
                                        )}
                                    </div>


                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div> : <h1>No Access</h1>}

        </div>

    )
}

export default Collection