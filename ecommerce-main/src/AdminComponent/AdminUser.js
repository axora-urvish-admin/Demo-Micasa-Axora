import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'js-md5';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import Cookies from 'js-cookie';
import { DataGrid } from '@mui/x-data-grid';
import CryptoJS from 'crypto-js';
import decryptedUserId from '../Utils/UserID';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleData } from '../Store/Role/role-action';
const AdminUser = () => {

    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [loader, setLoader] = useState(false)
    const [cid, setCid] = useState("")
    const [role, setRoleData] = useState([])
    const [admindata, setData] = useState([])


    async function getAdminuserData() {
        axios.get(`${BASE_URL}/adminuser_data`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAdminuserData()
    }, [])


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
            adminuser_id: id
        }


        axios.post(`${BASE_URL}/adminuser_delete`, data)
            .then((res) => {
                getAdminuserData()

            })

            .catch((err) => {
                console.log(err)
            })
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }


    async function getRole() {
        axios.get(`${BASE_URL}/role_data`)
            .then((res) => {
                setRoleData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getRole()
    }, [])



    const rows = admindata.map((item, index) => {
        return (
            {
                index: index + 1,
                id: item.id,
                username: item.firstname,
                email: item.email
            })

    });

    const columns = [
        {
            field: 'index',
            headerName: 'ID',
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            flex: 1,

        },
        { field: 'username', headerName: 'Name', flex: 1 },
        {
            field: 'email',
            headerName: 'Email',
            flex: 3
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <div>
                            {roleaccess >= 2 && <Link to={`/webapp/adminuser/${params.row.id}`}> <EditIcon sx={{ cursor: "pointer" }}  /></Link>}


                            {roleaccess > 3 && <DeleteIcon sx={{ cursor: "pointer" }} style={{ color: "red" }} onClick={() => handleClick(params.row.id)} />}

                        </div>


                    </>
                )
            }
        },
    ];


    const roledata = {
        role: Cookies.get(`role`),
        pageid: 3
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

            {roleaccess > 1 ? <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">


                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Admin User </h4>
                                            <p class="card-description">
                                                List Of Admin User
                                            </p>
                                        </div>
                                        <div>
                                            <Link to="/webapp/adminuser/:userid"><button className='btn btn-success'>Add User +</button></Link>
                                        </div>

                                    </div>

                                    <div class="table-responsive pt-3">
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
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
            </div> : <h1>No Access</h1>}

        </div>

    )
}

export default AdminUser