import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoleData } from "../Store/Role/role-action";
import decryptedUserId from "../Utils/UserID";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";
import Loader from "./Loader";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const GroupBreadcrum = () => {
  const [cat, setCatData] = useState([]);
  const [error, setError] = useState({});
  const [image, setImage] = useState();
  const [uid, setUid] = useState([]);
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [cid, setCid] = useState("");
  const [slug, setSlug] = useState();
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState({
    title: "" || uid.title,
    slug: "" || uid.slug,
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setValue({
      title: uid.title,
      slug: uid.slug,
    });
  }, [uid]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!value.title) {
      isValid = false;
      newErrors.title = "title is required";
    }

    if (!value.slug) {
      isValid = false;
      newErrors.slug = "slug is required";
    }
    if (uid.image == undefined && !image) {
      isValid = false;
      newErrors.logo = "image is required";
    }

    setError(newErrors);
    return isValid;
  };

  async function getcatData() {
    axios
      .get(`${BASE_URL}/group_data`)
      .then((res) => {
        console.log(res.data);
        setCatData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getcatData();
  }, []);


  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);
  };


  const handleUpdate = (id) => {
    setLoader(true);
    axios
      .post(`${BASE_URL}/group_update`, { u_id: id })
      .then((res) => {
        setUid(res.data[0]);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(value.title, "rrr");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formdata = new FormData();

      setLoader(true);
      formdata.append("title", value.title);
      formdata.append("slug", value.slug);
      if (image) {
        formdata.append("image", image);
      } else {
        formdata.append("image", uid.image);
      }
      formdata.append("user_id", decryptedUserId());
      formdata.append("u_id", uid.id);

      axios
        .post(`${BASE_URL}/group_breadcrumb_update`, formdata)
        .then((res) => {
          console.log(res.data);
          getcatData();

          setLoader(false);
          // window.location.pathname = '/webapp/group'

          setValue({
            title: "",
            slug: "",
          });

          setImage("");
          setUid([]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onhandleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (value.slug) {
      axios
        .post(`${BASE_URL}/check_againslug`, { slug: value.slug })
        .then((res) => {
          console.log(res);
        });
    }
  };

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

  const rowsWithIds = cat.map((row, index) => ({ index: index + 1, ...row }));

  const roledata = {
    role: Cookies.get(`role`),
    pageid: 16,
  };

  const dispatch = useDispatch();
  const roleaccess = useSelector(
    (state) => state.roleAssign?.roleAssign[0]?.accessid
  );

  useEffect(() => {
    dispatch(getRoleData(roledata));
  }, []);

  const handleslugclick = () => {
    axios
      .post(`${BASE_URL}/check_slug`, {
        slug:
          value.title &&
          value.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-"),
        table_name: "awt_group",
      })
      .then((res) => {
        setValue({
          slug: res.data.newslug,
          title: value.title,
        });
      });
  };

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter categories based on search query
  const filteredCat = cat.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div class="container-fluid page-body-wrapper position-relative col-lg-10">
      <InnerHeader />
      {loader && <Loader />}
      {roleaccess > 1 ? (
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
              <div class="col-lg-5 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Add Group Breadcrum</h4>

                    <form class="forms-sample py-3" onSubmit={handleSubmit}>
                      <div class="form-group">
                        <label for="exampleInputUsername1">
                          Title
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputUsername1"
                          value={value.title}
                          placeholder="Title"
                          name="title"
                          disabled
                          // onChange={onhandleChange}
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
                        <h4 class="card-title">Group Breadcrum </h4>
                        <p class="card-description">List Of Group Breadcrum</p>
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
                        rows={filteredCat.map((row, index) => ({ index: index + 1, ...row }))}
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
      ) : (
        <h1>No Access</h1>
      )}
    </div>
  );
};

export default GroupBreadcrum;
