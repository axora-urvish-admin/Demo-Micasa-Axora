import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from './InnerHeader';
import decryptedUserId from '../Utils/UserID';
import { DataGrid } from '@mui/x-data-grid';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleData } from '../Store/Role/role-action';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const Tags = () => {

    const [tag, setTag] = useState([])
    const [tagdata, setTagData] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedTagsid, setSelectedId] = useState('')
    const [error, setError] = useState({})


    const {product_id} = useParams()

    const validateForm = () => {
        let isValid = true
        const newErrors = {}


        if (!selectedTagsid) {
            isValid = false;
            newErrors.title = "Tags are required"
        }


        setError(newErrors)
        return isValid
    }



    async function getTagData() {

        axios.get(`${BASE_URL}/gettagdata`)
            .then((res) => {
                console.log(res.data)
                setTag(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function getTag() {

        const data = {
            product_id : product_id
        }

        axios.post(`${BASE_URL}/getproducttag` , data)
            .then((res) => {
                console.log(res.data)
                const commaSeparatedData = res.data[0].Tags
                const dataArray = commaSeparatedData.split(',');
                console.log(dataArray)
                setTagData(dataArray)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getTag()
        getTagData()
    }, [])






    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {


            const data = {
                tags: selectedTagsid,
                product_id : product_id
            }


            axios.post(`${BASE_URL}/update_tag`, data)
                .then((res) => {
                    alert(res.data)
                    getTagData()

                })
                .catch((err) => {
                    console.log(err)
                })
        }


    }



    const handleChange = (event, newValue) => {
        setSelectedTags(newValue); // Update the selected tags in the state
        setSelectedId(newValue.map((option) => option.title).join(","))
      };


    const roledata = {
        role: Cookies.get(`role`),
        pageid: 9
    }

    const dispatch = useDispatch()
    const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);


    useEffect(() => {
        dispatch(getRoleData(roledata))
    }, [])

    return (

        <div class="container-fluid page-body-wrapper col-lg-12">
            <InnerHeader />
            {roleaccess > 1 ? <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Tags</h4>

                                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                                        <div class="form-group ">
                                            <Autocomplete
                                                multiple
                                                id="tags-standard"
                                                options={tag}
                                                value={selectedTags} // State containing selected options
                                                onChange={handleChange} // Handle selection change
                                                getOptionLabel={(option) => option.title}
                                                isOptionEqualToValue={(option, value) => option.title === value.title} // Ensures correct comparison
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        label="Multiple values"
                                                        placeholder="Favorites"
                                                    />
                                                )}
                                            />
                                            {error.title && <span className='text-danger'>{error.title}</span>}

                                        </div>



                                        {roleaccess > 2 && <>  <button type="submit" class="btn btn-primary mr-2">Update</button>
                                            <button type='button' onClick={() => {
                                                window.location.reload()
                                            }} class="btn btn-light">Cancel</button></>}

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Tags</h4>
                                    {tagdata.map((item) =>{
                                        return (
                                            
                                            <Chip className='mx-1' label={item}   />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null}

        </div>

    )
}

export default Tags

