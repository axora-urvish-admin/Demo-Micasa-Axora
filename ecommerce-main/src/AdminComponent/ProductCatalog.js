import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InnerHeader from "./InnerHeader";
import noimg from "../assets/images/noimg.jpg";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getRoleData } from "../Store/Role/role-action";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const ProductCatalog = () => {
  const [product, setProductData] = useState([]);
  const [image, setImg] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  async function getcatData() {
    axios
      .get(`${BASE_URL}/product_data`)
      .then((res) => {
        // console.log(res.data);
        setProductData(res.data);
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
    getSigleImg();
    getcatData();
  }, []);

  const handlestatus = (e, id, column) => {
    const value = e.target.value;

    const data = {
      product_id: id,
      status: value,
      column: column,
    };

    axios.post(`${BASE_URL}/product_status`, data).then((res) => {
      // console.log(res)
      // setProductData()
    });
  };

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

  const roledata = {
    role: Cookies.get(`role`),
    pageid: 10,
  };

  const dispatch = useDispatch();
  const roleaccess = useSelector(
    (state) => state.roleAssign?.roleAssign[0]?.accessid
  );

  useEffect(() => {
    dispatch(getRoleData(roledata));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0); // Reset to first page
  // };

  // Calculate the current rows to display
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = product.slice(startIndex, endIndex);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on search query
  const filteredProducts = product.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div class="container-fluid page-body-wrapper col-lg-10">
      <InnerHeader />
      {roleaccess > 1 ? (
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h4 class="card-title">Products </h4>
                        <p class="card-description">List Of Products</p>
                      </div>
                      <div>
                        <TextField
                          label="Search Product"
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
                        {roleaccess > 3 && (
                          <Link to="/webapp/product/:update_id">
                            <button className=" btn btn-primary">
                              Add Product
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>

                    <div class="table-responsive pt-3">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Vendor Name</th>
                            <th>Price</th>
                            <th>Images</th>
                            <th>Tags</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredProducts.map((item, index) => {
                            return (
                              <tr key={item.id}>
                                <td>{startIndex + index + 1}</td>
                                <td>
                                  {image
                                    .filter((ele) => ele.product_id == item.id)
                                    .map((item) => {
                                      return (
                                        <img
                                          src={
                                            `${IMG_URL}/productimg/` +
                                            item.image1
                                          }
                                          alt=""
                                        />
                                      );
                                    })}{" "}
                                  {image.filter(
                                    (ele) => ele.product_id === item.id
                                  ).length === 0 && (
                                    <img src={noimg} alt="No" />
                                  )}
                                </td>

                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td>{item.subcategory}</td>
                                <td>{item.vendor}</td>
                                <td>{item.price}</td>
                                {roleaccess >= 2 && (
                                  <td>
                                    <Link
                                      to={`/webapp/addimages/${item.id}/${item.title}`}
                                    >
                                      <Button
                                        color="primary"
                                        disabled={false}
                                        size="medium"
                                        variant="outlined"
                                      >
                                        Add
                                      </Button>
                                    </Link>
                                  </td>
                                )}
                                {roleaccess >= 2 && (
                                  <td>
                                    <Link
                                      to={`/webapp/addtags/${item.id}/${item.title}`}
                                    >
                                      <Button
                                        color="primary"
                                        disabled={false}
                                        size="medium"
                                        variant="outlined"
                                      >
                                        Add
                                      </Button>
                                    </Link>
                                  </td>
                                )}

                                <td>
                                  {item.active == 1 ? (
                                    <FormControlLabel
                                      control={
                                        <Android12Switch
                                          value="0"
                                          onChange={(e) =>
                                            handlestatus(e, item.id, "active")
                                          }
                                          defaultChecked
                                          disabled={roleaccess < 3}
                                        />
                                      }
                                    />
                                  ) : (
                                    <FormControlLabel
                                      onChange={(e) =>
                                        handlestatus(e, item.id, "active")
                                      }
                                      value="1"
                                      control={
                                        <Android12Switch
                                          disabled={roleaccess < 3}
                                        />
                                      }
                                    />
                                  )}
                                </td>
                                <td>
                                  <Link to={`/webapp/product/${item.id}`}>
                                    <EditIcon />
                                  </Link>
                                  {/* <Link>
                                  <DeleteIcon  className="text-danger"/>
                                </Link> */}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button 
                          onClick={() => handleChangePage(null, page - 1)}
                          disabled={page === 0}
                        ><i class="bi bi-chevron-left"></i>
                          Previous
                        </button>
                        <span style={{marginLeft:"7px"}}>{`Page ${page + 1}`}</span>
                        <button style={{marginLeft:"7px"}}
                          onClick={() => handleChangePage(null, page + 1)}
                          disabled={endIndex >= product.length}
                        >
                          Next
                          <i class="bi bi-chevron-right"></i>
                        </button>
                        {/* <select style={{marginLeft:"7px"}}
                          onChange={handleChangeRowsPerPage}
                          value={rowsPerPage}
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                        </select> */}
                      </div>
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

export default ProductCatalog;
