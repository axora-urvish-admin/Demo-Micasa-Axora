import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, IMG_URL } from '../AdminComponent/BaseUrl';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InnerHeader from "./InnerHeader";
import noimg from '../assets/images/noimg.jpg'
import chair from '../assets/images/chair.jpg'
import decryptedvendorid from "../Utils/Vendorid";
import { get } from "jquery";
const ProductCatalog = () => {
  const [product, setProductData] = useState([]);
  const [toggleValues, setToggleValues] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({ id: "", status: "" });

  const [image, setImg] = useState([]);
  async function getcatData() {
    const data ={
      vendor_id : decryptedvendorid()
    }

    axios
      .post(`${BASE_URL}/vendor_product_data`,data)

      .then((res) => {

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
    getcatData();
    getSigleImg()
  }, []);






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
  const handlestatus = (e,id,column) => {
    const value = e.target.value

    const data = {
        product_id: id,
        status: value,
        column:column
    }

    axios.post(`${BASE_URL}/product_status`, data)
        .then((res) => {
            console.log(res)
            // setProductData()
        })

}

  return (
    <div class="container-fluid page-body-wrapper">
      <InnerHeader />
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

                      {/* <Link to="/vendor/product/:update_id" ><button className=' btn btn-primary'>Add Product</button></Link> */}
                      <Link to="/vendor/addProduct/:update_id" ><button className=' btn btn-primary'>Add Product</button></Link>
                    </div>
                  </div>

                  <div class="table-responsive pt-3">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>
                            #
                          </th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Subcategory</th>
                          <th>Vendor Name</th>
                          <th>Price</th>
                          <th>Images</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {product.map((item, index) => {
                          return (
                            <tr>

                              <td>
                                {index + 1}
                              </td>
                              <td>{image.filter((ele) => ele.product_id == item.id).map((item) => { return (<img src={`${IMG_URL}/productimg/` + item.image1} alt="" />) })}  {image.filter((ele) => ele.product_id === item.id).length === 0 && (
                                <img src={noimg} alt="No" />
                              )}</td>
                              <td>{item.title}</td>
                              <td>{item.category}</td>
                              <td>{item.subcategory}</td>
                              <td>{item.vendor}</td>
                              <td>{item.price}</td>
                              <td><Link to={`/vendor/addimages/${item.id}`}><Button
                                color="primary"
                                disabled={false}
                                size="medium"
                                variant="outlined"
                              >Add</Button></Link></td>
                              <td>
                                {/* {" "}
                                <FormControlLabel
                                  control={<Android12Switch
                                    checked={item.approve === 1}
                                    onChange={() => toggleProductStatus(item.id, selectedProduct.status)}

                          />}
                                  
                                /> */}
                                {item.active == 1 ? <FormControlLabel
                                  control={<Android12Switch value="0" onChange={(e) =>handlestatus(e,item.id,"active") } defaultChecked />}
                                /> : <FormControlLabel
                                onChange={(e) =>handlestatus(e,item.id,"active") }
                                  value="1"
                                  control={<Android12Switch />}
                                />}
                              </td>
                              <td>
                                <Link to={`/vendor/product/${item.id}`}>
                                  <EditIcon />
                                </Link>
                                {/* <Link>
                                  <DeleteIcon  className="text-danger"/>
                                </Link> */}
                              </td>
                            </tr>
                          )
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

export default ProductCatalog;
