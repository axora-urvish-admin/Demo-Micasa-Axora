import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CustomHeder from './CustomHeder';
import axios from 'axios';
import { BASE_URL } from './BaseUrl';
import md5 from 'js-md5'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getRoleData } from '../Store/Role/role-action';
import decryptedUserId from '../Utils/UserID';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




const VendorForm = () => {
    const [open, setOpen] = React.useState(false);
    const [vendor, setVendor] = useState({})
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [loader , setLoader] = useState(false)
    const [state , setState] = useState([])
    const [errors, setErrors] = useState({
        email: "",
        mobile: "",
        // Add more fields as needed
    });

    const handleDownload = () => {
        // Replace 'path/to/your/file.pdf' with the actual path to your PDF file
        const pdfPath = 'path/to/your/file.pdf';

        // Creating a virtual link element
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = 'downloaded_file.pdf';

        // Triggering the click event to start the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    const [value, setValue] = useState({
        vendor_name: "" || vendor.vendor_name,
        email: "" || vendor.emailid,
        mobile: "" || vendor.mobile,
        username: "" || vendor.username,
        password: "",
        address: "" || vendor.address,
        state: "" || vendor.state,
        city: "" || vendor.city,
        pincode: "" || vendor.pincode,
        personemail: "" || vendor.person_email,
        personmobile: "" || vendor.person_mobile,
        personname: "" || vendor.person_name,
        gst: "" || vendor.gst_upload,
        pancard: "" || vendor.vendor_pan,
        // gstupload: "",
        // panupload: "",
        // agreementupload: "",
        account_name: "" || vendor.Account_name,
        account_no: "" || vendor.Account_no,
        ifsc_code: "" || vendor.ifsc,

    })


    useEffect(() => {
        setValue({
            vendor_name: vendor.vendor_name,
            email: vendor.emailid,
            mobile: vendor.mobile,
            username: vendor.username,
            password: vendor.password,
            address: vendor.address,
            state: vendor.state,
            city: vendor.city,
            pincode: vendor.pincode,
            personemail: vendor.person_email,
            personmobile: vendor.person_mobile,
            personname: vendor.person_name,
            pancard: vendor.vendor_pan,
            gst: vendor.gstno,
            account_name: vendor.Account_name,
            account_no: vendor.Account_no,
            ifsc_code: vendor.ifsc,
        })

    }, [vendor])

    const { id } = useParams()




    async function formdata() {

        const data = {
            u_id: id
        }

        axios.post(`${BASE_URL}/vendor_update`, data)
            .then((res) => {

                setVendor(res.data[0])


            })

    }

    useEffect(() => {
        if (id !== ":id") {

            formdata()
        }
    }, [id])

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!value.vendor_name) {
            isValid = false;
            newErrors.vendor_name = "Name is required";
        }
        // Validate email
        if (!value.email) {
            isValid = false;
            newErrors.email = "email is required";
        }

        // Validate mobile number
        const mobileNumberRegex = /^\d{10}$/;
        if (!mobileNumberRegex.test(value.mobile)) {
            isValid = false;
            newErrors.mobile = "atleat 10 digit needed";
        }
        if (!value.username) {
            isValid = false;
            newErrors.username = "username is required";
        }
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;


        if (!value.password && !passwordPattern.test(value.password)) {
            if(vendor.id == undefined){
                isValid = false;
                
            }
            else {
                isValid = true;
            }
            newErrors.password = "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol."
        }





        // if (!value.address) {
        //     isValid = false;
        //     newErrors.address = "address is required";
        // }
        // if (!value.state) {
        //     isValid = false;
        //     newErrors.state = "state is required";
        // }
        // if (!value.city) {
        //     isValid = false;
        //     newErrors.city = "city is required";
        // }
        // if (!value.pincode) {
        //     isValid = false;
        //     newErrors.pincode = "pincode is required";
        // }
        // if (!value.personname) {
        //     isValid = false;
        //     newErrors.personname = "personname is required";
        // }
        // if (!value.personemail) {
        //     isValid = false;
        //     newErrors.personemail = "personemail is required";
        // }
        // if (!value.personmobile) {
        //     isValid = false;
        //     newErrors.personmobile = "personemail is required";
        // }
        const gstpattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (value.gst && !gstpattern.test(value.gst)) {
            isValid = false;
            newErrors.gst = "gst no or pattern invalid";
        }

        const panpattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (value.pancard && !panpattern.test(value.pancard)) {
            isValid = false;
            newErrors.pancard = "PAN card number is invalid";
        }
        // if (!image) {
        //     isValid = false;
        //     newErrors.gstupload = "gstupload is required";
        // }
        // if (!image2) {
        //     isValid = false;
        //     newErrors.panupload = "panupload is required";
        // }
        // if (!image3) {
        //     isValid = false;
        //     newErrors.agreementupload = "agreementupload is required";
        // }
        // if (!value.account_name) {
        //     isValid = false;
        //     newErrors.account_name = "account_name is required";
        //     newErrors.add_bank = "add bank info";
        // }
        // if (!value.account_no) {
        //     isValid = false;
        //     newErrors.account_no = "account_no is required";
        // }
        const ifscRegex = /^[A-Za-z]{4}[0-9]{7}$/;
        if (value.ifsc_code && !ifscRegex.test(value.ifsc_code)) {
            isValid = false;
            newErrors.ifsc_code = "ifsc_code is invalid";
        }

        // Add more validation for other fields as needed

        setErrors(newErrors);
        setTimeout(() => {
            setErrors("")
        }, 5000);
        return isValid;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        $('.file-upload-browse').on('click', function () {
            var file = $(this).parent().parent().parent().find('.file-upload-default');
            file.trigger('click');
        });
        $('.file-upload-default').on('change', function () {
            $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
        });

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            setLoader(true)
            let hashpassword

            if (vendor.id) {
                hashpassword = vendor.password || "";
            } else {
                hashpassword = md5(value.password)
            }



            const formData = new FormData();

            formData.append('vendor_name', value.vendor_name);
            formData.append('email', value.email);
            formData.append('mobile', value.mobile);
            formData.append('username', value.username);
            formData.append('spassword' , value.password)
            formData.append('password', hashpassword);
            formData.append('address', value.address);
            formData.append('state', value.state);
            formData.append('city', value.city);
            formData.append('pincode', value.pincode);
            formData.append('personemail', value.personemail);
            formData.append('personmobile', value.personmobile);
            formData.append('personname', value.personname);
            formData.append('gst', value.gst);
            formData.append('pancard', value.pancard);
            formData.append('gstupload', image);
            formData.append('panupload', image2);
            formData.append('agreementupload', image3);
            formData.append('account_name', value.account_name);
            formData.append('account_no', value.account_no);
            formData.append('ifsc_code', value.ifsc_code);
            formData.append('u_id', vendor.id);
            formData.append('user_id', decryptedUserId());

            fetch(`${BASE_URL}/add_vendor`, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response from the backend
                    console.log(data);
                    alert(data)
                    setLoader(false)
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error:', error);
                });



            // axios.post(`${BASE_URL}/add_vendor`, data)
            //     .then((res) => {
            //         alert(res.data)
            //         console.log(res.data)
            //     })
            //     .catch((err) => {
            //         console.log(err)
            //     })


        } else {
            alert("Please fill all the field")
            setLoader(false)
        }
    }

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        setImage(file);

    };
    const handleUpload2 = async (e) => {
        const file = e.target.files[0];
        setImage2(file);

    };
    const handleUpload3 = async (e) => {
        const file = e.target.files[0];
        setImage3(file);

    };

    const roledata = {
        role : Cookies.get(`role`),
        pageid : 2
       }
   
       const dispatch = useDispatch()
       const roleaccess = useSelector((state) => state.roleAssign?.roleAssign[0]?.accessid);
   
   
       useEffect(() => {
           
           dispatch(getRoleData(roledata))
       }, [])


      async function getstate(){
       axios.get(`${BASE_URL}/state`)
       .then((res)=>{
        setState(res.data)
       })
      }
     
      useEffect(()=>{
        getstate()
      },[])


    return (
        <div class="container-fluid page-body-wrapper">
            <div class="main-panel">
                <div class="content-wrapper">
                    <CustomHeder />
                    {loader && <Loader/>}
                    <div class="row">
                        <div class="col-md-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Add Vendor</h4>
                                    <p class="card-description bg-light">
                                        Details
                                    </p>

                                    <form class="forms-sample" onSubmit={handleSubmit}>
                                        <div className='row'>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Vendor Name<span className='text-danger'>*</span></label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.vendor_name} placeholder="Vendor Name" name="vendor_name" onChange={onhandleChange} />
                                                {errors.vendor_name && <div className="text-danger">{errors.vendor_name}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Email<span className='text-danger'>*</span></label>
                                                <input type="email" class="form-control" id="exampleInputUsername1" value={value.email} placeholder="Email" name="email" onChange={onhandleChange} />
                                                {errors.email && <div className="text-danger">{errors.email}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputEmail1">Mobile No<span className='text-danger'>*</span></label>
                                                <input type="number" class="form-control" id="exampleInputEmail1" placeholder="Mobile No" value={value.mobile} name="mobile" onChange={onhandleChange} />
                                                {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputPassword1">Username<span className='text-danger'>*</span></label>
                                                <input type="username" class="form-control" id="exampleInputPassword1" placeholder="Username" value={value.username} name="username" onChange={onhandleChange} />
                                                {errors.username && <div className="text-danger">{errors.username}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputConfirmPassword1">Password<span className='text-danger'>*</span></label>
                                                {vendor.id == undefined ? <input type="password" class="form-control" id="exampleInputConfirmPassword1" placeholder="Password" name="password" onChange={onhandleChange} /> : <input type="password" class="form-control" id="exampleInputConfirmPassword1" onChange={onhandleChange} placeholder="Password" name="password" disabled />}

                                                {errors.password && <div className="text-danger">{errors.password}</div>}
                                            </div>
                                            {/* <hr width="100%"></hr> */}
                                            <p class="card-description col-lg-12 bg-light">
                                                Contact Details
                                            </p>
                                            <div class="form-group col-lg-12">
                                                <label for="exampleTextarea1">Address</label>
                                                <textarea class="form-control" id="exampleTextarea1" rows="4" name='address' value={value.address} onChange={onhandleChange}></textarea>
                                                {errors.address && <div className="text-danger">{errors.address}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleFormControlSelect1">state</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" value={value.state} onChange={onhandleChange} name='state'>
                                                    <option selected>Select state</option>

                                                    {state.map((item)=>{
                                                        return(
                                                            
                                                            <option value={item.id}>{item.name}</option>
                                                        )
                                                    })}
                                                
                                                </select>
                                                {errors.state && <div className="text-danger">{errors.state}</div>}
                                            </div>


                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">City</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.city} placeholder="City" name='city' onChange={onhandleChange} />
                                                {errors.city && <div className="text-danger">{errors.city}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Pincode</label>
                                                <input type="number" class="form-control" id="exampleInputUsername1" placeholder="Pincode" value={value.pincode} name='pincode' onChange={onhandleChange} />
                                                {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
                                            </div>

                                            <p class="card-description col-lg-12 bg-light">
                                                Contact Person Details
                                            </p>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Contact Person Name</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Name" value={value.personname} name='personname' onChange={onhandleChange} />
                                                {errors.personname && <div className="text-danger">{errors.personname}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Contact Person Email</label>
                                                <input type="email" class="form-control" id="exampleInputUsername1" placeholder="Email" name='personemail' value={value.personemail} onChange={onhandleChange} />
                                                {errors.personemail && <div className="text-danger">{errors.personemail}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Contact Person Mobile</label>
                                                <input type="number" class="form-control" id="exampleInputUsername1" placeholder="Mobile" name='personmobile' value={value.personmobile} onChange={onhandleChange} />
                                                {errors.personmobile && <div className="text-danger">{errors.personmobile}</div>}
                                            </div>
                                            <div className='col-lg-12 kyc-details py-3'>
                                                <p class="card-description col-lg-12 bg-light text-dark">
                                                    Kyc Details
                                                </p>
                                                <div className='row'>
                                                    <div class="form-group col-lg-3">
                                                        <label for="exampleInputUsername1">Vendor GST</label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Vendor GST" value={value.gst} name='gst' onChange={onhandleChange} />
                                                        {errors.gst && <div className="text-danger">{errors.gst}</div>}
                                                    </div>
                                                    <div class="form-group col-lg-3">
                                                        <label for="exampleInputUsername1">Vendor Pancard</label>
                                                        <input type="text" class="form-control" id="exampleInputUsername1" value={value.pancard} placeholder="Vendor Pancard" name='pancard' onChange={onhandleChange} />
                                                        {errors.pancard && <div className="text-danger">{errors.pancard}</div>}
                                                    </div>


                                                </div>
                                                <p class="card-description col-lg-12 bg-light text-dark">
                                                    Upload Kyc <span className='text-secondary'>(upload pdf only)</span>
                                                </p>
                                                <div className='row'>

                                                    <div class="form-group col-lg-3">
                                                        <label>GST Certificate Upload<span className='text-secondary'>(size less than 5mb)</span></label>

                                                        <input type="file" class="form-control file-upload-info" name='gstupload' onChange={handleUpload} />
                                                        {errors.gstupload && <div className="text-danger">{errors.gstupload}</div>}
                                                    </div>
                                                    <div class="form-group col-lg-3">
                                                        <label>Pancard Upload<span className='text-secondary'>(size less than 5mb)</span></label>

                                                        <input type="file" class="form-control file-upload-info" name='panupload' onChange={handleUpload2} />
                                                        {errors.panupload && <div className="text-danger">{errors.panupload}</div>}
                                                    </div>
                                                    <div class="form-group col-lg-3">
                                                        <label>Agreement Upload<span className='text-primary text-underline' onClick={handleDownload}> Download pdf</span></label>

                                                        <input type="file" class="form-control file-upload-info" name='agreementupload' onChange={handleUpload3} />
                                                        {errors.agreementupload && <div className="text-danger">{errors.agreementupload}</div>}
                                                    </div>

                                                </div>

                                            </div>



                                        </div>
                                        <div className='row py-2'>
                                            <p class="card-description col-lg-12 bg-light">
                                                Bank Details
                                            </p>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Account holder Name</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.account_name} placeholder="Enter Name" name='account_name' onChange={onhandleChange} />
                                                {errors.account_name && <div className="text-danger">{errors.account_name}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Account Number</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.account_no} placeholder="Enter Number" name='account_no' onChange={onhandleChange} />
                                                {errors.account_no && <div className="text-danger">{errors.account_no}</div>}
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Ifsc Code</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.ifsc_code} placeholder="Enter Code" name='ifsc_code' onChange={onhandleChange} />
                                                {errors.ifsc_code && <div className="text-danger">{errors.ifsc_code}</div>}
                                            </div>
                                        </div>
                                        {roleaccess > 2 ?    <div className='mt-3 text-right'>
                                            <button type="submit" class="btn btn-primary mr-2">{loader ? "Submitting.." : "Submit"}</button>
                                            <button type='button' onClick={() => {
                                                window.location.reload()
                                            }} class="btn btn-light">Cancel</button>
                                        </div> :null }
                                     

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorForm




