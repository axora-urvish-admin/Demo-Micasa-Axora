import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRoleData } from '../Store/Role/role-action';
import decryptedUserId from '../Utils/UserID';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import Loader from './Loader';

const SeoForm = () => {


    const [errors, setErrors] = useState({})
    const [loader, setLoader] = useState(false)
    const [uid, setUid] = useState([])
    const [specification, setSpecification] = useState('')
    const [value, setValue] = useState({
        seotitle: "",
        seodescription: ""

    })

    const { seoid } = useParams()

    useEffect(() => {
        setValue({
            seotitle: uid.seo_title,
        })
    }, [uid])

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!value.seotitle) {
            isValid = false;
            newErrors.seotitle = "Title is required";
        }
        if (!specification) {
            isValid = false;
            newErrors.desc = "Description is required";
        }





        setErrors(newErrors);
        setTimeout(() => {
            setErrors("")
        }, 5000);
        return isValid;


    }



    async function handleUpdate() {
        setLoader(true)
        axios.post(`${BASE_URL}/seo_update`, { u_id: seoid })
            .then((res) => {
                setUid(res.data[0])
                setLoader(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }




    useEffect(() => {


        if (seoid !== ":seoid") {

            handleUpdate()
        }

    }, [])











    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            setLoader(true)

            const data = {
                seotitle: value.seotitle,
                seodescription: specification,
                u_id: uid.id,
                user_id: decryptedUserId(),

            }

            axios.post(`${BASE_URL}/add_seo`, data)
                .then((res) => {
                    alert(res.data)
                    setLoader(false)

                    window.location.pathname = '/webapp/seo'

                    setValue({
                        seotitle: "",
                    })

                    setUid([])
                    setSpecification('')

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
                                    <h4 class="card-title">Add Seo Pages</h4>

                                    <form class="forms-sample" onSubmit={handleSubmit}>

                                        <div className='row'>

                                            <div class="form-group col-lg-12">
                                                <label for="exampleInputUsername1">Seo Title</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Seo Title" value={value.seotitle} name='seotitle' onChange={onhandleChange} />
                                                {errors.seotitle && <div className="text-danger">{errors.seotitle}</div>}
                                            </div>
                                            <div class="form-group col-lg-12">
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    style={{height : "1000px"}}
                                                    data={uid.seo_desc}
                                                    onReady={(editor) => {
                                                        editor.editing.view.change((writer) => {
                                                            writer.setStyle("min-height", "400px", editor.editing.view.document.getRoot());
                                                        });
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setSpecification(data)
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        // console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        // console.log('Focus.', editor);
                                                    }}
                                                />
                                                        {errors.desc && <div className="text-danger">{errors.desc}</div>}
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

export default SeoForm;