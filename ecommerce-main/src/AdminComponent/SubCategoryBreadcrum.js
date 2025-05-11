import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InnerHeader from "./InnerHeader";
import decryptedUserId from "../Utils/UserID";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "./Loader";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getRoleData } from "../Store/Role/role-action";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const SubCategoryBreadcrum = () => {
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [subcat, setsubCatData] = useState([]);
  const [error, setError] = useState({});
  const [cat, setCatData] = useState([]);
  const [cid, setCid] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [uid, setUid] = useState([]);
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);
  const [cat_id, setId] = useState("");
  const [value, setValue] = useState({
    category: "" || uid.cat_id,
    title: "" || uid.title,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!value.title) {
      isValid = false;
      newErrors.title = "title is required";
    }
    if (uid.image == undefined && !image) {
      isValid = false;
      newErrors.logo = "image is required";
    }

    setError(newErrors);
    return isValid;
  };

  useEffect(() => {
    console.log(uid, "???");
    setValue({
      title: "" || uid.title,
    });
  }, [uid]);

 

  async function getsubcatData() {
    axios
      .get(`${BASE_URL}/subcategory_data`)
      .then((res) => {
        setsubCatData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getsubcatData();
  }, []);


  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpdate = (id) => {
    setLoader(true);
    axios
      .post(`${BASE_URL}/subcategory_update`, { u_id: id })
      .then((res) => {
        setUid(res.data[0]);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (id) => {
    setCid(id);
    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: true,
    }));
  };

  

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const formdata = new FormData(); 
    
    if (validateForm()) { 
        setLoader(true); 
        
        
        if (image) {
            formdata.append("image", image); 
        } else if (uid.image) {
            formdata.append("image", uid.image); 
        } else {
            alert("Please select an image to upload."); 
            setLoader(false);
            return; 
        }
        
        formdata.append("title", value.title);
        formdata.append("u_id", uid.id);

        axios
            .post(`${BASE_URL}/SubCategory_breadcrumb_update`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            })
            .then((res) => {
                alert(res.data); 
                getsubcatData(); 
                setLoader(false); 
                
                setValue({
                    title: "",
                });
                setImage(""); 
                setUid([]); 
                setSelectedOption(null); 
            })
            .catch((err) => {
                console.log(err); 
                setLoader(false); 
            });
    }
};

  const onhandleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  useEffect(() => {
    // If you have received the ID from the API, find the option that matches the ID
    if (uid.cat_id) {
      console.log(cat, "111");
      const selected = cat.find((option) => option.id === uid.cat_id);
      console.log(selected, "dadad");
      setSelectedOption(selected);
    }
  }, [uid, cat]);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter subcategories based on search query
  const filteredSubCategories = subcat.filter(subCategory =>
    subCategory.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      field: "index",
      headerName: "ID",
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
            <img
              src={`${IMG_URL}/Breadcrumbs/${param.row.breadcrumb}`}
              alt="image"
            />
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
            
          </>
        );
      },
    },
  ];
  const rowsWithIds = filteredSubCategories.map((row, index) => ({
    index: index + 1,
    ...row,
  }));

  const roledata = {
    role: Cookies.get(`role`),
    pageid: 7,
  };

  const dispatch = useDispatch();
  const roleaccess = useSelector(
    (state) => state.roleAssign?.roleAssign[0]?.accessid
  );

  useEffect(() => {
    dispatch(getRoleData(roledata));
  }, []);

  return (
    <div class="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />
      {loader && <Loader />}
      {roleaccess > 1 ? (
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
              <div class="col-lg-5 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Add SubCategory Breadcrum</h4>

                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                      <div class="form-group">
                        <label for="exampleInputUsername1">
                          Title<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputUsername1"
                          value={value.title}
                          placeholder="Title"
                          name="title"
                          disabled
                          
                        />
                        {error.title && (
                          <span className="text-danger">{error.title}</span>
                        )}
                      </div>
                      <div class="form-group">
                        <label for="exampleInputUsername1">
                          Image<span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          class="form-control"
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
                          src={`${IMG_URL}/Breadcrumbs/${uid.breadcrumb}`}
                          alt="image"
                        />
                      </div>
                      {roleaccess > 2 && (
                        <>
                          {" "}
                          <button type="submit" class="btn btn-primary mr-2">
                            Submit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              window.location.reload();
                            }}
                            class="btn btn-light"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-7 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 class="card-title">SubCategory Breadcrum </h4>
                        <p class="card-description">List Of SubCategory Breadcrum</p>
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
                              </InputAdornment
                            ),
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <DataGrid
                        rows={rowsWithIds}
                        columns={columns}
                        getRowId={(row) => row.id}
                        initialState={{
                          pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                          },
                        }}
                      />
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

export default SubCategoryBreadcrum;
