import React, { useEffect, useState } from 'react'
import InnerHeader from './InnerHeader'
import { Autocomplete, Radio, TextField } from '@mui/material';
import { BASE_URL } from './BaseUrl';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getRoleData } from '../Store/Role/role-action';

function RoleAssignment() {

    const [selectedOption, setSelectedOption] = useState(null);
    const [role, setRoleData] = useState([])
    const [rolePages, setRolePages] = useState([])
    const [roleId, setRoleId] = useState(false)

    // Function to handle changes in the enable/disable state for an ID
    const handleRadioChange = (event, indexToUpdate) => {
        const newAccessid = +event.target.value;
        const updatedData = rolePages.map((item, index) => {
            if (index === indexToUpdate) {
                return { ...item, accessid: newAccessid };
            }
            return item;
        });
        setRolePages(updatedData);

        console.log(updatedData, "(((")
    };


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

    const HandleChange = (selectedValue) => {
        if (selectedValue) {
            setRoleId(true)
            const selectedId = selectedValue.id;
            setSelectedOption(selectedValue);
            // Now you have the selected id, you can use it in your application logic
            getRolePages(selectedId)
        } else {
            setRoleId(false)
            setSelectedOption(null);
        }
        setRolePages([])
    };

    async function getRolePages(rid) {
        axios.post(`${BASE_URL}/role_pages`, { role_id: rid })
            .then((res) => {
                // console.log(res.data, ">>>>>")
                setRolePages(res.data)


            
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handlesubmit = (e) => {
        e.preventDefault()

        console.log(rolePages, "(((")

        axios.post(`${BASE_URL}/assign_role`, rolePages)
            .then((res) => {
                if(res.data.insertId){
                    alert("Date Submitted")
                }
            })
    }

    const roledata = {
        role: Cookies.get(`role`),
        pageid: 5
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])



    return (

        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />

            {roleaccess > 1 ?      <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Select Role</h4>
                                    <form class="forms-sample pt-3" onSubmit={handlesubmit}>
                                        <div className='d-flex justify-content-between'>
                                            <div class="form-group col-lg-6">
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={role}
                                                    value={selectedOption}
                                                    getOptionLabel={(option) => option.title}
                                                    getOptionSelected={(option, value) => option.id === value.id}
                                                    sx={{ width: "100%", border: "none", borderRadius: "5px" }}
                                                    renderInput={(params) => <TextField {...params} label="select role" />}
                                                    onChange={(event, value) => HandleChange(value)}
                                                    name="category"
                                                />
                                            </div>
                                            <div>
                                                <button className='btn btn-primary'>Submit</button>
                                            </div>
                                        </div>

                                        {roleId === true && <div class="form-group" >

                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Role Rights
                                                        </th>
                                                        <th>
                                                            Block
                                                        </th>

                                                        <th>
                                                            View
                                                        </th>
                                                        <th>
                                                            Edit
                                                        </th>
                                                        <th>
                                                            Full
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {rolePages.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {item.pagename}
                                                                </td>
                                                                <td>
                                                                    <Radio
                                                                        checked={item.accessid === 1}
                                                                        onChange={(e) => handleRadioChange(e, index)}
                                                                        value={1}
                                                                        name={`radio-buttons-${item.pageid}`}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Radio
                                                                        checked={item.accessid === 2}
                                                                        onChange={(e) => handleRadioChange(e, index)}
                                                                        value={2}
                                                                        name={`radio-buttons-${item.pageid}`}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Radio
                                                                        checked={item.accessid === 3}
                                                                        onChange={(e) => handleRadioChange(e, index)}
                                                                        value={3}
                                                                        name={`radio-buttons-${item.pageid}`}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Radio
                                                                        checked={item.accessid === 4}
                                                                        onChange={(e) => handleRadioChange(e, index)}
                                                                        value={4}
                                                                        name={`radio-buttons-${item.pageid}`}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>:null}
       
        </div>
    )
}

export default RoleAssignment