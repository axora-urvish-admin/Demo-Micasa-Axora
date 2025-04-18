import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InnerHeader from "./InnerHeader";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import chair from '../assets/images/chair.jpg'
import noimg from '../assets/images/noimg.jpg'

const ProductApproval = () => {
  const [data, setdata] = useState([]);
  const [image, setImg] = useState([]);

  async function getrequestData() {
    axios
      .get(`${BASE_URL}/getproductrequest`)
      .then((res) => {
        setdata(res.data);
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
    getrequestData();
    getSigleImg()
  }, []);






  return (
    <div class="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 class="card-title">Product Approval </h4>
                      <p class="card-description">List Of Products</p>
                    </div>
                    <div>
                      {/* <Link to="/webapp/product">
                        <button className=" btn btn-primary">Add Product</button>
                        <Button variant="outlined" size="medium"><AddCircleOutlineIcon  style={{fontSize : "16px"}}/> Add Product</Button>
                      </Link> */}
                      {/* <Link to="/webapp/product" ><button className=' btn btn-primary'>Add Product</button></Link> */}
                    </div>
                  </div>

                  <div class="table-responsive pt-3">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>
                            #
                          </th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Subcategory</th>
                          <th>Vendor  Name</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.map((item,index) => {
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
                              <td>{item.subcategory}</td>
                              <td>{item.vendor}</td>
                              <td>{item.price}</td>

                              <td>
                              {"Pending"}
                              </td>
                              <td>
                                <Link to={`/webapp/productapprovalview/${item.id}`}>
                                  <RemoveRedEyeIcon />
                                </Link>

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

export default ProductApproval;
