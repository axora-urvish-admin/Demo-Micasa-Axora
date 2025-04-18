import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../AdminComponent/BaseUrl';
import ProfileSidebar from '../../Subcomponents/ProfileSidebar';
import custdecryptedUserId from '../../../Utils/CustUserid';
import Spinner from '../../Ui/Spinner';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
    const [uid, setUid] = useState([]);
    const [errors, setErrors] = useState({});
    const [spinner, setSpinner] = useState(false);
    const [value, setValue] = useState({
        email: "",
        firstname: "",
        lastname: "",
        gender: "",
        mobile: "",
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!value.firstname) {
            isValid = false;
            newErrors.firstname = "First name is required";
        }
        if (!value.lastname) {
            isValid = false;
            newErrors.lastname = "Last name is required";
        }
        if (!value.mobile) {
            isValid = false;
            newErrors.mobile = "Mobile number is required";
        }

        setErrors(newErrors);
        return isValid;
    };

    const notify = () => toast("Profile updated successfully..");

    async function getProfileData() {
        const data = {
            user_id: custdecryptedUserId(),
        };

     axios.post(`${BASE_URL}/getprofiledata`, data)
    .then((res) => {
        console.log(res.data);
        if (res.data && res.data.length > 0) {
            setUid(res.data[0]);
            setValue({
                email: res.data[0].email,
                firstname: res.data[0].firstname,
                lastname: res.data[0].lastname,
                gender: res.data[0].gender,
                mobile: res.data[0].mobile,
            });
        } else {
            console.error("No user data found");
        }
    })
    .catch((error) => {
        console.error("Error fetching profile data:", error);
    });
    }

    useEffect(() => {
        getProfileData();
    }, []);

    const onHandleChange = (e) => {
        setValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setSpinner(true);
            const data = {
                firstname: value.firstname,
                lastname: value.lastname,
                mobile: value.mobile,
                gender: value.gender,
                user_id: custdecryptedUserId(),
            };

            axios.post(`${BASE_URL}/updateprofiledetails`, data)
                .then((res) => {
                    console.log(res);
                    setSpinner(false);
                    notify();
                });
        }
    };

    const genderValue = String(value.gender);

    return (
        <div className='row p-5' style={{marginTop:"5rem"}}>
            {spinner && <Spinner />}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className='col-lg-4 col-md-4 col-12'>
                <button
                    className='btn d-md-none' 
                    onClick={() => setSidebarOpen(!sidebarOpen)} 
                    style={{ marginBottom: "1rem",backgroundColor:"#000000", color:"#ffffff" }}>
                    {sidebarOpen ? 'Hide Menu' : 'Show Menu'}
                </button>
               
                <div style={{ display: (sidebarOpen || window.innerWidth > 768) ? 'block' : 'none', transition: 'all 0.3s ease-in-out',}}>
                    <ProfileSidebar />
                </div>
            </div>

            <div className='col-lg-8 col-md-4 col-12'>
                <div className='row'>
                    <div className='p-3'>
                        <h2>UPDATE YOUR PROFILE BELOW :</h2>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className="mb-3 col-lg-6">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" placeholder="Enter first name" name="firstname" value={value.firstname} onChange={onHandleChange} />
                            {errors.firstname && <span className='text-danger'>{errors.firstname}</span>}
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" placeholder="Enter Last name" name="lastname" value={value.lastname} onChange={onHandleChange} />
                            {errors.lastname && <span className='text-danger'>{errors.lastname}</span>}
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={value.email} placeholder="Enter email" name="email" onChange={onHandleChange} disabled />
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label className="form-label">Mobile</label>
                            <input type="number" className="form-control" placeholder="Enter mobile" name="mobile" onChange={onHandleChange} value={value.mobile} />
                            {errors.mobile && <span className='text-danger'>{errors.mobile}</span>}
                        </div>
                        <div className='px-3'>
                            <FormControl>
                                <label className="form-label">Gender</label>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    onChange={onHandleChange}
                                    name="gender"
                                    value={genderValue}
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="Male" />
                                    <FormControlLabel value="0" control={<Radio />} label="Female" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    <button type='submit' className='button button-outline' style={{ float: "right" }}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
