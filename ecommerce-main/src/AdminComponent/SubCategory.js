import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
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
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SubCategory = () => {
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [subcat, setsubCatData] = useState([]);
  const [error, setError] = useState({});
  const [cat, setCatData] = useState([]);
  const [cid, setCid] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [uid, setUid] = useState([]);

  const [loader, setLoader] = useState(false);
  const [cat_id, setId] = useState("");
  const [value, setValue] = useState({
    category: "" || uid.cat_id,
    title: "" || uid.title,
    slug: "" || uid.slug,
    description: "" || uid.description,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!selectedOption) {
      isValid = false;
      newErrors.category = "category is required";
    }
    if (!value.title) {
      isValid = false;
      newErrors.title = "title is required";
    }

    if (!value.slug) {
      isValid = false;
      newErrors.slug = "slug is required";
    }

    setError(newErrors);
    return isValid;
  };

  useEffect(() => {
    console.log(uid, "???");
    setValue({
      category: "" || uid.cat_id,
      title: "" || uid.title,
      slug: "" || uid.slug,
      description: "" || uid.description,
    });
  }, [uid]);

  async function getcatData() {
    axios
      .get(`${BASE_URL}/category_data`)
      .then((res) => {
        setCatData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getcatData();
  }, []);

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

  const handleCancel = (id) => {
    // Hide the confirmation dialog without performing the delete action
    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
  };

  const handleDelete = (id) => {
    const data = {
      cat_id: id,
    };

    axios
      .post(`${BASE_URL}/subcategory_delete`, data)
      .then((res) => {
        getsubcatData();
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
      const data = {
        title: value.title,
        description: value.description,
        slug: value.slug,
        user_id: decryptedUserId(),
        cat_id: cat_id,
        u_id: uid.id,
      };

      axios
        .post(`${BASE_URL}/add_subcategory`, data)
        .then((res) => {
          alert(res.data);
          getsubcatData();
          setLoader(false);
          // window.location.pathname = '/webapp/subcategory'

          setValue({
            category: "",
            title: "",
            slug: "",
            description: "",
          });

          setUid([]);
          setSelectedOption(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleslugclick = () => {
    axios
      .post(`${BASE_URL}/check_slug`, {
        slug:
          value.title &&
          value.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-"),
        table_name: "awt_subcategory",
      })
      .then((res) => {
        setValue({
          slug: res.data.newslug,
          title: value.title,
        });
      });
  };

  const onhandleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const HandleChange = (selectedValue) => {
    if (selectedValue) {
      console.log(selectedValue, "::::");
      const selectedId = selectedValue.id;
      setSelectedOption(selectedValue);
      // Now you have the selected id, you can use it in your application logic
      setId(selectedId);

      setValue((prevValue) => ({
        ...prevValue, // Copy the existing value object
        category: selectedId, // Update only the category property
      }));
    }
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
  const rowsWithIds = subcat.map((row, index) => ({
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredSubcategoryData = subcat.filter(subcategory => 
    subcategory.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                    <h4 class="card-title">Add SubCategory</h4>

                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                      <div class="form-group">
                        <label for="exampleInputUsername1">Category</label>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={cat}
                          size="small"
                          value={selectedOption}
                          getOptionLabel={(option) => option.title}
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
                          name="category"
                        />
                        {error.category && (
                          <span className="text-danger">{error.category}</span>
                        )}
                      </div>
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
                          onChange={onhandleChange} 
                        />
                        {error.title && (
                          <span className="text-danger">{error.title}</span>
                        )}
                      </div>
                      <div class="form-group">
                        <label for="exampleInputUsername1">
                          SubCategory Slug<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          onClick={handleslugclick}
                          class="form-control"
                          id="exampleInputUsername1"
                          value={value.slug}
                          name="slug"
                          onChange={onhandleChange}
                          placeholder="Enter.."
                        />
                        {error.slug && (
                          <span className="text-danger">{error.slug}</span>
                        )}
                      </div>

                      <div class="form-group ">
                        <label for="exampleTextarea1">Description</label>
                        <textarea
                          class="form-control"
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
                        <h4 class="card-title">SubCategory </h4>
                        <p class="card-description">List Of SubCategory</p>
                      </div>
                    </div>

                    <TextField
                      fullWidth
                      label="Search Subcategory"
                      variant="outlined"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      sx={{ marginBottom: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <div>
                      <DataGrid
                        sx={{width:"100%"}}
                        rows={filteredSubcategoryData.map((row, index) => ({ index: index + 1, ...row }))}
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

export default SubCategory;
