import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";


const BrandRequest = () => {
  const [brand, setBrand] = useState([]);


  async function getbrandrequest() {
    axios
      .get(`${BASE_URL}/vendor_Brand_request`)
      .then((res) => {
        setBrand(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getbrandrequest();
  }, []);

  const handleapprove = (id) => {

    const userConfirmed = window.confirm('Are you sure you want to approve?');

    const data = {
      brand_id: id
    }
    if (userConfirmed) {
      axios.post(`${BASE_URL}/approve_brand`, data)
        .then((res) => {
          if (res.data) {
            alert("Approved successfully")
            getbrandrequest()
          }
        })
    }

  }


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
                          <th>Brand Name</th>
                          <th>Vendor Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {brand.map((item, index) => {
                          return (
                            <tr>
                              <td>
                                {index + 1}
                              </td>
                              <td><img src={`${IMG_URL}/brand/` + item.logo} alt="" /></td>
                              <td>{item.title}</td>
                              <td>
                                {item.vendor_name}
                              </td>
                              <td>
                                <Link>
                                  <RemoveRedEyeIcon type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" />
                                </Link>
                              </td>
                              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel">Add Message</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <div className='col-lg-4'>
                                        <div class="card-body">
                                          <ul class="list-stats" style={{ paddingLeft: "0", width: "200px" }}>
                                            <li class="">
                                              <span class="lable">Brand name:</span>
                                              &nbsp;<span class="value"><b>test</b></span>
                                            </li>
                                            <li class="w-200 py-1">
                                              <span class="lable">Vendor Name</span>
                                              &nbsp; <span class="value"><b>test</b></span>
                                            </li>
                                     
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-success" onClick={() =>handleapprove(item.id) } data-bs-dismiss="modal">Approve</button>
                                    </div>
                                  </div>
                                </div>
                              </div>

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

export default BrandRequest;
