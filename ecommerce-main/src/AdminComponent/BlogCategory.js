import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid } from '@mui/x-data-grid';
import Loader from './Loader';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleData } from '../Store/Role/role-action';

const BlogCategory = () => {
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [subcat, setsubCatData] = useState([])
    const [error, setError] = useState({})
 
    const [cid, setCid] = useState("")

    const [uid, setUid] = useState([])

    const [loader, setLoader] = useState(false)


    const [value, setValue] = useState({
        category: "" || uid.cat_id,
        title: "" || uid.title,
        slug: "" || uid.slug,
        description: "" || uid.description,

    })

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

        setError(newErrors)
        return isValid
    }



    useEffect(() => {
        console.log(uid, "???")
        setValue({
            category: "" || uid.cat_id,
            title: "" || uid.title,
            slug: "" || uid.slug,
            description: "" || uid.description,
        })
    }, [uid])

    async function getblogcat() {
        axios.get(`${BASE_URL}/blogcat_data`)
            .then((res) => {
                setsubCatData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getblogcat()
    }, [])



    const handleslugclick = () => {
        axios.post(`${BASE_URL}/check_slug`, { slug: value.title && value.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-') , table_name : "awt_group" })
            .then((res) => {
                setValue({
                    slug: res.data.newslug,
                    title : value.title
                })
            })


    }
 

    const handleUpdate = (id) => {
        setLoader(true)
        axios.post(`${BASE_URL}/blogcat_update`, { u_id: id })
            .then((res) => {
                setUid(res.data[0]);

                setsubCatData((prevSubcat) => 
                    prevSubcat.map((item) => 
                        item.id === id ? { ...item, ...res.data[0] } : item
                    )
                );

                getblogcat();
                setLoader(false);
               
            })
            .catch((err) => {
                console.log(err)
            })
    }


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

    const handleDelete = (id) => {
        const data = {
            cat_id: id
        }

        axios.post(`${BASE_URL}/blogcat_delete`, data)
            .then((res) => {
                getblogcat()

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
            setLoader(true)
            const data = {
                title: value.title,
                description: value.description,
                slug: value.slug,
                user_id: decryptedUserId(),
                u_id: uid.id
            }

            axios.post(`${BASE_URL}/add_blogcat`, data)
                .then((res) => {
                    alert(res.data)
                    getblogcat()
                    setValue({
                        category: "",
                        title: "",
                        slug: "",
                        description: "",
                    });
                    setLoader(false);
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
    const rowsWithIds = subcat.map((row, index) => ({ index: index + 1, ...row }));


    const roledata = {
        role: Cookies.get(`role`),
        pageid: 7
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            {loader && <Loader />}
            
            {roleaccess > 1 ?    <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Blog Category</h4>

                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                   
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Title<span className='text-danger'>*</span></label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.title} placeholder="Title" name='title' onChange={onhandleChange} />
                                            {error.title && <span className='text-danger'>{error.title}</span>}
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleInputUsername1"> Slug<span className='text-danger'>*</span></label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.slug} name='slug' onClick={handleslugclick} onChange={onhandleChange} placeholder="Enter.." />
                                            {error.slug && <span className='text-danger'>{error.slug}</span>}

                                        </div>


                                        <div class="form-group ">
                                            <label for="exampleTextarea1">Description</label>
                                            <textarea class="form-control" id="exampleTextarea1" rows="4" value={value.description} name='description' onChange={onhandleChange}></textarea>
                                        </div>
                                        {roleaccess > 2 && <>  <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                            <button type='button' onClick={() => {
                                                window.location.reload()
                                            }} class="btn btn-light">Cancel</button></>}

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Blog Category </h4>
                                            <p class="card-description">
                                                List Of Blog Category
                                            </p>
                                        </div>

                                    </div>

                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
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

                             
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null }
        
        </div>

    )
}

export default BlogCategory