import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL, IMG_URL } from '../AdminComponent/BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';


function VendorSettingPages() {

    const [values, setValues] = useState({
        password : '',
        cnf_password : '',
    })

    const [errors, setErrors] = useState({
        general : '',
        password : '',
        cnf_password : '',
    })

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if(values.password === '' && values.cnf_password === ''){
            newErrors.general = 'Both the fields are required.';
            valid = false;
        }
        if(values.password === ''){
            newErrors.password = 'Password cannot be empty';
            valid = false;
        }else if (values.password!== "" && values.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
            valid = false;
        } else {
            newErrors.password = '';
        }

        if (values.cnf_password !== values.password) {
            newErrors.cnf_password = 'Confirm password should be same as Password.';
            valid = false;
        } else {
            newErrors.cnf_password = '';
        }

        setErrors(newErrors);
        setTimeout(() => {
            setErrors({
                general: '',
                password: '',
                cnf_password: '',
            });
        }, 5000);
        return valid;
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleSubmit=async (event)=> {
        event.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            console.log("Form submitted with values: ", values);
            try {
                const response = await fetch(`${BASE_URL}/vendor/changepassword`, {
                    method: 'POST', // Specify the HTTP method as POST
                    headers: {
                        'Content-Type': 'application/json' // Set the content type to JSON
                    },
                    body: JSON.stringify({ // Convert the object to a JSON string
                        password: values.password,
                        cnf_password: values.cnf_password,
                        vendor_id : '1'
                    })
                });
    
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error occurred:', error);
            }
        }
        console.log(values)
    }
    return (
        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        {/* <div class="col-lg-6 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div>
                                        <div>
                                            <h4 class="card-title">GST </h4>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue=""
                                                name="radio-buttons-group"
                                                row
                                            >
                                                <FormControlLabel value="0" control={<Radio size="small" />} label="Add on" />
                                                <FormControlLabel value="1" control={<Radio size="small" />} label="reverse" />
                                            </RadioGroup>
                                            <div>
                                                <hr />
                                                <h4 class="card-title">COD Settings </h4>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue=""
                                                    name="radio-buttons-group"
                                                    row
                                                >
                                                    <FormControlLabel value="0" control={<Radio size="small" />} label="Enable" />
                                                    <FormControlLabel value="1" control={<Radio size="small" />} label="disable" />
                                                </RadioGroup>
                                            </div>

                                         

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className='col-lg-6' grid-margin stretch-card>
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Change Password</h4>
                                    <div className='row'>
                                        <div class=" col-lg-6">
                                            <p>Password</p>
                                            <input type="text" class="form-control" placeholder="Enter Password" name='password' value={values.password} onChange={handleChange} />
                                            {errors.general && <small className="text-danger">{errors.general}</small>}
                                            {!errors.general && errors.password && <p className="text-danger">{errors.password}</p>}
                                        </div>
                                        <div class="col-lg-6">
                                            <p>Confirm Password</p>
                                            <input type="text" class="form-control" placeholder="Confirm Your Password" name='cnf_password' value={values.cnf_password} onChange={handleChange}/>
                                            {!errors.general && errors.cnf_password && <p className="text-danger">{errors.cnf_password}</p>}
                                        </div>
                                        <div className='col-lg-12 py-3'>
                                            <button type='submit' onClick={handleSubmit} className='btn btn-primary'>Submit</button>
                                        </div>
                                    </div>
                                </div></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorSettingPages