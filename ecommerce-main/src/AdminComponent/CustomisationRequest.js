import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InnerHeader from '../InnerHeader';

const CustomisationRequest = () => {
  const [requests, setRequests] = useState([]);
  const [searchQueryCustomer, setSearchQueryCustomer] = useState('');
  const [searchQueryProduct, setSearchQueryProduct] = useState('');

  // Function to handle search input changes
  const handleSearchChangeCustomer = (event) => {
    setSearchQueryCustomer(event.target.value);
  };

  const handleSearchChangeProduct = (event) => {
    setSearchQueryProduct(event.target.value);
  };

  // Filter requests based on search queries
  const filteredRequests = requests.filter(request =>
    request.customerName.toLowerCase().includes(searchQueryCustomer.toLowerCase()) &&
    request.productName.toLowerCase().includes(searchQueryProduct.toLowerCase())
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
                      <h4 className="card-title">Customisation Requests</h4>
                      <p className="card-description">List of Customisation Requests</p>
                    </div>
                    <div>
                      <TextField
                        label="Search by Customer Name"
                        variant="outlined"
                        value={searchQueryCustomer}
                        onChange={handleSearchChangeCustomer}
                        sx={{ width: '300px', marginRight: '10px' }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        label="Search by Product Name"
                        variant="outlined"
                        value={searchQueryProduct}
                        onChange={handleSearchChangeProduct}
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
                          <th>Customer Name</th>
                          <th>Product Name</th>
                          <th>Request Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRequests.map((request, index) => {
                          return (
                            <tr key={request.id}>
                              <td>{index + 1}</td>
                              <td>{request.customerName}</td>
                              <td>{request.productName}</td>
                              <td>{request.requestDate}</td>
                              <td>{request.status}</td>
                              <td>
                                // Actions like view details or process request
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

export default CustomisationRequest; 