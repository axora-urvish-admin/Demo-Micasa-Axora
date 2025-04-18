import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from './BaseUrl'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';


function SettingPages() {
    return (
        <div class="container-fluid page-body-wrapper col-lg-10" >
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-6 grid-margin stretch-card">
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
                                                {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
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
                                                    {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                                                </RadioGroup>
                                            </div>

                                         

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6' grid-margin stretch-card>
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Change Password</h4>
                                    <div className='row'>
                                        <div class=" col-lg-6">
                                            <p>Password</p>
                                            <input type="text" class="form-control" placeholder="Enter Password" name='password' />
                                        </div>
                                        <div class="col-lg-6">
                                            <p>Confirm Password</p>
                                            <input type="text" class="form-control" placeholder="Confirm Your Password" name='cnf_password' />
                                        </div>
                                        <div className='col-lg-12 py-3'>
                                            <button type='submit' className='btn btn-primary'>Submit</button>
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

export default SettingPages