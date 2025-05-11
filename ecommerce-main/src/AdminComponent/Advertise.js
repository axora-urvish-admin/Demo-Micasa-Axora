import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
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

const Advertise = () => {
  const [loader, setLoader] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [advertisements, setAdvertisements] = useState([]);
  const [editId, setEditId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [videoValue, setVideoValue] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [formValue, setFormValue] = useState({ location: "" });
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState()
  const [searchQueryTitle, setSearchQueryTitle] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${BASE_URL}/LocationMaster_data`);
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const handleAddClick = () => {
    setShowForm(true);
    clearForm();
  };

  const resetForm = () => {
    clearForm();
    setEditId(null);
  };

  const clearForm = () => {
    setEditId(null);
    setSelectedSlot("");
    setSelectedType("");
    setTitleValue("");
    setLinkValue("");
    setVideoValue("");
    setTargetValue("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('slot', selectedSlot);
    formData.append('loc', formValue.location);
    formData.append('type', selectedType);
    formData.append('title', titleValue);
    formData.append('link', linkValue);
    formData.append('video', videoValue);
    formData.append('target', targetValue);
    formData.append('image', image || 'a'); // Assuming 'image' is a File object from an input field
    formData.append('created_by', 1);

    try {
      if (editId) {
        formData.append('id', editId);
        await axios.post(`${BASE_URL}/update_advertisement`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert("Advertisement Updated Successfully!");
      } else {
        await axios.post(`${BASE_URL}/add_advertisement`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert("Advertisement Added Successfully!");
      }
      window.location.reload()
      // getAdvertisements();
     

    } catch (err) {
      console.error(err);
      alert("Error adding/updating advertisement");
    }
  };

  const handleToggle = (id, currentStatus) => {
    // console.log("dddd", currentStatus);

    const newStatus = currentStatus ? 1 : 0;

    // console.log("Toggling ID:", id, "New Status:", newStatus);
    axios
      .post(`${BASE_URL}/toggle_add`, { toggle_id: id, status: newStatus })
      .then(() => {
        setAdvertisements((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );

        // alert("Status Changed");
      })
      .catch((err) => {
        console.error("Error toggling category status:", err);
      });
  };


  const getAdvertisements = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/advertisements`);
      setAdvertisements(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (advertisement) => {
    setSelectedSlot(advertisement.slot);
    setSelectedType(advertisement.type);
    setTitleValue(advertisement.title);
    setLinkValue(advertisement.link);
    setVideoValue(advertisement.iframe);
    setTargetValue(advertisement.target);
    setEditId(advertisement.id);
    setImage(advertisement.image);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this advertisement?")) {
      try {
        await axios.post(`${BASE_URL}/delete_advertisement`, { id });
        alert("Advertisement Deleted Successfully!");
        getAdvertisements();
      } catch (err) {
        console.error(err);
        alert("Error deleting advertisement");
      }
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    console.log(file)
    setImage(file);

  };

  useEffect(() => {
    getAdvertisements();
  }, []);

  // Function to handle search input changes for title
  const handleSearchChangeTitle = (event) => {
    setSearchQueryTitle(event.target.value);
  };

  // Filter advertisements based on search query for title
  const filteredAdvertisements = advertisements.filter(advertisement =>
    advertisement.title.toLowerCase().includes(searchQueryTitle.toLowerCase())
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
                        <h4 className="card-title">
                          {editId
                            ? "Edit Advertisement"
                            : "Add New Advertisement"}
                        </h4>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label>Location</label>
                          <select
                            className="form-control"
                            name="location"
                            value={formValue.location}
                            onChange={handleChange}
                          >
                            <option value="">Select a location</option>
                            {locations.map((loc) => (
                              <option key={loc.id} value={loc.id}>
                                {loc.name}
                              </option>
                            ))}
                          </select>
                          {errors.location && (
                            <div className="text-danger">{errors.location}</div>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label>Slot:</label>
                          {/* <select
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="form-control"
                            required
                          >
                            <option value="">Select Slot</option>
                            <option value="Slot-1">Slot-1</option>
                            <option value="Slot-2">Slot-2</option>
                          </select> */}
                          <select class="form-control" id="exampleFormControlSelect1" name='slot' value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
                            <option selected>Select Slot</option>
                            <option value={`1`}>1</option>
                            <option value={`2`}>2</option>
                            <option value={`3`}>3</option>
                            <option value={`4`}>4</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label>Title:</label>
                          <input
                            type="text"
                            value={titleValue}
                            onChange={(e) => setTitleValue(e.target.value)}
                            placeholder="Enter title"
                            className="form-control"
                            required
                          />
                        </div>

                      </div>

                      <div className="row mb-3">

                        <div className="col-md-4">
                          <label>Advertisement Type:</label>
                          <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="form-control"
                            required
                          >
                            <option value="">Select Adv.. Type</option>
                            <option value="Image">Image</option>
                            <option value="Iframe">Iframe</option>
                          </select>
                        </div>

                        {selectedType == "Image" ? <div className="col-md-4">

                          <div className="form-group">
                            <label htmlFor="ban_img">Banner Image<span className='text-danger'>*</span></label>
                            <input type="file" className="form-control" id="ban_img" placeholder="" name='banner' onChange={handleUpload} />
                            {errors.banner && <div className="text-danger">{errors.banner}</div>}
                          </div>

                        </div> : <div className="col-md-4">
                          <label>Video Link</label>
                          <input
                            type="text"
                            value={videoValue}
                            onChange={(e) => setVideoValue(e.target.value)}
                            placeholder="Enter Link"
                            className="form-control"
                            required
                          />
                        </div>}





                        <div className="col-md-4">
                          <label>Link:</label>
                          <input
                            type="text"
                            value={linkValue}
                            onChange={(e) => setLinkValue(e.target.value)}
                            placeholder="Enter Link"
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="col-md-4">
                          <label>Target:</label>
                          <select
                            value={targetValue}
                            onChange={(e) => setTargetValue(e.target.value)}
                            className="form-control"
                            required
                          >
                            <option value="">Select Target Type</option>
                            <option value="_self">same</option>
                            <option value="_blank">blank</option>
                          </select>
                        </div>
                      </div>

                      {/* <div className="row mb-3">
                        <div className="col-md-4">

                          <div className="form-group">
                            <label htmlFor="ban_img">Banner Image<span className='text-danger'>*</span></label>
                            <input type="file" onChange={onhandleupload} className="form-control" id="ban_img" placeholder="" name='banner'/>
                            {errors.banner && <div className="text-danger">{errors.banner}</div>}
                          </div>
                  
                        </div>
                      </div> */}

                      <button type="submit" className="btn btn-primary mr-2">
                        {editId
                          ? "Update Advertisement"
                          : "Add New Advertisement"}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="btn btn-light"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
         
          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 className="card-title">Advertisements </h4>
                      <p className="card-description">List of Advertisements</p>
                    </div>
                    <div>
                      <TextField
                        label="Search by Title"
                        variant="outlined"
                        value={searchQueryTitle}
                        onChange={handleSearchChangeTitle}
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

                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">location</th>
                          <th scope="col">Slot</th>
                          <th scope="col">Title</th>
                          <th scope="col">Adv.. Type</th>
                          <th scope="col">Image</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAdvertisements.map((ad) => (
                          <tr key={ad.id}>
                            <td>{ad.id}</td>
                            <td>loc-{ad.location}</td>
                            <td>{ad.slot}</td>
                            <td>{ad.title}</td>
                            <td>{ad.type}</td>
                            <td><img  src={`${IMG_URL}/Advertisement/` + ad.image} alt=""/></td>
                            <td>
                              <FormControlLabel control={
                                <Android12Switch
                                  checked={ad.status == 1} 
                                  onChange={(e) => {
                                    handleToggle(ad.id, e.target.checked); 
                                  }}
                                />
                              }/>
                            </td>
                            <td>
                              <EditIcon
                                onClick={() => handleEdit(ad)}
                                style={{
                                  cursor: "pointer",
                                  marginRight: "10px",
                                }}
                              />
                              <DeleteIcon
                                onClick={() => handleDelete(ad.id)}
                                style={{ color: "red", cursor: "pointer" }}
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
    </div>
  );
};

export default Advertise;
