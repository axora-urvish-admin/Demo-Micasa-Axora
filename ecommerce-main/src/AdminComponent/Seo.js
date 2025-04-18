import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRoleData } from '../Store/Role/role-action';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';

const Seo = () => {

    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [loader, setLoader] = useState(false)
    const [cid, setCid] = useState("")
    const [seodata, setData] = useState([])


    async function getseoData() {
        axios.get(`${BASE_URL}/seo_data`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getseoData()
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
            seo_id: id
        }


        axios.post(`${BASE_URL}/seo_delete`, data)
            .then((res) => {
                getseoData()

            })

            .catch((err) => {
                console.log(err)
            })
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }





    // const rows = seodata.map((item, index) => {
    //     return (
    //         {
    //             index: index + 1,
    //             seo_title: item.seo_title,
    //             seo_desc: item.seo_desc,
             
    //         })

    // });

    const rows = seodata.map((row, index) => ({ index: index + 1, ...row }));
    const columns = [
        {
            field: 'id',
            headerName: 'id',
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            flex: 1,

        },
        { field: 'seo_title', headerName: 'Seo Title', flex: 1 },
        {
            field: 'seo_desc',
            headerName: 'Description',
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
                            {roleaccess >= 2 && <Link to={`/webapp/seo/${params.row.id}`}> <EditIcon sx={{ cursor: "pointer" }}  /></Link>}


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
                                            <h4 class="card-title">Seo Pages</h4>
                                            <p class="card-description">
                                                List Of Seo Pages
                                            </p>
                                        </div>
                                        <div>
                                            <Link to="/webapp/seo/:seoid"><button className='btn btn-success'>Add Pages +</button></Link>
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

export default Seo;