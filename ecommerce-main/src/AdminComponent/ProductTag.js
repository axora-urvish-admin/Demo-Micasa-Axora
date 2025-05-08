import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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


// ... imports remain the same
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const ProductTag = () => {
    const [cat, setCatData] = useState([]);
    const [error, setError] = useState({});
    const [uid, setUid] = useState([]);
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [cid, setCid] = useState("");
    const [loader, setLoader] = useState(false);

    const [searchQuery, setSearchQuery] = useState(""); // 🔍 Added for search
    const [value, setValue] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        setValue({
            title: uid.title || "",
            description: uid.description || "",
        });
    }, [uid]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!value.title) {
            isValid = false;
            newErrors.title = "Title is required";
        }

        setError(newErrors);
        return isValid;
    };

    async function getcatData() {
        axios.get(`${BASE_URL}/producttag_data`)
            .then((res) => {
                setCatData(res.data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getcatData();
    }, []);

    const handleClick = (id) => {
        setCid(id);
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: true,
        }));
    };

    const handleCancel = (id) => {
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleDelete = (id) => {
        axios.post(`${BASE_URL}/producttag_delete`, { cat_id: id })
            .then(() => getcatData())
            .catch((err) => console.log(err));

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleUpdate = (id) => {
        setValue({ description: "" });
        setLoader(true);
        axios.post(`${BASE_URL}/producttag_update`, { u_id: id })
            .then((res) => {
                setUid(res.data[0]);
                setLoader(false);
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoader(true);

            const data = {
                title: value.title,
                description: value.description,
                user_id: decryptedUserId(),
                u_id: uid.id,
            };

            axios.post(`${BASE_URL}/add_producttag`, data)
                .then((res) => {
                    alert(res.data);
                    getcatData();
                    setLoader(false);
                    setValue({ title: "", description: "" });
                    setUid([]);
                })
                .catch((err) => console.log(err));
        }
    };

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // 🔍 Safe filtering with fallback
    const filteredCat = cat.filter(item =>
        (item.title || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const rowsWithIds = filteredCat.map((row, index) => ({ index: index + 1, ...row }));

    const roledata = {
        role: Cookies.get(`role`),
        pageid: 16,
    };

    const dispatch = useDispatch();
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

    useEffect(() => {
        dispatch(getRoleData(roledata));
    }, []);

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
            renderCell: (params) => (
                <>
                    {roleaccess >= 2 && <EditIcon sx={{ cursor: "pointer" }} onClick={() => handleUpdate(params.row.id)} />}
                    {roleaccess > 3 && <DeleteIcon style={{ color: "red" }} onClick={() => handleClick(params.row.id)} />}
                </>
            ),
        },
    ];

    return (
        <div className="container-fluid page-body-wrapper position-relative col-lg-10">
            <InnerHeader />
            {loader && <Loader />}
            {roleaccess > 1 ? (
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-lg-5 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Add Product Tag</h4>
                                        <form className="forms-sample py-3" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>Title <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" value={value.title} placeholder="Title" name='title' onChange={onhandleChange} />
                                                {error.title && <span className='text-danger'>{error.title}</span>}
                                            </div>

                                            <div className="form-group">
                                                <label>Description</label>
                                                <textarea className="form-control" rows="4" value={value.description} name='description' onChange={onhandleChange}></textarea>
                                            </div>

                                            {roleaccess > 2 && (
                                                <>
                                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                                    <button type='button' onClick={() => window.location.reload()} className="btn btn-light">Cancel</button>
                                                </>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-7 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h4 className="card-title">Product Tags</h4>
                                                <p className="card-description">List of Product Tags</p>
                                            </div>
                                        </div>

                                        {/* 🔍 Search Field */}
                                        <TextField
                                            fullWidth
                                            label="Search Product Tags"
                                            variant="outlined"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            sx={{ marginBottom: 2 }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />

                                        {/* Data Grid */}
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
                                            <div className='confirm-delete mt-2'>
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
            ) : <h1>No Access</h1>}
        </div>
    );
};

export default ProductTag;
