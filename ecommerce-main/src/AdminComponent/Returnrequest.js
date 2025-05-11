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

const Returnrequest = () => {

  const [data, setdata] = useState([]);
  const [image, setImg] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter returns based on search query
  const filteredReturns = data.filter(returnRequest =>
    returnRequest.return_no.toString().includes(searchQuery)
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
                      <h4 className="card-title">Return Requests</h4>
                      <p className="card-description">List of Return Requests</p>
                    </div>
                    <div>
                      <TextField
                        label="Search by Return ID"
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
                          <th>Return ID</th>
                          <th>Customer Name</th>
                          <th>Email</th>
                          <th>Return Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReturns.map((item, index) => {
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
                            <tr key={item.id}>
                              <td>{index + 1}</td>
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

export default Returnrequest;
