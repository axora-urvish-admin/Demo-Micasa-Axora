import EditIcon from "@mui/icons-material/Edit";
import Button from '@mui/material/Button';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, IMG_URL } from '../AdminComponent/BaseUrl';
import decryptedvendorid from "../Utils/Vendorid";
import noimg from '../assets/images/noimg.jpg';
import InnerHeader from "./InnerHeader";
import { TextField } from "@mui/material";


const ProductStock = () => {
    const [product, setProductData] = useState([]);
    const [image, setImg] = useState([]);
    const [value, setValue] = useState({
        add: "",
        remove: ""
    })


    async function getstockdata() {
        const data = {
            vendor_id: decryptedvendorid()
        }

        axios
            .post(`${BASE_URL}/vendor_product_stock`, data)

            .then((res) => {

                setProductData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function getSigleImg() {
        axios
            .get(`${BASE_URL}/product_single_img`)
            .then((res) => {
                setImg(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }




    useEffect(() => {
        getstockdata();
        getSigleImg()
    }, []);



    const handleaddstock = (e, pro_id) => {

        const data = {
            count: value.add,
            pro_id: pro_id,
            flag: 1,
            user_id: decryptedvendorid()
        }
        axios.post(`${BASE_URL}/update_stock`, data)
            .then((res) => {
                // console.log(res)
                alert(res.data)
                setValue({
                    add: "",
                   
                })
                getstockdata()

            })
    }

    const handleremovestock = (e, pro_id) => {

        const data = {
            count: value.remove,
            pro_id: pro_id,
            flag: 2,
            user_id: decryptedvendorid()
        }
        axios.post(`${BASE_URL}/update_stock`, data)
            .then((res) => {
                // console.log(res)
                alert(res.data)
                if (res.data) {
                    setValue({
                        remove: "",
                       
                    })
                }

                getstockdata()

            })
    }


    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div class="container-fluid page-body-wrapper">
            <InnerHeader />
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h4 class="card-title">Products Stock </h4>
                                            <p class="card-description">List Of Products </p>
                                        </div>
                                      
                                    </div>

                                    <div class="table-responsive pt-3">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th width="10%">Image</th>
                                                    <th width="20%">Name</th>
                                                    <th width="10%">Category</th>
                                                    <th width="10%">Stock</th>
                                                    <th width="50%">Add/Remove</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {product.map((item, index) => {
                                                    return (
                                                        <tr>

                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>{image.filter((ele) => ele.product_id == item.id).map((item) => { return (<img src={`${IMG_URL}/productimg/` + item.image1} alt="" />) })}  {image.filter((ele) => ele.product_id === item.id).length === 0 && (
                                                                <img src={noimg} alt="No" />
                                                            )}</td>
                                                            <td>{item.title}</td>
                                                            <td>{item.category}</td>
                                                            <td>{item.stock || 0}</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <div style={{ position: "relative" }}>
                                                                        <TextField type="number" onChange={onhandleChange} id="outlined-basic" label="Add" name="add" variant="outlined" />
                                                                        <button onClick={(e) => handleaddstock(e, item.id)} className="btn-primary btn-sm stock-btn">Add</button>
                                                                    </div>

                                                                    <div style={{ position: "relative" }}>
                                                                        <TextField type="number" name="remove" onChange={onhandleChange} className="mx-2" id="outlined-basic" label="Remove" variant="outlined" />
                                                                        <button onClick={(e) => handleremovestock(e, item.id)} className="btn-danger btn-sm stock-btn">Remove</button>
                                                                    </div>


                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductStock;
