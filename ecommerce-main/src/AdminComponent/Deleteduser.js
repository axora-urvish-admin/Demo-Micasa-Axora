import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleData } from '../Store/Role/role-action';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';

const Deleteduser = () => {

    const [loader, setLoader] = useState(false)
    const [role, setRoleData] = useState([])
    const [admindata, setData] = useState([])



    async function getAdminuserData() {
        axios.get(`${BASE_URL}/deleteduser`)
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




    const rows = admindata.map((row, index) => ({ index: index + 1, ...row }));

    const columns = [
        {
            field: 'index',
            headerName: 'ID',
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            flex: 1,

        },
        { field: 'firstname', headerName: 'Firstname', flex: 2 },
        { field: 'lastname', headerName: 'Lastname', flex: 2 },
        {
            field: 'email',
            headerName: 'Email',
            flex: 4
        },
        {
            field: 'deleted_date',
            headerName: 'Deleted Date',
            flex: 4
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
                                            <h4 class="card-title">Deleted User </h4>
                                            <p class="card-description">
                                                List Of Deleted User
                                            </p>
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

export default Deleteduser