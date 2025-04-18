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

const Adminuserform = () => {
  const navigate = useNavigate();
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [errors, setErrors] = useState({})
    const [loader, setLoader] = useState(false)
    const [cid, setCid] = useState("")
    const [state , setState] = useState([])
    const [role, setRoleData] = useState([])
    const [admindata, setData] = useState([])
    const [uid, setUid] = useState([])

    const [value, setValue] = useState({
        firstname: "" || uid.firstname,
        lastname: "" || uid.lastname,
        email: "" || uid.email,
        mobile: "" || uid.mobile,
        password: "",
        cnf_password: "",
        role: "",
        address: "",
        city : '',
        state :"",
        pincode : ''

    })

    const { userid } = useParams()

    useEffect(() => {
        setValue({
            firstname: uid.firstname,
            lastname: uid.lastname,
            email: uid.email,
            mobile: uid.mobile,
            password: "",
            role: uid.role,
            address: uid.address,
            city : uid.city,
            state :uid.state,
            pincode : uid.pincode
        })
    }, [uid])

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!value.email) {
            isValid = false;
            newErrors.email = "Email is required";
        }
        if (!value.role) {
            isValid = false;
            newErrors.role = "Role is required";
        }
        if (!value.firstname) {
            isValid = false;
            newErrors.firstname = "FirstName is required"
        }
        if (!value.lastname) {
            isValid = false;
            newErrors.lastname = "Lastname is required"
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


    async function handleUpdate() {
        setLoader(true)
        axios.post(`${BASE_URL}/adminuser_update`, { u_id: userid })
            .then((res) => {
                setUid(res.data[0])
                setLoader(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }


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
    async function getState() {
        axios.get(`${BASE_URL}/state`)
            .then((res) => {
                setState(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAdminuserData()

        if (userid !== ":userid") {

            handleUpdate()
        }

        getState()
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



    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            setLoader(true)
            const hashpassword = md5(value.password)

            const data = {
                firstname: value.firstname,
                lastname: value.lastname,
                email: value.email,
                mobile: value.mobile,
                password: hashpassword,
                u_id: uid.id,
                user_id: decryptedUserId(),
                role: value.role,
                address: value.address,
                city : value.city,
                state :value.state,
                pincode : value.pincode

            }

            axios.post(`${BASE_URL}/add_adminuser`, data)
                .then((res) => {
                    alert(res.data)
                    setLoader(false)
                    getAdminuserData()
                    // window.location.pathname = '/webapp/adminuser'

                    setValue({
                        firstname: "",
                        lastname: "",
                        email: "",
                        mobile: "",
                        password: "",
                        cnf_password: "",
                        role: "",
                        address: "",
                        city: "",
                        state: "",
                        pincode: ""
                    });
               
                    setUid({});
                    // setUid([])
                    navigate("/webapp/adminuser");

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }




    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }





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
                                    <h4 class="card-title">Add Admin User</h4>

                                    <form class="forms-sample" onSubmit={handleSubmit}>

                                        <div className='row'>

                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">Role</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.role} onChange={onhandleChange} name='role'>
                                                    <option selected>Select Role</option>
                                                    {role.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.title}</option>
                                                        )
                                                    })}

                                                </select>
                                                {errors.role && <div className="text-danger">{errors.role}</div>}
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Firstname</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="FirstName" value={value.firstname} name='firstname' onChange={onhandleChange} />
                                                {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Lastname</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="LastName" value={value.lastname} name="lastname" onChange={onhandleChange} />
                                                {errors.lastname && <div className="text-danger">{errors.lastname}</div>}
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputUsername1">Mobile No</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter No" value={value.mobile} name="mobile" onChange={onhandleChange} />
                                                {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputEmail1">Email address</label>
                                                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" value={value.email} name="email" onChange={onhandleChange} />
                                                {errors.email && <div className="text-danger">{errors.email}</div>}
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputPassword1">Password</label>
                                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name='password' onChange={onhandleChange} />
                                                {errors.password && <div className="text-danger">{errors.password}</div>}
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputConfirmPassword1">Confirm Password</label>
                                                <input type="password" class="form-control" id="exampleInputConfirmPassword1" name='cnf_password' placeholder="Password" onChange={onhandleChange} />
                                                {errors.cnf_password && <div className="text-danger">{errors.cnf_password}</div>}
                                            </div>


                                        </div>

                                        <hr />

                                        <div className='row'>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputEmail1">Address</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Address" value={value.address} name="address" onChange={onhandleChange} />
                                                {errors.address && <div className="text-danger">{errors.address}</div>}
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputEmail1">City</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1" placeholder="City" value={value.city} name="city" onChange={onhandleChange} />
                                                {errors.city && <div className="text-danger">{errors.city}</div>}
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleFormControlSelect1">State</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.state} onChange={onhandleChange} name='state'>
                                                    <option selected>Select State</option>
                                                    {state.map((item) => {
                                                        return (
                                                            <option value={item.id}>{item.name}</option>
                                                        )
                                                    })}

                                                </select>
                                                {errors.State && <div className="text-danger">{errors.state}</div>}
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="exampleInputEmail1">Pincode</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Pincode" value={value.pincode} name="pincode" onChange={onhandleChange} />
                                                {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
                                            </div>


                                        </div>

                                        {roleaccess > 2 && <> <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                            <button type='button' onClick={() => {
                                                window.location.reload()
                                            }} class="btn btn-light">Cancel</button></>}


                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div> : <h1>No Access</h1>}

        </div>

    )
}

export default Adminuserform