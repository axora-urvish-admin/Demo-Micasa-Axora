import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


const VendorRequest = () => {
  
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter vendors based on search query
  const filteredVendors = vendors.filter(vendor =>
    vendor.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function getvendorrequest() {
    axios
      .get(`${BASE_URL}/vendor_request`)
      .then((res) => {
        setVendors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getvendorrequest();
  }, []);

  const handleapprove = (id,firstname,lastname,email,mobile) => {

    const userConfirmed = window.confirm('Are you sure you want to approve?');

    const data = {
      vendor_id: id,
      firstname : firstname,
      lastname : lastname,
      email : email,
      mobile : mobile,
      status : 1
    }
    if (userConfirmed) {
      axios.post(`${BASE_URL}/vendor_request_approve`, data)
        .then((res) => {
          if (res.data) {
            alert("Approved successfully")
            getvendorrequest()
          }
        })
    }

  }


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
                      <h4 className="card-title">Vendor Approval</h4>
                      <p className="card-description">List of Vendor Requests</p>
                    </div>
                    <div>
                      <TextField
                        label="Search by First Name"
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
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVendors.map((vendor, index) => {
                          const isoDateStr = vendor.created_date;

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
                            <tr key={vendor.id}>
                              <td>{index + 1}</td>
                              <td>{vendor.firstname}</td>
                              <td>{vendor.lastname}</td>
                              <td>{vendor.email}</td>
                              <td>{vendor.status}</td>
                              <td>
                                <Link>
                                  <RemoveRedEyeIcon type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" />
                                </Link>
                              </td>

                              <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title" id="exampleModalLabel">Add Message</h5>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                      <div className="col-lg-4">
                                        <div className="card-body">
                                          <ul className="list-stats" style={{ paddingLeft: "0", width: "200px" }}>
                                            <li className="">
                                              <span className="lable">Vendor name:</span>
                                              &nbsp;<span className="value"><b>{vendor.firstname} {vendor.lastname}</b></span>
                                            </li>
                                            <li className="w-200 py-1">
                                              <span className="lable">Email</span>
                                              &nbsp; <span className="value"><b>{vendor.email}</b></span>
                                            </li>
                                            <li className="w-200 py-1">
                                              <span className="lable">Mobile</span>
                                              &nbsp; <span className="value"><b>{vendor.mobile}</b></span>
                                            </li>
                                            <li className="w-200 py-1">
                                              <span className="lable">Message</span>
                                              &nbsp; <span className="value"><b>{vendor.message}</b></span>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" className="btn btn-success" onClick={() => handleapprove(vendor.id, vendor.firstname, vendor.lastname, vendor.email, vendor.mobile)} data-bs-dismiss="modal">Approve</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
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

export default VendorRequest;
