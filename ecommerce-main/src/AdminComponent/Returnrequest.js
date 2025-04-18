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

const Returnrequest = () => {

  const [data, setdata] = useState([]);
  const [image, setImg] = useState([]);

  async function getrequestData() {
    axios
      .get(`${BASE_URL}/return_request`)
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
                    
                          <th>Return Id</th>
                          <th>Customer Name</th>
                          <th>Email</th>
                          <th>Return Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.map((item,index) => {
                               const isoDateStr = item.return_date;

                               // Convert to Date object
                               const dateObj = new Date(isoDateStr);
                               
                               // Extract year, month, and day
                               const year = dateObj.getUTCFullYear();
                               const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                               const day = String(dateObj.getUTCDate()).padStart(2, '0');
                               
                               // Format to desired date format (e.g., YYYY-MM-DD)
                               const formattedDate = `${year}-${month}-${day}`;
                               
                               console.log(formattedDate);  // Outputs: 2024-06-03
                          return (
                            <tr>
                 
                              
                              <td>
                                {index + 1}
                              </td>
                           
                              <td>{item.return_no}</td>
                              <td>{item.firstname} {item.lastname}</td>
                              <td>{item.email}</td>
                              <td>{formattedDate}</td>
                              
                              <td className={item.status == 'Pending' ? "text-danger" : item.status == 'Success' ? "text-success" : ""}>
                                {item.status}
                              </td>
                              <td>
                                <Link to={`/webapp/returnrequestview/${item.id}`}>
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

export default Returnrequest;
