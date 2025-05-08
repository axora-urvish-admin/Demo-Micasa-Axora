import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid } from '@mui/x-data-grid';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleData } from '../Store/Role/role-action';

// ✅ MUI imports for Search Bar
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const Color = () => {
    const [brand, setBrand] = useState([]);
    const [uid, setUid] = useState([]);
    const [cid, setCid] = useState("");
    const [error, setError] = useState({});
    const [searchQuery, setSearchQuery] = useState(""); // 🔍 Added for search functionality
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});

    const [value, setValue] = useState({
        title: "" || uid.title,
        colorcode: "" || uid.colorcode,
    });

    useEffect(() => {
        setValue({
            title: "" || uid.title,
            colorcode: "" || uid.colorcode,
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

    const handleUpdate = (id) => {
        axios.post(`${BASE_URL}/color_update`, { u_id: id })
            .then((res) => {
                setUid(res.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    async function getColorData() {
        axios.get(`${BASE_URL}/color_data`)
            .then((res) => {
                setBrand(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getColorData();
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
        const data = { cat_id: id };
        axios.post(`${BASE_URL}/color_delete`, data)
            .then(() => {
                getColorData();
            })
            .catch((err) => {
                console.log(err);
            });

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const data = {
                title: value.title,
                colorcode: value.colorcode,
                user_id: decryptedUserId(),
                uid: uid.id,
            };

            axios.post(`${BASE_URL}/add_color`, data)
                .then((res) => {
                    alert(res.data);
                    getColorData();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // 🔍 Filter rows based on search query
    const filteredBrand = brand.filter((item) => 
        (item.title || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    const rowsWithIds = filteredBrand.map((row, index) => ({ index: index + 1, ...row }));

    const roledata = {
        role: Cookies.get(`role`),
        pageid: 9,
    };

    const dispatch = useDispatch();
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

    useEffect(() => {
        dispatch(getRoleData(roledata));
    }, []);

    const columns = [
        {
            field: 'index',
            headerName: '#',
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
                    {roleaccess >= 2 && <EditIcon onClick={() => handleUpdate(params.row.id)} />}
                    {roleaccess > 3 && <DeleteIcon style={{ color: "red" }} onClick={() => handleClick(params.row.id)} />}
                </>
            ),
        },
    ];

    return (
        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            {roleaccess > 1 && (
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-lg-5 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Add Color</h4>
                                        <form className="forms-sample py-3" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>Title <span className='text-danger'>*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={value.title}
                                                    placeholder="Title"
                                                    name="title"
                                                    onChange={onhandleChange}
                                                />
                                                {error.title && <span className="text-danger">{error.title}</span>}
                                            </div>

                                            <div className="form-group">
                                                <label>Color code <span className='text-danger'>*</span></label>
                                                <input
                                                    type="color"
                                                    className="form-control"
                                                    value={value.colorcode}
                                                    name="colorcode"
                                                    onChange={onhandleChange}
                                                />
                                            </div>

                                            {roleaccess > 2 && (
                                                <>
                                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                                    <button type="button" onClick={() => window.location.reload()} className="btn btn-light">Cancel</button>
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
                                                <h4 className="card-title">Color</h4>
                                                <p className="card-description">List of Color</p>
                                            </div>
                                        </div>

                                        {/* 🔍 Search Bar */}
                                        <TextField
                                            fullWidth
                                            label="Search Color"
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
                                            <div className="confirm-delete mt-2">
                                                <p>Are you sure you want to delete?</p>
                                                <button onClick={() => handleDelete(cid)} className="btn btn-sm btn-primary">OK</button>
                                                <button onClick={() => handleCancel(cid)} className="btn btn-sm btn-danger">Cancel</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Color;
