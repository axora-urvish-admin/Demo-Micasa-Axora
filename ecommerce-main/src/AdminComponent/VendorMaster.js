import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from './BaseUrl'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

import { DataGrid } from '@mui/x-data-grid';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleData } from '../Store/Role/role-action';

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
const VendorMaster = () => {
    const [vendordata, setVendorData] = useState([])
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [hide, setHide] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');

    async function getVendordata() {
        axios.get(`${BASE_URL}/vendor_data`)
            .then((res) => {
          
                setVendorData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleConfirmation = (id) => {
        const userConfirmed = window.confirm('Are you sure you want to proceed?');

        if (userConfirmed) {
            // User clicked 'OK', proceed with the action
            console.log('Action confirmed!');

            const data = {
                vendor_id: id,
            }

            axios.post(`${BASE_URL}/vendor_approve`, data)
                .then((res) => {
                    // console.log(res)
                    getVendordata()
                })

            setHide(true)
        } else {
            setHide(false)
            // User clicked 'Cancel', do something else or nothing
            console.log('Action canceled.');
        }
    };

    const roledata = {
     role : Cookies.get(`role`),
     pageid : 2
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);

    console.log(roleaccess, ")))")

    useEffect(() => {
        getVendordata()
        dispatch(getRoleData(roledata))
    }, [])

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredVendorData = vendordata.filter(vendor => 
        vendor.vendor_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlestatus = (e, id) => {
        const value = e.target.value

        const data = {
            vendor_id: id,
            status: value
        }

        axios.post(`${BASE_URL}/vendor_status`, data)
            .then((res) => {
                console.log(res)
                getVendordata()
            })

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
        { field: 'vendor_name', headerName: 'Vendor Name', flex: 2 },
        {
            field: 'mobile',
            headerName: 'Contact',
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            flex: 2,
        },
        {
            field: 'emailid',
            headerName: 'Email',
            flex: 2
        },
        {
            field: 'address',
            headerName: 'address',
            flex: 3
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.address !== null && params.row.aggrement_upload !== "" && params.row.city !== null && params.row.emailid !== null && params.row.gst_upload !== "" && params.row.gstno !== null && params.row.mobile !== null && params.row.panupload !== "" && params.row.picode !== null && params.row.state !== null && params.row.username && params.row.username && params.row.vendor_pan ? <div>{params.row.approve == 0 ? <button className='btn btn-sm btn-success' onClick={() => handleConfirmation(params.row.id)}>Approve</button> : <>{params.row.active == 1 ? 
                        <FormControlLabel
                            control={<Android12Switch value="0"  onChange={(e) => handlestatus(e, params.row.id)} defaultChecked   disabled={roleaccess <= 2}/>}
                        /> : <FormControlLabel
                            control={<Android12Switch value="1" onChange={(e) => handlestatus(e, params.row.id)} disabled={roleaccess <= 2} />}
                        />} </>} </div> :
                            <FormControlLabel
                                control={<Android12Switch disabled />}
                            />}
                    </>
                )
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
             
                return (
                    <>
                        <Link to={`/webapp/vendorform/${params.row.id}`}><EditIcon /></Link>
                    </>
                )
            }
        },
    ];

    const rowsWithIds = filteredVendorData.map((row, index) => ({ index: index + 1, ...row }));

    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            {roleaccess > 1 ?   <div class="main-panel">
                <div class="content-wrapper">
                    <div class="">
                        <div class="grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Vendor </h4>
                                            <p class="card-description">
                                                List Of Vendor
                                            </p>
                                        </div>
                                        {roleaccess > 2 &&   <div>
                                            <Link to="/webapp/vendorform/:id"><button className=' btn btn-primary'>Add Vendor</button></Link>
                                        </div> }
                                      

                                    </div>
                                  
                                        <div className=''>
                                            <input 
                                                type="text" 
                                                placeholder="Search by Vendor Name" 
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                                className="form-control"
                                            />
                                            <DataGrid
                                                sx={{width:"100%"}}
                                                rows={rowsWithIds}
                                                columns={columns}
                                                getRowId={(row) => row.id}
                                                initialState={{
                                                    pagination: {
                                                      paginationModel: { pageSize: 10, page: 0 },
                                                    },
                                                  }}
                                            />
                                        </div>
                                   







                                    {/* <div class="table-responsive pt-3">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th>
                                                        Vendor Name
                                                    </th>
                                                    <th>
                                                        Contact
                                                    </th>
                                                    <th>
                                                        Email
                                                    </th>
                                                    <th>
                                                        Address
                                                    </th>
                                                    <th>
                                                        Status
                                                    </th>
                                                    <th>
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>


                                            <tbody>

                                                {vendordata.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>
                                                                {item.vendor_name}
                                                            </td>
                                                            <td>
                                                                {item.mobile}
                                                            </td>
                                                            <td>
                                                                {item.emailid}
                                                            </td>
                                                            <td>
                                                                {item.address}
                                                            </td>
                                                            <td>
                                                                {item.address !== null && item.aggrement_upload !== "" && item.city !== null && item.emailid !== null && item.gst_upload !== "" && item.gstno !== null && item.mobile !== null && item.panupload !== "" && item.picode !== null && item.state !== null && item.username && item.vendor_name && item.vendor_pan ? <div>{item.approve == 0 ? <button className='btn btn-sm btn-danger' onClick={() => handleConfirmation(item.id)}>Approve</button> : <>{item.active == 1 ? <FormControlLabel
                                                                    control={<Android12Switch value="0" onChange={(e) => handlestatus(e, item.id)} defaultChecked />}
                                                                /> : <FormControlLabel
                                                                    control={<Android12Switch value="1" onChange={(e) => handlestatus(e, item.id)} />}
                                                                />} </>} </div> :
                                                                    <FormControlLabel
                                                                        control={<Android12Switch disabled />}
                                                                    />}
                                                            </td>
                                                            <td>
                                                                <Link to={`/webapp/vendorform/${item.id}`}><EditIcon /></Link>
                                                                <DeleteIcon style={{ color: "red" }} onClick={() => handleClick(item.id)} />
                                                                <button className='btn btn-sm btn-danger' onClick={() => handleClick(item.id)}>Delete</button>
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
            </div>:<h1>No Access</h1>}
          
        </div>
    )
}

export default VendorMaster