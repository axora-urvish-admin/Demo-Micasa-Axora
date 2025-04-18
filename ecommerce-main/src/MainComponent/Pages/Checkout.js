import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, IMG_URL } from "../../AdminComponent/BaseUrl";
import { Link, useNavigate, useParams } from "react-router-dom";
import custdecryptedUserId from "../../Utils/CustUserid";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Spinner from '../Ui/Spinner'
import { toast } from "react-toastify";
import { mdiCloseCircleOutline, mdiPencilOutline } from "@mdi/js";
import { Icon } from "@mui/material";
import '../../App.css';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Checkout = () => {
  const [state, setState] = useState([]);
  const [cart, setCart] = useState([]);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [token, settoken] = useState({});
  const [shipping, setshipping] = useState({});
  const [shippings, setshippings] = useState({});
  const [show, setshow] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [uid, setUid] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };





  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    country: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    postcode: "",
    orderNotes: "",
    mobile: "",
    gst: "",
    cname : "",

    sfirstname: "",
    slastname: "",
    scountry: "",
    saddress: "",
    slandmark: "",
    scity: "",
    sstate: "",
    spostcode: "",
    smobile: "",
  });

  
  console.log(value.cname , value.gst , "%%&%$#$%Y")


  const notify = () => toast("Profile updated successfully..");

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
    // Here you can do whatever you want with the selected value, like sending it to the server or performing some action.
  };

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
    // if (!value.country) {
    //   isValid = false;
    //   newErrors.country = "country is required";
    // }
    if (!value.address) {
      isValid = false;
      newErrors.address = "address is required";
    }
    if (!value.city) {
      isValid = false;
      newErrors.city = "city is required";
    }
    const mobileRegex = /^[0-9]{10}$/;

    if (!value.mobile) {
      isValid = false;
      newErrors.mobile = "Mobile is required";
    } else if (!mobileRegex.test(value.mobile)) {
      isValid = false;
      newErrors.mobile = "Mobile must be a 10-digit number";
    }

    if (!value.state) {
      isValid = false;
      newErrors.state = "state is required";
    }
    const pincodeRegex = /^\d{6}$/;

    if (!value.postcode) {
      isValid = false;
      newErrors.postcode = "Pincode is required";
    } else if (!pincodeRegex.test(value.postcode)) {
      isValid = false;
      newErrors.postcode = "Pincode must be exactly 6 digits";
    }


    if (!value.sfirstname) {
      isValid = false;
      newErrors.sfirstname = "firstname is required";
    }
    if (!value.slastname) {
      isValid = false;
      newErrors.slastname = "lastname is required";
    }
    // if (!value.scountry) {
    //   isValid = false;
    //   newErrors.scountry = "country is required";
    // }
    if (!value.saddress) {
      isValid = false;
      newErrors.saddress = "address is required";
    }
    if (!value.scity) {
      isValid = false;
      newErrors.scity = "city is required";
    }
    if (!value.sstate) {
      isValid = false;
      newErrors.sstate = "state is required";
    }
    const postcodeRegex = /^\d{6}$/;

    if (!value.spostcode) {
      isValid = false;
      newErrors.spostcode = "Postcode is required";
    } else if (!postcodeRegex.test(value.spostcode)) {
      isValid = false;
      newErrors.spostcode = "Postcode must be exactly 6 digits";
    }

    const smobileNumberRegex = /^\d{10}$/;
    if (!smobileNumberRegex.test(value.smobile)) {
      isValid = false;
      newErrors.smobile = "Invalid mobile no";
    }
    setErrors(newErrors);
    return isValid;
  };

  const Addressvalidate = () => {
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
    const pincodeRegex = /^\d{6}$/;

    if (!value.pincode) {
      isValid = false;
      newErrors.pincode = "Pincode is required";
    } else if (!pincodeRegex.test(value.pincode)) {
      isValid = false;
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }


    setErrors(newErrors);
    return isValid;
  };

  const { orderid } = useParams();

  async function getcartdata() {
    setLoader(true)
    const data = {
      order_id: orderid,
    };

    axios.post(`${BASE_URL}/getcartData`, data).then((res) => {
      console.log(res);
      setLoader(false)
      setCart(res.data);
    });
  }

  const vendor_id = cart.map((item) => item.v_id);
  let unique_vendor_id = [...new Set(vendor_id)].join(",");

  async function getState() {
    axios.get(`${BASE_URL}/state`).then((res) => {
      setState(res.data);
    });
  }
  async function api() {
    axios.post(`${BASE_URL}/api`).then((res) => {
      settoken(res.data.data);
    });
  }
  async function get_shipping_rate() {
    if (validateForm()) {
      setLoader(true)
      const data = {
        token: token,
        order_id: orderid,
        spincode: value.spostcode,
      };

      try {
        const response = await axios.post(
          `${BASE_URL}/get_shipping_rate`,
          data
        );
        const shippingRates = response.data.shippingRates;
        if (shippingRates && shippingRates.length > 0) {
          setLoader(false)
          const allRates = shippingRates.flatMap(
            (vendor) => vendor.rates?.data || []
          );
          const sortedRates = allRates.sort(
            (a, b) => a.total_charges - b.total_charges
          );
          const lowestRate = sortedRates[0];
          if (lowestRate) {
            setshipping(lowestRate.id); // Set the ID with the lowest total charges
            setshippings(lowestRate.total_charges); // Set the ID with the lowest total charges
            console.log(lowestRate.id);
            console.log(lowestRate.total_charges);
            setLoader(false)
          }
          setshow(true);
        }
      } catch (error) {
        console.error("Error fetching shipping rates:", error);
      }
    }
  }

  useEffect(() => {
    api();
    getState();
    getcartdata();
  }, []);

  const navigate = useNavigate();


  const onhandlesubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoader(true)
      const paydata = {
        user_id: localStorage.getItem("Name"),
        price: totalPrice,
        phone: "9326476448",
        name: custdecryptedUserId(),
      };
      const data = {
        firstname: value.firstname,
        lastname: value.lastname,
        country: value.country,
        address: value.address,
        landmark: value.landmark,
        city: value.city,
        state: value.state,
        postcode: value.postcode,
        orderNotes: value.orderNotes,
        mobile: value.mobile,
        vendor_id: unique_vendor_id,
        gst : value.gst,
        cname : value.cname,
        sfirstname: value.sfirstname || value.firstname,
        slastname: value.slastname || value.lastname,
        scountry: value.scountry || value.country,
        saddress: value.saddress || value.address,
        slandmark: value.slandmark || value.landmark,
        scity: value.scity || value.city,
        sstate: value.sstate || value.state,
        spostcode: value.spostcode || value.postcode,
        smobile: value.smobile || value.mobile,
        order_id: orderid,
        totalamt: totalPrice,
        paymode: selectedPayment,
        token: token,
        shippingid: shipping || '1',
        shippingamt: shippings || '200',
        user_id: custdecryptedUserId(),
      };


      console.log(data, "%%^&*")

      // ---?>  payment log




      selectedPayment != "cod" ? axios.post(`${BASE_URL}/payment`, paydata).then((res) => {

        localStorage.setItem('orderData', JSON.stringify(data));

        window.location.href = res.data.url;

      })






        : axios.post(`${BASE_URL}/place_order`, data).then((res) => {
          console.log(res);

          if (res.data) {
            alert("order placed");
            Cookies.remove(`orderid`);
            Cookies.set("orderno", res.data.orderno, { expires: 1 });
            setLoader(false)
            navigate("/payment-success");
          }
        });
    }
  };

  // alert(value.mobile)

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

  const addressSubmit = (e) => {
    e.preventDefault();
    if (Addressvalidate()) {
      // setLoader(true);
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
        setLoader(false);
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

  async function fetchAddress() {
    const data = {
      user_id: custdecryptedUserId(),
    };
    axios.post(`${BASE_URL}/fetch_address`, data).then((res) => {
      if (res.data.length !== 0) {
        setValue({
          firstname: res.data[0].firstname,
          lastname: res.data[0].lastname,
          country: res.data[0].country,
          address: res.data[0].address,
          city: res.data[0].city,
          state: res.data[0].state,
          postcode: res.data[0].pincode,
          mobile: res.data[0].mobile,
        });
      }
    });
  }

  useEffect(() => {
    fetchAddress();
  }, []);

  // const onhandlechange = async (e) => {
  //   await setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };
  const onhandlechange = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handlecheckbox = () => {
    setValue({
      firstname: value.firstname,
      lastname: value.lastname,
      country: value.country,
      address: value.address,
      city: value.city,
      state: value.state,
      mobile: value.mobile,
      postcode: value.postcode,
      gst : value.gst,
      cname : value.cname,
      sfirstname: value.firstname,
      slastname: value.lastname,
      scountry: 1,
      saddress: value.address,
      scity: value.city,
      sstate: value.state,
      spostcode: value.postcode,
      smobile: value.mobile,
    });
  };

  const totalPrice = cart.reduce((acc, item) => {
    const itemTotal = item.price * item.pqty; // Use 1 as default quantity if not
    return acc + itemTotal;
  }, 0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const handleDefault = (id) => {
    const data = {
      d_id: id,
      user_id: custdecryptedUserId(),
    };

    axios.post(`${BASE_URL}/update_default`, data).then((res) => {
      console.log(res);
      getAddressData();
      fetchAddress();
      closeModal();
    });
  };

  const handleCancel = (id) => {
    // Hide the confirmation dialog without performing the delete action
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

  return (
    <div>
      {loader && <Spinner />}
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div id="title" className="page-title">
              <div className="section-container">
                <div className="content-title-heading"></div>
                <div className="breadcrumbs">
                  <a href="index.html">Home</a>
                  <span className="delimiter"></span>
                  <a href="shop-grid-left.html">Shop</a>
                  <span className="delimiter"></span>Shopping Cart
                </div>
              </div>
            </div>

            <div id="content" className="site-content" role="main">
              <div className="section-padding">
                <div className="section-container p-l-r">
                  <div className="shop-checkout">
                    <form
                      name="checkout"
                      method="post"
                      className="checkout"
                      onSubmit={onhandlesubmit}
                      action=""
                      autocomplete="off"
                    >
                      <div className="row">
                        <div className="col-xl-8 col-lg-7 col-md-12 col-12">
                          <div className="row">
                            <div className="customer-details col-lg-6 col-md-6 col-12">
                              <div className="billing-fields">
                                <div className="d-flex justify-content-between">
                                  <h3
                                    className="bg-light text-dark"
                                    style={{
                                      fontSize: "17px",
                                      fontWeight: "bold",
                                      padding: "5px 10px",
                                    }}
                                  >
                                    Billing Details
                                  </h3>
                                  <h3
                                    type="button"
                                    className="bg-dark text-light"
                                    style={{
                                      fontSize: "17px",
                                      padding: "5px 10px",
                                      border: "none",
                                      borderRadius: "5px",
                                      cursor: "pointer",
                                    }}
                                    // onClick={handleClickOpen}
                                    onClick={openModal}
                                  >
                                    {/* Add Address + */}
                                    Change Address
                                  </h3>
                                </div>

                                <BootstrapDialog
                                  onClose={handleClose}
                                  aria-labelledby="customized-dialog-title"
                                  open={open}
                                >
                                  <DialogTitle
                                    sx={{ m: 0, p: 2 }}
                                    id="customized-dialog-title"
                                  >
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
                                    <form method="post">
                                      <div className="row">
                                        <div class="mb-3 col-lg-6">
                                          <label
                                            for="exampleFormControlInput1"
                                            class="form-label"
                                          >
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
                                            <span className="text-danger">
                                              {errors.firstname}
                                            </span>
                                          )}
                                        </div>
                                        <div class="mb-3 col-lg-6">
                                          <label
                                            for="exampleFormControlInput1"
                                            class="form-label"
                                          >
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
                                            <span className="text-danger">
                                              {errors.lastname}
                                            </span>
                                          )}
                                        </div>
                                        <div class="mb-3 col-lg-6">
                                          <label
                                            for="exampleFormControlInput1"
                                            class="form-label"
                                          >
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
                                            <span className="text-danger">
                                              {errors.email}
                                            </span>
                                          )}
                                        </div>
                                        <div class="mb-3 col-lg-6">
                                          <label
                                            for="exampleFormControlInput1"
                                            class="form-label"
                                          >
                                            Mobile
                                          </label>
                                          <input
                                            type="tel"
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder="Enter mobile"
                                            name="mobile"
                                            onChange={onhandlechange}
                                            value={value.mobile}
                                          />
                                          {errors.mobile && (
                                            <span className="text-danger">
                                              {errors.mobile}
                                            </span>
                                          )}
                                        </div>
                                        <div class="mb-3 col-lg-12">
                                          <label for="exampleTextarea1">
                                            Address
                                          </label>
                                          <textarea
                                            class="form-control"
                                            id="exampleTextarea1"
                                            rows="4"
                                            name="address"
                                            value={value.address}
                                            onChange={onhandlechange}
                                          ></textarea>
                                          {errors.address && (
                                            <div className="text-danger">
                                              {errors.address}
                                            </div>
                                          )}
                                        </div>
                                        <div class="mb-3 col-lg-4">
                                          <label for="exampleFormControlSelect1">
                                            State
                                          </label>
                                          <select
                                            class="form-control form-control-lg"
                                            id="exampleFormControlSelect1"
                                            value={value.state}
                                            onChange={onhandlechange}
                                            name="state"
                                          >
                                            <option selected>
                                              Select state
                                            </option>
                                            {state.map((item) => {
                                              return (
                                                <option value={item.id}>
                                                  {item.name}
                                                </option>
                                              );
                                            })}
                                          </select>
                                          {errors.state && (
                                            <div className="text-danger">
                                              {errors.state}
                                            </div>
                                          )}
                                        </div>
                                        <div class="mb-3 col-lg-4">
                                          <label
                                            for="exampleFormControlInput1"
                                            class="form-label"
                                          >
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
                                            <span className="text-danger">
                                              {errors.city}
                                            </span>
                                          )}
                                        </div>
                                        <div class="mb-3 col-lg-4">
                                          <label
                                            for="exampleFormControlInput1"
                                            class="form-label"
                                          >
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
                                            <span className="text-danger">
                                              {errors.pincode}
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={addressSubmit}
                                        className="button button-outline"
                                      >
                                        Add +
                                      </button>
                                    </form>
                                  </DialogContent>
                                  <DialogActions></DialogActions>
                                </BootstrapDialog>

                                <div className="billing-fields-wrapper">
                                  <div className="row">
                                    <p className="form-row form-row-first validate-required col-lg-6 col-md-6 col-12">
                                      <label>
                                        First name{" "}
                                        <span
                                          className="required"
                                          title="required"
                                        >
                                          *
                                        </span>
                                      </label>
                                      <span className="input-wrapper">
                                        <input
                                          type="text"
                                          className="input-text"
                                          name="firstname"
                                          value={value.firstname}
                                          onChange={onhandlechange}
                                        />
                                      </span>
                                      {errors.firstname && (
                                        <span className="text-danger">
                                          {errors.firstname}
                                        </span>
                                      )}
                                    </p>
                                    <p className="form-row form-row-last validate-required col-lg-6 col-md-6 col-12">
                                      <label>
                                        Last name{" "}
                                        <span
                                          className="required"
                                          title="required"
                                        >
                                          *
                                        </span>
                                      </label>
                                      <span className="input-wrapper">
                                        <input
                                          type="text"
                                          className="input-text"
                                          name="lastname"
                                          value={value.lastname}
                                          onChange={onhandlechange}
                                        />
                                      </span>
                                      {errors.lastname && (
                                        <span className="text-danger">
                                          {errors.lastname}
                                        </span>
                                      )}
                                    </p>
                                  </div>

                                  <div className="row ">
                                    <p className="form-row form-row-last validate-required col-lg-6 col-md-6 col-12">
                                      <label>
                                        Mobile{" "}
                                        <span
                                          className="required"
                                          title="required"
                                        >
                                          *
                                        </span>
                                      </label>
                                      <span className="input-wrapper">
                                        <input
                                          type="number"
                                          className="input-text"
                                          name="mobile"
                                          value={value.mobile}
                                          onChange={(e) => {
                                            if (e.target.value.length <= 10) {
                                              onhandlechange(e);
                                            }
                                          }}
                                          pattern="[0-9]{10}"
                                        />
                                      </span>
                                      {errors.mobile && (
                                        <span className="text-danger">
                                          {errors.mobile}
                                        </span>
                                      )}
                                    </p>

                                    <p className="form-row form-row-wide validate-required col-lg-6">
                                      <label>
                                        Country / Region
                                        <span
                                          className="required"
                                          title="required"
                                        >
                                          *
                                        </span>
                                      </label>
                                      <span className="input-wrapper">
                                        <select
                                          name="country"
                                          className="country-select custom-select"
                                          value={value.country}
                                          onChange={onhandlechange}
                                          style={{
                                            border: "none",
                                            borderBottom: "2px solid #d1cece",
                                            outline: "none",
                                            padding: "6px",
                                            width: "100%",
                                            background: "transparent",
                                          }}
                                        >
                                          {/* <option value="">
                                            Select a country / region…
                                          </option> */}
                                          <option value="1"> India</option>
                                        </select>
                                      </span>
                                      {errors.country && (
                                        <span className="text-danger">
                                          {errors.country}
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                  <p className="form-row address-field validate-required form-row-wide">

                                    <label>
                                      Address
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    {/* <button className="" style={{marginLeft:"15rem"}} onClick={openModal}>Change Address</button> */}

                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        value={value.address}
                                        className="input-text"
                                        name="address"
                                        placeholder="House number and street name"
                                        onChange={onhandlechange}
                                      />
                                    </span>

                                    {errors.address && (
                                      <span className="text-danger">
                                        {errors.address}
                                      </span>
                                    )}
                                  </p>
                                  <div className={`modal fade ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen}>
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <h5 className="modal-title" id="exampleModalLabel">Change Address</h5>
                                          <button type="button" className="close" onClick={closeModal} aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div className="modal-body">
                                          <div className="address-list" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                            {data.map((item) => (
                                              <div key={item.id} className="address-card border p-3 mb-3 rounded">
                                                <h6 className="address-title">{item.default === 1 ? "Default Address" : "Address"}</h6>
                                                <p className="address-details">{item.address}</p>
                                                <div className="d-flex justify-content-between">
                                                  <div>
                                                    {item.default === 1 ? (
                                                      <button className="btn btn-sm text-light rounded" style={{ background: "#76885B" }}>
                                                        Default
                                                      </button>
                                                    ) : (
                                                      <button onClick={() => handleDefault(item.id)} className="btn btn-sm text-dark rounded" style={{ background: "lightgrey" }}>
                                                        Set Default
                                                      </button>
                                                    )}
                                                  </div>
                                                  <div>
                                                    <Link onClick={() => handleUpdate(item.id)} className="btn btn-sm btn-primary mx-1">
                                                      Edit
                                                    </Link>
                                                    <Link onClick={() => handleClick(item.id)} className="btn btn-sm btn-danger mx-1">
                                                      Delete
                                                    </Link>
                                                  </div>
                                                </div>
                                                {confirmationVisibleMap[item.id] && (
                                                  <div className="mt-2">
                                                    <p>Are you sure you want to delete?</p>
                                                    <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">
                                                      OK
                                                    </button>
                                                    <button onClick={() => handleCancel(item.id)} className="btn btn-secondary btn-sm mx-2">
                                                      Cancel
                                                    </button>
                                                  </div>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        <div className="modal-footer">
                                          <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>



                                  <p className="form-row address-field form-row-wide">
                                    <label>
                                      Landmark&nbsp;
                                      <span className="optional">
                                        (optional)
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        name="landmark"
                                        placeholder="Apartment, suite, unit, etc. (optional)"
                                        onChange={onhandlechange}
                                      />
                                    </span>
                                  </p>
                                  <p className="form-row address-field validate-required form-row-wide">
                                    <label for="billing_city" className="">
                                      Town / City{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        value={value.city}
                                        name="city"
                                        onChange={onhandlechange}
                                      />
                                    </span>
                                    {errors.city && (
                                      <span className="text-danger">
                                        {errors.city}
                                      </span>
                                    )}
                                  </p>
                                  <div className="row">
                                    <p className="form-row address-field validate-required validate-state form-row-wide col-lg-6 col-6">
                                      <label>
                                        State{" "}
                                        <span
                                          className="required"
                                          title="required"
                                        >
                                          *
                                        </span>
                                      </label>
                                      <span className="input-wrapper">
                                        <select
                                          name="state"
                                          value={value.state}
                                          className="state-select custom-select"
                                          onChange={onhandlechange}
                                          style={{
                                            border: "none",
                                            borderBottom: "2px solid #d1cece",
                                            outline: "none",
                                            padding: "6px",
                                            width: "100%",
                                            background: "transparent",
                                          }}
                                        >
                                          <option value="">
                                            Select a state{" "}
                                          </option>
                                          {state.map((item) => {
                                            return (
                                              <option
                                                value={item.id}
                                                key={item.id}
                                              >
                                                {item.name}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </span>
                                      {errors.state && (
                                        <span className="text-danger">
                                          {errors.state}
                                        </span>
                                      )}
                                    </p>
                                    <p className="form-row address-field validate-required validate-postcode form-row-wide col-lg-6 col-6">
                                      <label>
                                        Postcode / ZIP{" "}
                                        <span
                                          className="required"
                                          title="required"
                                        >
                                          *
                                        </span>
                                      </label>
                                      <span className="input-wrapper">
                                        <input
                                          type="number"
                                          className="input-text"
                                          value={value.postcode}
                                          name="postcode"
                                          maxLength='6'
                                          onChange={(e) => {
                                            const inputValue = e.target.value;
                                            // Ensure the input is not longer than 6 characters
                                            if (inputValue.length <= 6) {
                                              onhandlechange(e);
                                            }
                                          }}
                                        />
                                      </span>
                                      {errors.postcode && (
                                        <span className="text-danger">
                                          {errors.postcode}
                                        </span>
                                      )}
                                    </p>
                                    <p className="form-row address-field validate-required validate-postcode form-row-wide col-lg-6 col-6">
                                      <label>
                                        Company Name

                                      </label>
                                      <span className="input-wrapper">
                                        <input
                                          type="text"
                                          className="input-text"
                                          name="cname"
                                          value={value.cname}
                                          onChange={onhandlechange}
                                        />
                                      </span>

                                    </p>
                                    <p className="form-row address-field validate-required validate-postcode form-row-wide col-lg-6 col-6">
                                      <label>
                                        GST No.
                                      </label>
                                      <span className="input-wrapper">
                                        <input
                                          type="text"
                                          className="input-text"
                                          name="gst"
                                          value={value.gst}
                                          onChange={onhandlechange}
                                        />
                                      </span>

                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="shipping-fields col-lg-6 col-md-6 col-12">
                              <div className="shipping-address">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h3
                                    className="bg-light text-dark"
                                    style={{
                                      fontSize: "17px",
                                      fontWeight: "bold",
                                      padding: "5px 10px",
                                    }}
                                  >
                                    Shipping Address
                                  </h3>
                                  <p className="form-row form-row-wide ship-to-different-address">
                                    <label className="checkbox d-flex align-items-center">
                                      <input
                                        className="input-checkbox"
                                        type="checkbox"
                                        name="ship_to_different_address"
                                        value="1"
                                        onChange={handlecheckbox}
                                      />
                                      <span>Same as a billing address</span>
                                    </label>
                                  </p>
                                </div>
                                <div className="row">
                                  <p className="form-row form-row-first validate-required col-lg-6 col-md-6 col-12">
                                    <label>
                                      First name{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        name="sfirstname"
                                        value={value.sfirstname}
                                        onChange={onhandlechange}
                                      />
                                    </span>
                                    {errors.sfirstname && (
                                      <span className="text-danger">
                                        {errors.sfirstname}
                                      </span>
                                    )}
                                  </p>
                                  <p className="form-row form-row-last validate-required col-lg-6 col-md-6 col-12">
                                    <label>
                                      Last name{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        name="slastname"
                                        value={value.slastname}
                                        onChange={onhandlechange}
                                      />
                                    </span>
                                    {errors.slastname && (
                                      <span className="text-danger">
                                        {errors.slastname}
                                      </span>
                                    )}
                                  </p>
                                </div>
                                <div className="row">
                                  <p className="form-row form-row-last validate-required col-lg-6 col-md-6 col-12">
                                    <label>
                                      Mobile{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="number"
                                        className="input-text"
                                        name="smobile"
                                        value={value.smobile}
                                        onChange={onhandlechange}
                                        pattern="[0-9]{10}"
                                      />
                                    </span>
                                    {errors.smobile && (
                                      <span className="text-danger">
                                        {errors.smobile}
                                      </span>
                                    )}
                                  </p>

                                  <p className="form-row form-row-wide address-field validate-required col-lg-6 col-md-6 col-12">
                                    <label for="shipping_country" className="">
                                      Country / Region{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <select
                                        name="scountry"
                                        defaultValue="1"
                                        className="state-select custom-select"
                                        value={value.scountry}
                                        onChange={onhandlechange}
                                        style={{
                                          border: "none",
                                          borderBottom: "2px solid #d1cece",
                                          outline: "none",
                                          padding: "6px",
                                          width: "100%",
                                          background: "transparent",
                                        }}
                                      >
                                        {/* <option value="">
                                          Select a country / region…
                                        </option> */}
                                        <option value="1" selected>
                                          India
                                        </option>
                                      </select>
                                    </span>
                                    {errors.scountry && (
                                      <span className="text-danger">
                                        {errors.scountry}
                                      </span>
                                    )}
                                  </p>
                                </div>
                                <p className="form-row address-field validate-required form-row-wide">
                                  <label>
                                    Address{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      className="input-text"
                                      name="saddress"
                                      placeholder="House number and street name"
                                      value={value.saddress}
                                      onChange={onhandlechange}
                                    />
                                  </span>
                                  {errors.saddress && (
                                    <span className="text-danger">
                                      {errors.saddress}
                                    </span>
                                  )}
                                </p>
                                <p className="form-row address-field form-row-wide">
                                  <label>
                                    Landmark &nbsp;
                                    <span className="optional">(optional)</span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      className="input-text"
                                      name="slandmark"
                                      placeholder="Apartment, suite, unit, etc. (optional)"
                                      value={value.slandmark}
                                      onChange={onhandlechange}
                                    />
                                  </span>
                                </p>
                                <p className="form-row address-field validate-required form-row-wide">
                                  <label>
                                    Town / City{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      className="input-text"
                                      name="scity"
                                      onChange={onhandlechange}
                                      value={value.scity}
                                    />
                                  </span>
                                  {errors.scity && (
                                    <span className="text-danger">
                                      {errors.scity}
                                    </span>
                                  )}
                                </p>
                                <div className="row">
                                  <p className="form-row address-field validate-required validate-state form-row-wide col-lg-6 col-6">
                                    <label>
                                      State{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <select
                                        name="sstate"
                                        className="state-select custom-select"
                                        value={value.sstate}
                                        onChange={onhandlechange}
                                        style={{
                                          border: "none",
                                          borderBottom: "2px solid #d1cece",
                                          outline: "none",
                                          padding: "6px",
                                          width: "100%",
                                          background: "transparent",
                                        }}
                                      >
                                        <option value="">
                                          Select a state{" "}
                                        </option>
                                        {state.map((item) => {
                                          return (
                                            <option
                                              value={item.id}
                                              key={item.id}
                                            >
                                              {item.name}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </span>
                                    {errors.sstate && (
                                      <span className="text-danger">
                                        {errors.sstate}
                                      </span>
                                    )}
                                  </p>
                                  <p className="form-row address-field validate-required validate-postcode form-row-wide col-lg-6 col-6">
                                    <label>
                                      Postcode / ZIP{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="number"
                                        className="input-text"
                                        name="spostcode"
                                        value={value.spostcode}
                                        maxLength='6'
                                        onChange={(e) => {
                                          const inputValue = e.target.value;
                                          // Ensure the input is not longer than 6 characters
                                          if (inputValue.length <= 6) {
                                            onhandlechange(e);
                                          }
                                        }}
                                      />
                                    </span>
                                    {errors.spostcode && (
                                      <span className="text-danger">
                                        {errors.spostcode}
                                      </span>
                                    )}
                                  </p>

                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="additional-fields">
                            <p className="form-row notes">
                              <label>
                                Order notes{" "}
                                <span className="optional">(optional)</span>
                              </label>
                              <span className="input-wrapper">
                                <textarea
                                  name="orderNotes"
                                  className="input-text"
                                  placeholder="Notes about your order, e.g. special notes for delivery."
                                  rows="2"
                                  cols="5"
                                  onChange={onhandlechange}
                                ></textarea>
                              </span>
                            </p>
                          </div>
                        </div>

                        {show ? (
                          <div className="col-xl-4 col-lg-5 col-md-12 col-12">
                            <div className="checkout-review-order">
                              <div className="checkout-review-order-table">
                                <div className="review-order-title bg-light text-dark">
                                  Product
                                </div>
                                <div className="cart-items">
                                  {cart.map((item) => {
                                    return (
                                      <div className="cart-item">
                                        <div className="info-product">
                                          <div className="product-thumbnail">
                                            <img
                                              width="600"
                                              height="600"
                                              src={
                                                `${IMG_URL}/productimg/` +
                                                item.image1
                                              }
                                              alt=""
                                            />
                                          </div>
                                          <div className="product-name">
                                            {item.pname}
                                            <strong className="product-quantity">
                                              QTY : {item.pqty}
                                            </strong>
                                          </div>
                                        </div>
                                        <div className="product-total">
                                          <span>₹{item.price}</span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="cart-subtotal">
                                  <h2>Subtotal</h2>
                                  <div className="subtotal-price">
                                    <span>₹{totalPrice}</span>
                                  </div>
                                </div>
                                {/* <div className="shipping-totals shipping">
                                  <h2>Shipping</h2>
                                  <div data-title="Shipping">
                                    <ul className="shipping-methods custom-radio">
                                      <li>
                                        <input
                                          type="radio"
                                          name="shipping_method"
                                          data-index="0"
                                          value="free_shipping"
                                          className="shipping_method"
                                          checked="checked"
                                        />
                                        <label>Free shipping</label>
                                      </li>
                        
                                    </ul>
                                  </div>
                                </div> */}
                                <div className="order-total">
                                  <h2>Total</h2>
                                  <div className="total-price">
                                    <strong>
                                      <span>₹{totalPrice}</span>
                                    </strong>
                                  </div>
                                </div>
                              </div>
                              <div id="payment" className="checkout-payment">
                                <ul className="payment-methods methods custom-radio">
                                  <li hidden className="payment-method">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="exampleRadios"
                                      id="exampleRadios1"
                                      value="bank-transfer"
                                      checked={
                                        selectedPayment === "bank-transfer"
                                      }
                                      onChange={handlePaymentChange}
                                      disabled
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="exampleRadios1"
                                    >
                                      Direct bank transfer
                                    </label>
                                    <div className="payment-box">
                                      <p>
                                        Make your payment directly into our bank
                                        account. Please use your Order ID as the
                                        payment reference. Your order will not
                                        be shipped until the funds have cleared
                                        in our account.
                                      </p>
                                    </div>
                                  </li>
                                  <li hidden className="payment-method">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="exampleRadios"
                                      id="exampleRadios2"
                                      value="check"
                                      checked={selectedPayment === "check"}
                                      onChange={handlePaymentChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="exampleRadios2"
                                    >
                                      Check payments
                                    </label>
                                    <div className="payment-box">
                                      <p>
                                        Please send a check to Store Name, Store
                                        Street, Store Town, Store State /
                                        County, Store Postcode.
                                      </p>
                                    </div>
                                  </li>
                                  {/* <li className="payment-method">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="exampleRadios"
                                      id="exampleRadios3"
                                      value="cod"
                                      checked={selectedPayment === "cod"}
                                      onChange={handlePaymentChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="exampleRadios3"
                                    >
                                      Cash on delivery
                                    </label>
                                    <div className="payment-box">
                                      <p>Pay with cash upon delivery.</p>
                                    </div>
                                  </li> */}
                                  <li className="payment-method">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="exampleRadios"
                                      id="exampleRadios4"
                                      value="paypal"
                                      checked={selectedPayment === "paypal"}
                                      onChange={handlePaymentChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="exampleRadios4"
                                    >
                                      Online
                                    </label>
                                    <div className="payment-box">
                                      <p>Pay via any UPI app or card.</p>
                                    </div>
                                  </li>
                                </ul>
                                <div className="form-row place-order">
                                  <div className="terms-and-conditions-wrapper">
                                    <div className="privacy-policy-text"></div>
                                  </div>
                                  <button
                                    type="submit"
                                    className="button alt"
                                    name="checkout_place_order"
                                    value="Place order"
                                  >
                                    Place order
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="col-xl-4 col-lg-5 col-md-12 col-12">
                            <div className="checkout-review-order">
                              <div className="checkout-review-order-table">
                                <div className="review-order-title">
                                  Product
                                </div>
                                <div className="cart-items">
                                  {cart.map((item) => {
                                    return (
                                      <div className="cart-item">
                                        <div className="info-product">
                                          <div className="product-thumbnail">
                                            <img
                                              width="600"
                                              height="600"
                                              src={
                                                `${IMG_URL}/productimg/` +
                                                item.image1
                                              }
                                              alt=""
                                            />
                                          </div>
                                          <div className="product-name">
                                            {item.pname}
                                            <strong className="product-quantity">
                                              QTY : {item.pqty}
                                            </strong>
                                          </div>
                                        </div>
                                        <div className="product-total">
                                          <span>₹{item.price}</span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="cart-subtotal">
                                  <h2>Subtotal</h2>
                                  <div className="subtotal-price">
                                    <span>₹{totalPrice}</span>
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={get_shipping_rate}
                                className="button alt w-100 p-2 bg-dark text-light"
                                name="checkout_place_order"
                                value="Place order"
                              >
                                Confirm Order
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </form>
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

export default Checkout;
