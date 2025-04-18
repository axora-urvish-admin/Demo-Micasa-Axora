import { mdiCloseCircleOutline, mdiPencilOutline } from "@mdi/js";
import Icon from "@mdi/react";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../../AdminComponent/BaseUrl";
import custdecryptedUserId from "../../../Utils/CustUserid";
import ProfileSidebar from "../../Subcomponents/ProfileSidebar";
import Spinner from "../../Ui/Spinner";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Address = () => {
  const [open, setOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState([]);
  const [uid, setUid] = useState([]);
  const [state, setState] = useState([]);
  const [errors, setErrors] = useState({});
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const [spinner, setspinner] = useState(false);
  const [value, setValue] = useState({
    email: "" || uid.email,
    firstname: "" || uid.firstname,
    lastname: "" || uid.lastname,
    mobile: "" || uid.mobile,
    address: "" || uid.address,
    state: "" || uid.state,
    city: "" || uid.city,
    pincode: "" || uid.pincode,
  });

  useEffect(() => {
    setValue({
      email: uid.email,
      firstname: uid.firstname,
      lastname: uid.lastname,
      mobile: uid.mobile,
      address: uid.address,
      state: uid.state,
      city: uid.city,
      pincode: uid.pincode,
    });
  }, [uid]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!value.firstname) {
      isValid = false;
      newErrors.firstname = "firstname is required";
    }
    if (!value.lastname) {
      isValid = false;
      newErrors.lastname = "lastname is required";
    }
    if (!value.email) {
      isValid = false;
      newErrors.email = "email is required";
    }

    const mobileNumberRegex = /^\d{10}$/;
    if (!mobileNumberRegex.test(value.mobile)) {
      isValid = false;
      newErrors.mobile = "Invalid mobile no";
    }
    if (!value.address) {
      isValid = false;
      newErrors.address = "address is required";
    }
    if (!value.state) {
      isValid = false;
      newErrors.state = "state is required";
    }
    if (!value.city) {
      isValid = false;
      newErrors.city = "state is required";
    }
    if (!value.pincode) {
      isValid = false;
      newErrors.pincode = "pincode is required";
    }

    setErrors(newErrors);
    return isValid;
  };
  // const handleChange = (event) => {
  //     setValue(event.target.value);
  // };

  async function getstate() {
    axios.get(`${BASE_URL}/state`).then((res) => {
      setState(res.data);
    });
  }

  const notify = () => toast("Profile updated successfully..");

  useEffect(() => {
    getstate();
  }, []);

  const onhandlechange = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDefault = (id) => {
    const data = {
      d_id: id,
      user_id: custdecryptedUserId(),
    };

    axios.post(`${BASE_URL}/update_default`, data).then((res) => {
      console.log(res);
      getAddressData();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setspinner(true);
      const data = {
        firstname: value.firstname,
        lastname: value.lastname,
        mobile: value.mobile,
        email: value.email,
        address: value.address,
        state: value.state,
        city: value.city,
        pincode: value.pincode,
        user_id: custdecryptedUserId(),
        u_id: uid.id,
      };

      axios.post(`${BASE_URL}/add_address`, data).then((res) => {
        getAddressData();
        setspinner(false);
        notify();
      });
    }
  };

  const handleUpdate = (id) => {
    axios
      .post(`${BASE_URL}/address_update`, { u_id: id })
      .then((res) => {
        setUid(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    handleClickOpen();
  };

  const handleDelete = (id) => {
    const data = {
      address_id: id,
      user_id: custdecryptedUserId(),
    };

    axios
      .post(`${BASE_URL}/address_delete`, data)
      .then((res) => {
        getAddressData();
      })

      .catch((err) => {
        console.log(err);
        getAddressData();
      });
    setConfirmationVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
  };

  const handleClick = (id) => {
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

  async function getAddressData() {
    const data = {
      user_id: custdecryptedUserId(),
    };

    axios
      .post(`${BASE_URL}/user_address_data`, data)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAddressData();
  }, []);

  return (
    <div className="row p-5" style={{ marginTop: "5rem" }}>
      {spinner && <Spinner />}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="col-lg-4 col-md-4 col-12">
        <button
          className="btn  d-md-none"
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
      <div className="col-lg-8 col-md-4 col-12">
        <div className="row">
          <div className="p-3">
            <h2>ADD ADRESS :</h2>
          </div>
        </div>

        <div className="my-2">
          <button
            onClick={handleClickOpen}
            type="button"
            className="button button-outline"
          >
            Add address +
          </button>
        </div>

        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Add address
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
            <form onSubmit={handleSubmit} method="post">
              <div className="row">
                <div class="mb-3 col-lg-6">
                  <label for="exampleFormControlInput1" class="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter first name"
                    name="firstname"
                    value={value.firstname}
                    onChange={onhandlechange}
                  />
                  {errors.firstname && (
                    <span className="text-danger">{errors.firstname}</span>
                  )}
                </div>
                <div class="mb-3 col-lg-6">
                  <label for="exampleFormControlInput1" class="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter Last name"
                    name="lastname"
                    value={value.lastname}
                    onChange={onhandlechange}
                  />
                  {errors.lastname && (
                    <span className="text-danger">{errors.lastname}</span>
                  )}
                </div>
                <div class="mb-3 col-lg-6">
                  <label for="exampleFormControlInput1" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={value.email}
                    placeholder="Enter email"
                    name="email"
                    onChange={onhandlechange}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>
                <div class="mb-3 col-lg-6">
                  <label for="exampleFormControlInput1" class="form-label">
                    Mobile
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter mobile"
                    name="mobile"
                    onChange={onhandlechange}
                    value={value.mobile}
                  />
                  {errors.mobile && (
                    <span className="text-danger">{errors.mobile}</span>
                  )}
                </div>
                <div class="mb-3 col-lg-12">
                  <label for="exampleTextarea1">Address</label>
                  <textarea
                    class="form-control"
                    id="exampleTextarea1"
                    rows="4"
                    name="address"
                    value={value.address}
                    onChange={onhandlechange}
                  ></textarea>
                  {errors.address && (
                    <div className="text-danger">{errors.address}</div>
                  )}
                </div>
                <div class="mb-3 col-lg-4">
                  <label for="exampleFormControlSelect1">State</label>
                  <select
                    class="form-control form-control-lg"
                    id="exampleFormControlSelect1"
                    value={value.state}
                    onChange={onhandlechange}
                    name="state"
                  >
                    <option selected>Select state</option>
                    {state.map((item) => {
                      return <option value={item.id}>{item.name}</option>;
                    })}
                  </select>
                  {errors.state && (
                    <div className="text-danger">{errors.state}</div>
                  )}
                </div>
                <div class="mb-3 col-lg-4">
                  <label for="exampleFormControlInput1" class="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter city"
                    name="city"
                    onChange={onhandlechange}
                    value={value.city}
                  />
                  {errors.city && (
                    <span className="text-danger">{errors.city}</span>
                  )}
                </div>
                <div class="mb-3 col-lg-4">
                  <label for="exampleFormControlInput1" class="form-label">
                    Pincode
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter mobile"
                    name="pincode"
                    onChange={onhandlechange}
                    value={value.pincode}
                  />
                  {errors.pincode && (
                    <span className="text-danger">{errors.pincode}</span>
                  )}
                </div>
              </div>

              <button type="submit" className="button button-outline">
                Add +
              </button>
            </form>
          </DialogContent>
          <DialogActions></DialogActions>
        </BootstrapDialog>

        <div className="tab-pane border" id="orders" role="tabpanel">
          <div className="my-account-orders">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th style={{ width: "70%" }}>Address</th>
                    <th>Default</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td
                          className="text-truncate"
                          style={{ maxWidth: "400px" }}
                        >
                          {item.address}
                        </td>
                        <td>
                          {item.default == 1 ? (
                            <button
                              className="btn btn-sm text-light rounded"
                              style={{ background: "#76885B" }}
                            >
                              Default
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDefault(item.id)}
                              className="btn btn-sm text-dark rounded"
                              style={{ background: "lightgrey" }}
                            >
                              Set Default
                            </button>
                          )}
                        </td>
                        <td>
                          <Link onClick={() => handleUpdate(item.id)}>
                            <Icon path={mdiPencilOutline} size={1} />
                          </Link>
                          <Link onClick={() => handleClick(item.id)}>
                            <Icon path={mdiCloseCircleOutline} size={1} />
                          </Link>
                        </td>
                        {confirmationVisibleMap[item.id] && (
                          <div className="">
                            <p>Are you sure you want to delete?</p>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-dark text-light rounded"
                            >
                              OK
                            </button>
                            <button
                              onClick={() => handleCancel(item.id)}
                              className="mx-2 rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Address;
