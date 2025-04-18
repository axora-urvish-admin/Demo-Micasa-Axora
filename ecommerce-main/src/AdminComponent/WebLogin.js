import React, { useState } from 'react'
// import logo from '../assets/images/logo.svg'
import axios from 'axios'
import { BASE_URL } from './BaseUrl'
import md5 from 'js-md5'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import logo from "../assets/frontimg/bgrlogo.png";


const WebLogin = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    role: ""
  })

  const [err, setErr] = useState("")

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!value.email) {
      errors.email = 'Email is required';
      isValid = false;
    }

    if (!value.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    if (!value.role || value.role === 'Select Role') {
      errors.role = 'Role is required';
      isValid = false;
    }

    setErrors(errors);

    return isValid;
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   if (validateForm()) {

  //     const hashpass = md5(value.password)



  //     const data = {
  //       email: value.email,
  //       password: hashpass,
  //       role: value.role
  //     }
  //     axios.post(`${BASE_URL}/login`, data)
  //       .then((res) => {
  //         console.log(res.data.data[0].id)
  //         if (res.data.Login) {
  //           Cookies.set('userid', res.data.data[0].id, { expires: 1 }); 
  //           Cookies.set('token', res.data.token, { expires: 1 }); 
  //           localStorage.setItem("token", res.data.token)
  //           navigate('/webapp')
  //         }
  //         else {
  //           setErr(res.data.err)
  //         }

  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }
  // }

  const encryptionKey = 'secret-key';

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {

      const hashpass = md5(value.password)



      const data = {
        email: value.email,
        password: hashpass,
        role: value.role
      }
      axios.post(`${BASE_URL}/login`, data)
        .then((res) => {


          if (res.data.id) {

            const role = res.data.data[0].role
            const ciphertext = CryptoJS.AES.encrypt(res.data.id.toString(), encryptionKey).toString();

            Cookies.set('userid', ciphertext, { expires: 2 });
            Cookies.set('role', role, { expires: 2 });


            navigate('/webapp')
          }else {
            setErr(res.data.err)
            setTimeout(() => {
              setErr('')
            }, 5000);
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



  return (
    <div className="container-scroller d-flex">
      <div className="container-fluid page-body-wrapper full-page-wrapper d-flex">
        <div className="content-wrapper d-flex align-items-center auth px-0" >
          <div className="row w-100 mx-0" >
            <div className="col-lg-4 mx-auto" >
              <div className="auth-form-light text-left py-5 px-4 px-sm-5" >
                <div className="brand-logo">
                  <img src={logo} alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3" method="POST" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                      id="exampleInputEmail1"
                      placeholder="Username"
                      name="email"
                      onChange={onhandleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      onChange={onhandleChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <select
                    className={`form-control form-control-sm ${errors.role ? 'is-invalid' : ''}`}
                    aria-label="Default select example"
                    name="role"
                    onChange={onhandleChange}
                  >
                    < option defaultValue > Select Role</option >
                    <option value="1">Admin</option>
                    {/* <option value="2">Vendor</option> */}
                    <option value="2">Sub-Admin</option>
                  </select>
                  {errors.role && (
                    <div className="invalid-feedback">{errors.role}</div>
                  )}

                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-sm font-weight-medium auth-form-btn"
                      type="submit"
                    >
                      SIGN IN
                    </button>
                  </div>
                  <p className='text-danger py-3'>{err}</p>
                </form>



              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default WebLogin;

