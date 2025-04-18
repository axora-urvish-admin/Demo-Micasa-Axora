import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './BaseUrl'
import InnerHeader from './InnerHeader'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import decryptedUserId from '../Utils/UserID'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { getRoleData } from '../Store/Role/role-action'


function AddRole() {

    const [role, setRole] = useState([])
    const [error, setError] = useState({})
    const [uid, setUid] = useState([])
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [cid, setCid] = useState("")
    const [value, setValue] = useState({
        title: "" || uid.title,
        description: "" || uid.description,
    })

    useEffect(() => {
        setValue({
            title: uid.title,
            description: uid.description,
        })
    }, [uid])

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (!value.title) {
            isValid = false;
            newErrors.title = "title is require"
        }

        setError(newErrors)
        return isValid
    }

    async function getRole() {
        axios.get(`${BASE_URL}/role_data`)
            .then((res) => {
                setRole(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getRole()
    }, [])

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {

            const data = {
                title: value.title,
                description: value.description,
                user_id: decryptedUserId(),
                u_id: uid.id
            }

            axios.post(`${BASE_URL}/add_role`, data)
                .then((res) => {
                    alert(res.data)
                    getRole()
                    setValue({
                        title: "",
                        description: "",
                    });
                })
                .catch((err) => {
                    console.log(err)
                })
        }

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

    const handleUpdate = (id) => {
        axios.post(`${BASE_URL}/role_update`, { u_id: id })
            .then((res) => {
                setUid(res.data[0])
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const handleDelete = (id) => {
        const data = {
            role_id: id
        }

        axios.post(`${BASE_URL}/role_delete`, data)
            .then((res) => {
                getRole()

            })
            .catch((err) => {
                console.log(err)
            })

        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
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
                        {roleaccess >= 2 && <EditIcon style={{cursor :"pointer"}} onClick={() => handleUpdate(params.row.id)} />}
                        {roleaccess > 3 && <DeleteIcon style={{ color: "red",cursor :"pointer" }} onClick={() => handleClick(params.row.id)} />}
                    </>
                )
            }
        },
    ];
    const rowsWithIds = role.map((row, index) => ({ index: index + 1, ...row }));

    const roledata = {
        role: Cookies.get(`role`),
        pageid: 4
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])


    return (



        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />

            {roleaccess > 1 ? <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Role</h4>

                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Title<span className='text-danger'>*</span></label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={value.title} placeholder="Title" name='title' onChange={onhandleChange} />
                                            {error.title && <span className='text-danger'>{error.title}</span>}
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
                                            <h4 class="card-title">Roles </h4>
                                            <p class="card-description">
                                                List Of Role
                                            </p>
                                        </div>

                                    </div>
                                    <div>
                                        <DataGrid
                                            rows={rowsWithIds}
                                            columns={columns}
                                            getRowId={(row) => row.id}
                                        />

                                        {
                                            confirmationVisibleMap[cid] && (
                                                <div className='confirm-delete'>
                                                    <p>Are you sure you want to delete?</p>
                                                    <button
                                                        onClick={() => handleDelete(cid)}
                                                        className='btn btn-sm btn-primary'>OK</button>
                                                    <button
                                                        onClick={() => handleCancel(cid)}
                                                        className='btn btn-sm btn-danger'>Cancel</button>
                                                </div>
                                            )
                                        }
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

export default AddRole