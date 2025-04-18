import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import InnerHeader from "./InnerHeader";

const Productapprovalview = () => {
  const [order, setOrder] = useState([]);
  const { productid } = useParams();
  const [productimg, setProductimg] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Lux");


  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    updateProductluxe(event.target.value);
  };

  const updateProductluxe = (luxe) => {
    const data = {
      product_luxe: luxe,
      product_id: productid,
    };

    axios.post(`${BASE_URL}/add_lux`, data)
      .then((response) => {
        console.log(response);
        alert("Product luxe updated successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("Error updating product luxe");
      });
  };

  async function getProductDetails() {
    const data = {
      product_id: productid,
    };
    axios.post(`${BASE_URL}/product_details`, data).then((res) => {
      setOrder(res.data[0]);
    });
  }

  async function getProductimgData() {
    const data = {
      product_id: productid,
    };

    axios
      .post(`${BASE_URL}/product_img_data`, data)
      .then((res) => {
        console.log(res.data);
        setProductimg(res.data[0].images);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProductDetails();
    getProductimgData();
  }, []);

  const handleapprove = () => {
    const userConfirmed = window.confirm("Are you sure you want to approve?");

    const data = {
      product_id: productid,
    };
    if (userConfirmed) {
      axios.post(`${BASE_URL}/approve_product`, data).then((res) => {
        if (res.data) {
          alert("Approved successfully");
        }
      });
    }
  };

  console.log(productimg,"%%")

  return (
    <div class="container-fluid page-body-wrapper col-lg-10">
      <div class="main-panel">
        <InnerHeader />
        <div class="content-wrapper">
          <div class="row">
            <div className="col-lg-12">
              <div class="card " style={{ height: "250px" }}>
                <div class="card-head">
                  <div class="card-head-label ">
                    <h3 class="card-head-title" style={{ fontSize: "1.1rem" }}>
                      <InfoIcon /> Product information
                    </h3>
                  </div>
                  <div>
                    <h3
                      className="card-head-title"
                      style={{ fontSize: "1.1rem" }}
                    >
                      Vendor Name :{" "}
                      <span className="text-success">{order.vendor}</span>
                    </h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div class="card-body">
                      <ul
                        class="list-stats"
                        style={{ paddingLeft: "0", width: "200px" }}
                      >
                        <li class="">
                          <span class="lable">Product name:</span>
                          &nbsp;
                          <span class="value">
                            <b>{order.title} </b>
                          </span>
                        </li>
                        <li class="w-200 py-1">
                          <span class="lable">Group:</span>
                          &nbsp;{" "}
                          <span class="value">
                            <b>{order.group_name}</b>
                          </span>
                        </li>
                        <li class="py-1">
                          <span class="lable">Category:</span>
                          &nbsp;{" "}
                          <span class="value">
                            <b>{order.category}</b>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div class="card-body">
                      <ul
                        class="list-stats"
                        style={{ paddingLeft: "0", width: "200px" }}
                      >
                        <li class="">
                          <span class="lable">SubCategory:</span>
                          &nbsp;
                          <span class="value">
                            <b>{order.subcategory}</b>
                          </span>
                        </li>
                        <li class="w-200 py-1">
                          <span class="lable">Brand:</span>
                          &nbsp;{" "}
                          <span class="value">
                            <b>{order.brand}</b>
                          </span>
                        </li>
                        {/* <li class="py-1">
                          <span class="lable">Mobile:</span>
                          &nbsp; <span class="value"><b>93264789</b></span>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div class="card-body">
                      <ul
                        class="list-stats"
                        style={{ paddingLeft: "0", width: "200px" }}
                      >
                        <li class="">
                          <span class="lable">Price:</span>
                          &nbsp;
                          <span class="value">
                            <b>{order.price}</b>
                          </span>
                        </li>
                        <li class="w-200 py-1">
                          <span class="lable">Discounted Price:</span>
                          &nbsp;{" "}
                          <span class="value">
                            <b>{order.disc_price}</b>
                          </span>
                        </li>
                        {/* <li class="py-1">
                          <span class="lable">Mobile:</span>
                          &nbsp; <span class="value"><b>93264789</b></span>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-12 grid-margin stretch-card mt-3">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">List Of Images</h4>
                  <div class="table-responsive pt-3">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th width="60%">Image</th>
                          <th width="20%">Color Name</th>
                          <th width="20%">Color </th>
                        </tr>
                      </thead>

                      <tbody>
                        {productimg.map((item, index) => {
                          return (
                            <tr className="product-img-table">
                              <td>{index + 1}</td>
                              <td>
                              <img
                                    src={`${IMG_URL}/productimg/` + item}
                                    alt=""
                                  />
                              </td>


                              <td>{item.title}</td>
                              <td>
                                <input type="color" value={item.colorcode} />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* <select className="btn btn-primary float-start" style={{ backgroundColor: "#007bff", color: "white", borderColor: "#007bff" }} value={selectedValue} onChange={handleSelectChange}>
                    <option selected>Lux</option>
                    <option value="Yes">YES</option>
                    <option value="NO">NO</option>
                  </select> */}
                  <select class="form-control  btn" style={{width:'10%'}} value={selectedValue} onChange={handleSelectChange}>
                    <option selected>Lux</option>
                    <option value="Yes">YES</option>
                    <option value="NO">NO</option>
                  </select>


                  <button
                    className="btn btn-danger float-right"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Not Approve
                  </button>
                  <button
                    className="btn btn-success float-right mx-2"
                    onClick={() => handleapprove()}
                  >
                    Approve
                  </button>
                </div>

                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Add Message
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="form-floating">
                          {/* <label for="floatingTextarea2">Comments</label> */}
                          <textarea
                            class="form-control"
                            placeholder="Leave a Message here"
                            id="floatingTextarea2"
                            style={{ height: "200px" }}
                          ></textarea>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Send message
                        </button>
                      </div>
                    </div>
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

export default Productapprovalview;
