import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from "./InnerHeader";
import decryptedUserId from "../Utils/UserID";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "./Loader";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getRoleData } from "../Store/Role/role-action";
import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Brand = () => {
  const [brand, setBrand] = useState([]);
  const [uid, setUid] = useState([]);
  const [vendor, setVendorData] = useState([]);
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);
  const [cid, setCid] = useState("");
  const [vendor_id, setId] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState({});
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [value, setValue] = useState({
    title: "" || uid.title,
    description: "" || uid.description,
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setValue({
      title: "" || uid.title,
      description: "" || uid.description,
    });
  }, [uid]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!value.title) {
      isValid = false;
      newErrors.title = "title is required";
    }

    if (uid.logo == undefined && !image) {
      isValid = false;
      newErrors.logo = "logo is required";
    }

    setError(newErrors);
    return isValid;
  };

  const handleUpdate = (id) => {
    setLoader(true);
    axios
      .post(`${BASE_URL}/brand_update`, { u_id: id })
      .then((res) => {
        setUid(res.data[0]);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  async function getvendordata() {
    axios
      .get(`${BASE_URL}/getvendordata`)
      .then((res) => {
        setVendorData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getBrandData() {
    axios
      .get(`${BASE_URL}/Brand_data`)
      .then((res) => {
        console.log(res.data);
        setBrand(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getBrandData();
    getvendordata()
  }, []);

  const handleClick = (id) => {
    setCid(id);
    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: true,
    }));
  };

  const handleCancel = (id) => {
    // Hide the confirmation dialog without performing the delete action
    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
  };

  const HandleChange = (selectedValue) => {
    if (selectedValue) {

      const selectedId = selectedValue.id;
      setSelectedOption(selectedValue);
      setId(selectedId);
    }
  };

  const handleDelete = (id) => {
    const data = {
      cat_id: id,
    };

    axios
      .post(`${BASE_URL}/Brand_delete`, data)
      .then((res) => {
        getBrandData();
      })
      .catch((err) => {
        console.log(err);
      });

    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoader(true);
      const formdata = new FormData();

      formdata.append("title", value.title);
      if (image) {
        formdata.append("logo", image);
      } else {
        formdata.append("logo", uid.logo);
      }
      formdata.append("description", value.description);
      formdata.append("vendor_id", vendor_id);
      formdata.append("user_id", decryptedUserId());
      formdata.append("uid", uid.id);

      axios
        .post(`${BASE_URL}/add_brand`, formdata)
        .then((res) => {
          alert(res.data);
          getBrandData();
          setLoader(false);

          setValue({
            title: "",
            description: "",
          });
          setImage(undefined);
          setUid([]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onhandleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const columns = [
    {
      field: "index",
      headerName: "#",
      type: "number",
      align: "center",
      headerAlign: "center",
      flex: 1,
      filterable: false,
    },
    { field: "title", headerName: "Title", flex: 2 },
    {
      field: "image",
      headerName: "image",
      flex: 2,
      renderCell: (param) => {
        return (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={`${IMG_URL}/brand/${param.row.logo}`} alt="logo" />
          </div>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {roleaccess >= 2 && (
              <EditIcon
                sx={{ cursor: "pointer" }}
                onClick={() => handleUpdate(params.row.id)}
              />
            )}
            {roleaccess > 3 && (
              <DeleteIcon
                style={{ color: "red" }}
                onClick={() => handleClick(params.row.id)}
              />
            )}
          </>
        );
      },
    },
  ];
  const rowsWithIds = brand.map((row, index) => ({ index: index + 1, ...row }));

  const roledata = {
    role: Cookies.get(`role`),
    pageid: 8,
  };

  const dispatch = useDispatch();
  const roleaccess = useSelector(
    (state) => state.roleAssign?.roleAssign[0]?.accessid
  );

  useEffect(() => {
    dispatch(getRoleData(roledata));
  }, []);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter brands based on search query
  const filteredBrands = brand.filter(brand =>
    brand.title && typeof brand.title === 'string' && brand.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div class="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />
      {loader && <Loader />}
      {roleaccess > 1 ? (
        <div class="main-panel">
          <div class="content-wrapper">
            <div className="row">
              <div className="col-lg-5 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Add Brand</h4>

                    <form className="forms-sample py-3" onSubmit={handleSubmit}>

                      <div className="form-group">
                        <label for="exampleInputUsername1">Vendor</label>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={vendor}
                          size="small"
                          value={selectedOption}
                          getOptionLabel={(option) => option.vendor_name}
                          getOptionSelected={(option, value) =>
                            option.id === value.id
                          }
                          sx={{
                            width: "100%",
                            border: "none",
                            borderRadius: "5px",
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          onChange={(event, value) => HandleChange(value)}
                          name="vendor"
                        />
                        {error.category && (
                          <span className="text-danger">{error.category}</span>
                        )}
                      </div>

                      <div className="form-group">
                        <label for="exampleInputUsername1">
                          Title<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputUsername1"
                          value={value.title}
                          placeholder="Title"
                          name="title"
                          onChange={onhandleChange}
                        />
                        {error.title && (
                          <span className="text-danger">{error.title}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label for="exampleInputUsername1">
                          Logo<span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="exampleInputUsername1"
                          onChange={handleUpload}
                          name="image"
                          placeholder="Enter.."
                        />
                        {error.logo && (
                          <span className="text-danger">{error.logo}</span>
                        )}
                      </div>
                      <div>
                        <img
                          style={{ width: "200px" }}
                          src={`${IMG_URL}/brand/${uid.logo}`}
                          alt=""
                        />
                      </div>
                      <div className="form-group ">
                        <label for="exampleTextarea1">Description</label>
                        <textarea
                          className="form-control"
                          id="exampleTextarea1"
                          rows="4"
                          value={value.description}
                          name="description"
                          onChange={onhandleChange}
                        ></textarea>
                      </div>

                      {roleaccess > 2 && (
                        <>
                          {" "}
                          <button type="submit" className="btn btn-primary mr-2">
                            Submit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              window.location.reload();
                            }}
                            className="btn btn-light"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 className="card-title">Brand </h4>
                        <p className="card-description">List Of Brand</p>
                      </div>
                      <div>
                        <TextField
                          label="Search by Title"
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

                    <div>
                     <DataGrid
  rows={filteredBrands.map((row, index) => ({ index: index + 1, ...row }))}
  columns={columns}
  getRowId={(row) => row.id}
  initialState={{
    pagination: {
      paginationModel: { pageSize: 10, page: 0 },
    },
  }}
/>

                      {confirmationVisibleMap[cid] && (
                        <div className="confirm-delete">
                          <p>Are you sure you want to delete?</p>
                          <button
                            onClick={() => handleDelete(cid)}
                            className="btn btn-sm btn-primary"
                          >
                            OK
                          </button>
                          <button
                            onClick={() => handleCancel(cid)}
                            className="btn btn-sm btn-danger"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Brand;