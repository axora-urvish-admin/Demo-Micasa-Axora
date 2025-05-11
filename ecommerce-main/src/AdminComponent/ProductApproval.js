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
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const ProductApproval = () => {
  const [data, setdata] = useState([]);
  const [image, setImg] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on search query
  const filteredProducts = data.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 className="card-title">Product Approval</h4>
                      <p className="card-description">List of Product Approvals</p>
                    </div>
                    <div>
                      <TextField
                        label="Search by Name"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{ width: '300px', marginRight: '10px' }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  </div>

                  <div className="table-responsive pt-3">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Subcategory</th>
                          <th>Vendor</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
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
                          );
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
