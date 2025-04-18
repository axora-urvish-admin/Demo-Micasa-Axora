import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, IMG_URL } from "../../../AdminComponent/BaseUrl";
import custdecryptedUserId from "../../../Utils/CustUserid";
import ProfileSidebar from "../../Subcomponents/ProfileSidebar";
import Icon from "@mdi/react";
import { mdiFileEye } from "@mdi/js";
import { Link } from "react-router-dom";
import decryptedUserId from "../../../Utils/UserID";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ProfileOrder = () => {
  const [order, setOrder] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState({});
  const [orderid, setorderid] = useState([]);
  const [reason, setreason] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [reasonid, setreasonid] = useState();
  const [open, setOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  async function getOrderData() {
    const data = {
      user_id: custdecryptedUserId(),
    };
    axios.post(`${BASE_URL}/profile_order`, data).then((res) => {
      setOrder(res.data);
    });
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (reasonid == undefined) {
      isValid = false;
      newErrors.reason = "Please select the reason";
    }
    if (!selectedProducts || selectedProducts.length === 0) {
      isValid = false;
      newErrors.checkbox = "Please select the checkbox";
    }

    setError(newErrors);
    return isValid;
  };

  const handleIncrease = (id, pqty) => {
    setQuantities((prevMap) => ({
      ...prevMap,
      [id]: Math.min((prevMap[id] || 0) + 1, pqty), // Ensure value does not exceed pqty
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prevMap) => ({
      ...prevMap,
      [id]: Math.max((prevMap[id] || 0) - 1, 0), // Ensure value does not go below 0
    }));
  };

  const getcartdata = (orderid) => {
    setOpen(true);
    const data = {
      order_id: orderid,
    };

    axios.post(`${BASE_URL}/getcartData`, data).then((res) => {
      console.log(res);

      setCart(res.data);
    });
  };

  async function returnorderno() {
    const data = {
      user_id: custdecryptedUserId(),
    };
    axios.post(`${BASE_URL}/getreturnorderno`, data).then((res) => {
      setorderid(res.data);
    });
  }
  async function getreason() {
    axios.get(`${BASE_URL}/getreason`).then((res) => {
      setreason(res.data);
    });
  }

  useEffect(() => {
    getreason();
    returnorderno();
    getOrderData();
  }, []);

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(product)) {
        return prevSelectedProducts.filter((p) => p !== product);
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  };

  const handleSaveChanges = async () => {
    const selectedProductData = selectedProducts.map((product) => ({
      ...product,
      quantity: quantities[product.id] || 0,
    }));

    const order_id = selectedProducts.map((item) => item.orderid);

    if (validateForm()) {
      try {
        await axios.post(`${BASE_URL}/add_return_order`, {
          products: selectedProductData,
          order_id: order_id[0],
          user_id: custdecryptedUserId(),
          reasonid: reasonid,
        });
        returnorderno();
        getOrderData();
        setCart([]);
        setSelectedProducts([]);
        setOpen(false);
      } catch (error) {
        console.error("Error sending selected products to backend:", error);
      }
    }
  };

  const HandleReason = (selectedValue) => {
    if (selectedValue) {
      console.log(selectedValue.id);
      setreasonid(selectedValue.id);
    }
  };

  return (
    <div className="row p-5 " style={{marginTop:"5rem"}}>
      <div className="col-lg-4 col-md-4 col-12">
        <button
          className="btn d-md-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            marginBottom: "1rem",
            backgroundColor: "#000000",
            color: "#ffffff",
          }}
        >
          {sidebarOpen ? "Hide Menu" : "Show Menu"}
        </button>

        <div
          style={{
            display: sidebarOpen || window.innerWidth > 768 ? "block" : "none",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <ProfileSidebar />
        </div>
      </div>

      <div className="col-lg-8 col-md-10 col-sm-12 mx-auto">
        <div className="row">
          <div className="p-3">
            <h2>YOUR ORDERS :</h2>
          </div>
        </div>
        <div className="my-account-orders">
          {order.map((item) => {
            const timestamp = item.order_date;
            const date = new Date(timestamp);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = String(date.getFullYear()).slice();
            const formattedDate = `${day}-${month}-${year}`;

            return (
              <div className="card mb-3" key={item.id}>
                <div className="card-body">
                  <h6 className="card-title">Order# {item.orderno}</h6>
                  <p className="card-text">
                    <strong>Date Purchased:</strong> {formattedDate}
                  </p>
                  <p className="card-text">
                    <strong>Total:</strong> ₹{item.totalamt}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    {item.ostatus === "Delivered" ? (
                      <span className="text-success">Delivered</span>
                    ) : item.ostatus === "Dispatched" ? (
                      <span className="text-success">Dispatched</span>
                    ) : item.ostatus === "Cancelled" ? (
                      <span className="text-danger">Cancelled</span>
                    ) : item.ostatus === "Confirm" ? (
                      <span className="text-success">Confirmed</span>
                    ) : (
                      <span className="text-warning">Pending</span>
                    )}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {orderid.some((ele) => ele.orderid === item.id) ? (
                        <span>Processing..</span>
                      ) : (
                        <button
                          onClick={() => {
                            getcartdata(item.id);
                            setError({});
                          }}
                          className="btn btn-danger btn-sm"
                        >
                          Return
                        </button>
                      )}
                    </div>
                    <Link
                      to={`/profile/order/${item.id}`}
                      className="btn btn-info btn-sm"
                    >
                      <Icon path={mdiFileEye} size={1} />
                    </Link>

                    <BootstrapDialog
                      onClose={handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={open}
                    >
                      <DialogTitle
                        sx={{ m: 0, p: 2, width: "600px" }}
                        id="customized-dialog-title"
                      >
                        Modal title
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogContent dividers>
                        <table>
                          <thead>
                            <tr>
                              <th width="60%">Product</th>
                              <th width="30%">Qty</th>
                              <th width="10%">Select</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cart.map((item, index) => {
                              return (
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <img
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                        }}
                                        src={
                                          `${IMG_URL}/productimg/` + item.image1
                                        }
                                        className=""
                                        alt=""
                                      />
                                      <p className="p-2">{item.pname}</p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="quantity2">
                                      <button
                                        type="button"
                                        className="minus"
                                        onClick={() => handleDecrease(item.id)}
                                      >
                                        -
                                      </button>

                                      <input
                                        type="number"
                                        className="qty"
                                        step="1"
                                        min="0"
                                        max=""
                                        name="quantity"
                                        value={quantities[item.id] || 1}
                                        title="Qty"
                                        size="4"
                                        placeholder=""
                                        inputMode="numeric"
                                        autoComplete="off"
                                      />

                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleIncrease(item.id, item.pqty)
                                        }
                                        className="plus"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="">
                                      <input
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                        onChange={() =>
                                          handleCheckboxChange(item)
                                        }
                                      />
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                        <div class="">
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={reason}
                            InputLabelProps={{
                              shrink: true, // This makes the label move up when there's a value
                            }}
                            placeholder="brand"
                            getOptionLabel={(option) => option.title}
                            getOptionSelected={(option, value) =>
                              option.id === value.id
                            }
                            sx={{
                              width: "50%",
                              border: "none",
                              borderColor: "lightgrey",
                              borderRadius: "5px",
                            }}
                            renderInput={(params) => (
                              <TextField {...params} label="Select Reason" />
                            )}
                            onChange={(event, value) => HandleReason(value)}
                            name="vendor"
                          />
                          {error.reason && (
                            <p
                              className="text-danger float-right "
                              style={{ display: "block" }}
                            >
                              {error.reason}
                            </p>
                          )}

                          {error.checkbox && (
                            <span className="text-danger float-right">
                              {error.checkbox}
                            </span>
                          )}
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          sx={{ color: "#000" }}
                          autoFocus
                          onClick={handleSaveChanges}
                        >
                          Save changes
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>

                    {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th width="60%">Product</th>
                                                                            <th width="30%">Qty</th>
                                                                            <th width="10%">Select</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {cart.map((item, index) => {
                                                                            return (
                                                                                <tr>

                                                                                    <td>
                                                                                        <div className='d-flex align-items-center'>
                                                                                            <img style={{ width: "50px", height: "50px" }} src={`${IMG_URL}/productimg/` + item.image1} className="" alt="" />
                                                                                            <p className='p-2'>{item.pname}</p>
                                                                                        </div>

                                                                                    </td>
                                                                                    <td>
                                                                                        <div className="quantity2">
                                                                                            <button type="button" className="minus" onClick={() => handleDecrease(item.id)} >-</button>

                                                                                            <input type="number" className="qty" step="1" min="0" max="" name="quantity" value={quantities[item.id] || 1} title="Qty" size="4" placeholder="" inputMode="numeric" autoComplete="off" />

                                                                                            <button type="button" onClick={() => handleIncrease(item.id, item.pqty)
                                                                                            } className="plus">+</button>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <div class="">
                                                                                            <input type="checkbox" value="" id="flexCheckDefault" onChange={() => handleCheckboxChange(item)} />
                                                                                        </div>
                                                                                    </td>

                                                                                </tr>
                                                                            )
                                                                        })}

                                                                    </tbody>

                                                                </table>
                                                                <Autocomplete
                                                                    disablePortal
                                                                    id="combo-box-demo"
                                                                    options={reason}
                                                                    InputLabelProps={{
                                                                        shrink: true,  // This makes the label move up when there's a value
                                                                    }}

                                                                    placeholder="brand"
                                                                    getOptionLabel={(option) => option.title}
                                                                    getOptionSelected={(option, value) => option.id === value.id}
                                                                    sx={{ width: "50%", border: "none", borderColor: "lightgrey", borderRadius: "5px" }}
                                                                    renderInput={(params) => <TextField   {...params} label="Select Reason" />}
                                                                    onChange={(event, value) => HandleReason(value)}
                                                                    name="vendor"

                                                                />
                                                                {error.reason && <span className='text-danger'>{error.reason}</span>}
                                                            </div>
                                                            <div class="">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    id="combo-box-demo"
                                                                    options={reason}
                                                                    InputLabelProps={{
                                                                        shrink: true,  // This makes the label move up when there's a value
                                                                    }}

                                                                    placeholder="brand"
                                                                    getOptionLabel={(option) => option.title}
                                                                    getOptionSelected={(option, value) => option.id === value.id}
                                                                    sx={{ width: "50%", border: "none", borderColor: "lightgrey", borderRadius: "5px" }}
                                                                    renderInput={(params) => <TextField   {...params} label="Select Reason" />}
                                                                    onChange={(event, value) => HandleReason(value)}
                                                                    name="vendor"

                                                                />
                                                                {error.reason && <span className='text-danger'>{error.reason}</span>}
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button onClick={handleSaveChanges} type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                                                        </div>
                                                    </div>
                                                </div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileOrder;
