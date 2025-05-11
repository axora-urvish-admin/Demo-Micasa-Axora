import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ContectRequest = () => {
  const [custom, setCustom] = useState([]);
  const [viewedItems, setViewedItems] = useState(new Set()); // To keep track of viewed items
  const [searchQuery, setSearchQuery] = useState('');

  async function getCustomRequest() {
    axios
      .get(`${BASE_URL}/getcontectrequest`)
      .then((res) => {
        setCustom(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // Get previously viewed items from local storage
    const storedViewedItems =
      JSON.parse(localStorage.getItem("viewedItems")) || [];
    setViewedItems(new Set(storedViewedItems));

    getCustomRequest();
  }, []);

  const updateRead = (id) => {
    const data = {
      tablename: "awt_productinquiry",
      product_id: id,
    };

    axios
      .post(`${BASE_URL}/updateread`, data)
      .then((res) => {
        setViewedItems((prev) => {
          const updatedSet = new Set(prev);
          updatedSet.add(id); // Add the newly viewed item to the set

          // Save the updated set to local storage
          localStorage.setItem(
            "viewedItems",
            JSON.stringify(Array.from(updatedSet))
          );
          return updatedSet; // Return the updated set to update state
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter contacts based on search query
  const filteredContacts = custom.filter(contact =>
    contact.firstname.toLowerCase().includes(searchQuery.toLowerCase())
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
                      <h4 className="card-title">Contect Request</h4>
                      <p className="card-description">
                        List Of Contect Request
                      </p>
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
                          <th>Firstname Name</th>
                          <th>Email</th>
                          <th>Message</th>
                          <th>Mobile No.</th>
                          <th>Requested Date</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredContacts.map((item, index) => {
                          const isoDateStr = item.created_date;
                          const dateObj = new Date(isoDateStr);
                          const formattedDate = `${dateObj.getUTCFullYear()}-${String(
                            dateObj.getUTCMonth() + 1
                          ).padStart(2, "0")}-${String(
                            dateObj.getUTCDate()
                          ).padStart(2, "0")}`;

                          const isViewed = viewedItems.has(item.id);

                          return (
                            <tr
                              key={item.id}
                              onClick={() => updateRead(item.id)}
                              style={{
                                backgroundColor: isViewed
                                  ? "transparent"
                                  : "#f8d7da",
                              }}
                            >
                              <td style={{width:'3%'}}>{index + 1}</td>
                              <td style={{width:'17%'}}>{item.firstname}</td>
                              <td style={{width:'15%'}}>{item.email}</td>
                              <td style={{width:'38%'}}>{item.message}</td>
                              <td style={{width:'12%'}}>{item.mobile}</td>
                              <td style={{width:'15%'}}>{formattedDate}</td>
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

export default ContectRequest;
