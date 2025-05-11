import { BASE_URL } from "./BaseUrl";
import React, { useEffect, useState } from "react";
import InnerHeader from "./InnerHeader";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const LocationMaster = () => {
  const [locations, setLocations] = useState([]);
  const [slot, setSlot] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter locations based on search query
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to fetch locations from the server
  const fetchLocations = async () => {
    try {
      const response = await fetch(`${BASE_URL}/locationMaster_data`);
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateSlot = async (id, selectedSlot, slot) => {
    try {
      const response = await fetch(`${BASE_URL}/updateSlot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, slot: selectedSlot }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      window.location.reload();
    } catch (error) {
      console.error("Error updating slot:", error);
    }
  };

  const handleToggle = (id, currentStatus) => {
    // console.log("dddd", currentStatus);

    const newStatus = currentStatus ? 1 : 0;

    // console.log("Toggling ID:", id, "New Status:", newStatus);
    axios
      .post(`${BASE_URL}/toggle_slot`, { toggle_id: id, status: newStatus })
      .then(() => {
        // Update local state to reflect the change
        setLocations((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );

        alert("Status Changed");
      })
      .catch((err) => {
        console.error("Error toggling category status:", err);
      });
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />

      <div className="main-panel">
        <div className="content-wrapper">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="card-title">Location Master</h4>
                    <p className="card-description">List of Location Master</p>
                  </div>
                  <div>
                    <TextField
                      label="Search by Location"
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
                <div className="table-responsive mt-3">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Location</th>
                        <th scope="col">Current Slot</th>
                        <th scope="col">Update Slot</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLocations.map((loc) => (
                        <tr key={loc.id}>
                          <td>{loc.id}</td>
                          <td>{loc.name}</td>
                          <td>{loc.slot}</td>
                          <td>
                            <select
                              class="form-control form-control-lg"
                              id="exampleFormControlSelect1"
                              name="slot"
                              onChange={(e) =>
                                updateSlot(loc.id, e.target.value)
                              }
                            >
                              <option selected>Select Slot</option>
                              <option value={`1`}>1</option>
                              <option value={`2`}>2</option>
                              <option value={`3`}>3</option>
                              <option value={`4`}>4</option>
                            </select>
                          </td>
                          <td>
                            <FormControlLabel
                              control={
                                <Android12Switch
                                  checked={loc.status == 1} 
                                  onChange={(e) => {
                                    handleToggle(loc.id, e.target.checked); 
                                  }}
                                />
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMaster;
