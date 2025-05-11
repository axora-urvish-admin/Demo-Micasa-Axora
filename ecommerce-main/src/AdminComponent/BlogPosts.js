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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const BlogPosts = () => {

    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [subcat, setsubCatData] = useState([])
    const [error, setError] = useState({})
    const [cat, setCatData] = useState([])
    const [cid, setCid] = useState("")
    const [selectedOption, setSelectedOption] = useState(null);
    const [uid, setUid] = useState([])
    const [specification, setSpecification] = useState('')
    const [loader, setLoader] = useState(false)
    const [blogcat_id, setId] = useState("")
    const [value, setValue] = useState({
        category: "" || uid.blogcat_id,
        title: "" || uid.title,
        slug: "" || uid.slug,
        description: "" || uid.description,

    })
    const [searchQuery, setSearchQuery] = useState('');

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!selectedOption) {
            isValid = false;
            newErrors.category = "category is required"
        }
        if (!value.title) {
            isValid = false;
            newErrors.title = "title is required"
        }
        // if (!specification) {
        //     isValid = false;
        //     newErrors.description = "description is required"
        // }



        setError(newErrors)
        return isValid
    }



    useEffect(() => {
        console.log(uid, "???")
        setValue({
            category: "" || uid.blogcat_id,
            title: "" || uid.title,
            slug: "" || uid.slug,
            description: "" || uid.description,
        })
    }, [uid])

    async function getcatData() {
        axios.get(`${BASE_URL}/blogcategory_data`)
            .then((res) => {
                setCatData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getcatData()
    }, [])



    async function getsubcatData() {
        axios.get(`${BASE_URL}/blog_data`)
            .then((res) => {
                setsubCatData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getsubcatData()
    }, [])

    const handleUpdate = (id) => {
        setLoader(true)
        axios.post(`${BASE_URL}/blog_update`, { u_id: id })
            .then((res) => {
                setUid(res.data[0])
                setLoader(false)
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
            blogcat_id: id
        }

        axios.post(`${BASE_URL}/blog_delete`, data)
            .then((res) => {
                getsubcatData()

            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }

    
    const handleslugclick = () => {


        axios.post(`${BASE_URL}/check_slug`, { slug: value.title && value.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-') , table_name : "awt_group" })
            .then((res) => {
                setValue({
                    slug: res.data.newslug,
                    title : value.title
                })
            })


    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            setLoader(true)
            const data = {
                title: value.title,
                description: specification,
                slug: value.slug,
                user_id: decryptedUserId(),
                blogcat_id: value.category,
                u_id: uid.id
            }

            axios.post(`${BASE_URL}/add_blog`, data)
                .then((res) => {
                    alert(res.data)
                    getsubcatData()
                    setLoader(false)

                    setValue({
                        category: "",
                        title: "",
                        slug: "",
                        description: "",
                    });
                    setSpecification('');
                    setSelectedOption(null);

                })
                .catch((err) => {
                    console.log(err)
                })
        }


    }




    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const HandleChange = (selectedValue) => {
        if (selectedValue) {
            console.log(selectedValue, "::::")
            const selectedId = selectedValue.id;
            setSelectedOption(selectedValue);
            // Now you have the selected id, you can use it in your application logic
            setId(selectedId)
            setValue(prevValue => ({
                ...prevValue,               // Copy the existing value object
                category: selectedId      // Update only the category property
            }));

        }
    };

    useEffect(() => {
        // If you have received the ID from the API, find the option that matches the ID
        if (uid.blogcat_id) {
            console.log(cat, "111")
            const selected = cat.find(option => option.id === uid.blogcat_id);
            console.log(selected, "dadad")
            setSelectedOption(selected);
        }
    }, [uid, cat]);

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

    // Function to handle search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter blog posts based on search query
    const filteredSubCat = subcat.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            {loader && <Loader />}
            {roleaccess > 1 ? <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Blog</h4>

                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Blog Category<span className='text-danger'>*</span></label>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={cat}
                                                size='small'
                                                value={selectedOption}
                                                getOptionLabel={(option) => option.title}
                                                getOptionSelected={(option, value) => option.id === value.id}
                                                sx={{ width: "100%", border: "none", borderRadius: "5px" }}
                                                renderInput={(params) => <TextField {...params} />}
                                                onChange={(event, value) => HandleChange(value)}
                                                name="category"

                                            />
                                            {error.category && <span className='text-danger'>{error.category}</span>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Title<span className='text-danger'>*</span></label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.title} placeholder="Title" name='title' onChange={onhandleChange} />
                                            {error.title && <span className='text-danger'>{error.title}</span>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Blog Slug<span className='text-danger'>*</span></label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.slug} name='slug' onClick={handleslugclick} onChange={onhandleChange} placeholder="Enter.." />
                                            {error.slug && <span className='text-danger'>{error.slug}</span>}

                                        </div>


                                        <div class="form-group ">
                                            <div style={{ width: "100%" }} >
                                                <label for="exampleInputUsername1">Description</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={uid.description}
                                                    onReady={editor => {
                                                        // Allows you to store the editor instance and use it later.
                                                        // console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setSpecification(data)
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        // console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        // console.log('Focus.', editor);
                                                    }}
                                                />
                                            </div>
                                            {/* <span className='text-danger'>{error.description}</span> */}
                                        </div>
                                        {roleaccess > 2 && <>   <button type="submit" class="btn btn-primary mr-2">Submit</button>
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
                                            <h4 class="card-title">Blogs </h4>
                                            <p class="card-description">
                                                List Of Blogs
                                            </p>
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

                                    <div>
                                        <DataGrid
                                            rows={filteredSubCat.map((row, index) => ({ index: index + 1, ...row }))}
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

                                                {subcat.map((item, index) => {
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
                                                                <button className='btn btn-sm btn-danger' >Delete</button>
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

export default BlogPosts