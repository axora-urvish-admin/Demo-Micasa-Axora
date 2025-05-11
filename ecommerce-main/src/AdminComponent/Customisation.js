import React, { useState } from 'react';
import InnerHeader from '../InnerHeader';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Customisation = () => {
  const [customisations, setCustomisations] = useState([]);
  const [searchQueryCustomer, setSearchQueryCustomer] = useState('');
  const [searchQueryProduct, setSearchQueryProduct] = useState('');

  // Function to handle search input changes
  const handleSearchChangeCustomer = (event) => {
    setSearchQueryCustomer(event.target.value);
  };

  const handleSearchChangeProduct = (event) => {
    setSearchQueryProduct(event.target.value);
  };

  // Filter customisations based on search queries
  const filteredCustomisations = customisations.filter(customisation =>
    customisation.customerName.toLowerCase().includes(searchQueryCustomer.toLowerCase()) &&
    customisation.productName.toLowerCase().includes(searchQueryProduct.toLowerCase())
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
                          <th>Details</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomisations.map((customisation, index) => {
                          return (
                            <tr key={customisation.id}>
                              <td>{index + 1}</td>
                              <td>{customisation.customerName}</td>
                              <td>{customisation.productName}</td>
                              <td>{customisation.details}</td>
                              <td>{customisation.status}</td>
                              <td>
                                // Actions like view details or process customisation
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

export default Customisation;