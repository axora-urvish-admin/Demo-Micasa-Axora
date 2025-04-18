import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'js-md5';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, IMG_URL } from '../AdminComponent/BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import Cookies from 'js-cookie';
import { DataGrid } from '@mui/x-data-grid';
import CryptoJS from 'crypto-js';
import decryptedvendorid from '../Utils/Vendorid';

const VendorUser = () => {

    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [errors, setErrors] = useState({})
    const [cid, setCid] = useState("")
    const [admindata, setData] = useState([])
    const [uid, setUid] = useState([])
    const [value, setValue] = useState({
        firstname: "" || uid.firstname,
        lastname: "" || uid.lastname,
        email: "" || uid.email,
        mobile: "" || uid.mobile,
        password: "",
        cnf_password: "",
       
    })

    // useEffect(() => {
    //     setValue({
    //         firstname: uid.firstname,
    //         lastname: uid.lastname,
    //         email: uid.email,
    //         mobile: uid.mobile,
    //         password: "",
    //     })
    // }, [uid])

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!value.email) {
            isValid = false;
            newErrors.email = "Email is required";
        }
        if (!value.firstname) {
            isValid = false;
            newErrors.firstname = "FirstName is required"
        }
        if (!value.lastname) {
            isValid = false;
            newErrors.lastname = "LastName is required"
        }
        if (!value.password) {
            isValid = false;
            newErrors.password = "Password is required"
        }
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

        if (!passwordPattern.test(value.password)) {
            isValid = false;
            newErrors.password = "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol."
        }

        if (value.password !== value.cnf_password) {
            isValid = false;
            newErrors.cnf_password = "Password & Confirm Password dont match"

        }
        const mobileNumberRegex = /^\d{10}$/;
        if (!mobileNumberRegex.test(value.mobile)) {
            isValid = false;
            newErrors.mobile = "atleat 10 digit needed";
        }



        setErrors(newErrors);
        setTimeout(() => {
            setErrors("")
        }, 5000);
        return isValid;


    }


    const handleUpdate = (id) => {
        console.log(id, "id hai yeb ")
        axios.post(`${BASE_URL}/vendorUserUpdate`, { u_id: id })
            .then((res) => {
                console.log(res.data[0]);
                setUid(res.data[0])
                setValue({
                            firstname: res.data[0].firstname,
                            lastname: res.data[0].lastname,
                            email: res.data[0].email,
                            mobile: res.data[0].mobile,
                            password: "",
                        })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    async function getAdminuserData() {
        axios.get(`${BASE_URL}/getVendorData`)
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
            vendoruser_id: id
        }


        axios.post(`${BASE_URL}/vendorUserDelete`, data)
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
  


    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            const hashpassword = md5(value.password)

            const data = {
                firstname: value.firstname,
                lastname: value.lastname,
                email: value.email,
                mobile: value.mobile,
                password: hashpassword,
                u_id: uid.id,
                user_id: decryptedvendorid()

            }

            axios.post(`${BASE_URL}/addVendorUser`, data)
                .then((res) => {
                    alert(res.data)
                    getAdminuserData()
                    if (res.data) {
                        //    navigate('/vendormaster')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

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
                            <EditIcon onClick={() => handleUpdate(params.row.id)} />
                            <DeleteIcon style={{ color: "red" }} onClick={() => handleClick(params.row.id)} />
                        </div>
                     
                    </>
                )
            }
        },
    ];
    return (

        <div class="container-fluid page-body-wrapper">
            <InnerHeader />

            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Vendor User</h4>

                                    <form class="forms-sample" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Firstname</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" placeholder="FirstName" value={value.firstname} name='firstname' onChange={onhandleChange} />
                                            {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Lastname</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" placeholder="LastName" value={value.lastname} name="lastname" onChange={onhandleChange} />
                                            {errors.lastname && <div className="text-danger">{errors.lastname}</div>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Mobile No</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter No" value={value.mobile} name="mobile" onChange={onhandleChange} />
                                            {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Email address</label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" value={value.email} name="email" onChange={onhandleChange} />
                                            {errors.email && <div className="text-danger">{errors.email}</div>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Password</label>
                                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name='password' onChange={onhandleChange} />
                                            {errors.password && <div className="text-danger">{errors.password}</div>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputConfirmPassword1">Confirm Password</label>
                                            <input type="text" class="form-control" id="exampleInputConfirmPassword1" name='cnf_password' placeholder="Password" onChange={onhandleChange} />
                                            {errors.cnf_password && <div className="text-danger">{errors.cnf_password}</div>}
                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                        <button type='button' onClick={() => {
                                            window.location.reload()
                                        }} class="btn btn-light">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Vendor User </h4>
                                            <p class="card-description">
                                                List Of Vendor User
                                            </p>
                                        </div>

                                    </div>

                                    <div class="table-responsive pt-3">
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
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
            </div>
        </div>

    )
}

export default VendorUser