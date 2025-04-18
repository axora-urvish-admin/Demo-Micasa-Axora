import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MenuIcon from "@mui/icons-material/Menu";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { Autocomplete, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import decryptedUserId from "../Utils/UserID";
import img1 from "../assets/images/product_default_image.jpg";

import InnerHeader from "./InnerHeader";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, IMG_URL } from "../AdminComponent/BaseUrl";
import decryptedvendorid from "../Utils/Vendorid";
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
const Product = () => {
  const [cat, setCatData] = useState([]);
  const [subcat, setsubcategory] = useState([]);
  const [catid, selectedcatId] = useState("");
  const [subcatid, selectedsubcatId] = useState("");
  const [selectedOptionCat, setSelectedCat] = useState(null);
  const [selectedOptionSub, setSelectedSub] = useState(null);


  const [error, setError] = useState({});
  const [collection, setCollection] = useState([]);
  const [collectionid, setCollectionID] = useState([]);
  const [selectedOptionCollection, setSelectedOptionCollection] = useState(null);
  const [group, setGroupData] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedOptionvendor, setSelectedVendor] = useState(null);
  const [selectedOptionBrand, setSelectedBrand] = useState(null);

  const [vendor, setVendorData] = useState([]);
  const [uid, setUid] = useState([]);
  const [brand, setBrand] = useState([]);
  const [groupid, selectedgroupId] = useState("");
  const [brand_id, selectedBrandId] = useState("");
  const [vendor_id, selectedVendorId] = useState("");
  const [loader, setLoader] = useState(false);
  const [hasPrice, setHasPrice] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("company");
  const navigate = useNavigate();

  const [value, setValue] = useState({
    sizeimage: "" || `${IMG_URL}/sizechart/` + uid.size_image,
    title: "" || uid.title,
    price: "" || uid.price,
    discountedprice: "" || uid.disc_price,
    description: "" || uid.description,
    slug: "" || uid.slug,
    gst: "" || uid.gst,
    customize: "" || uid.customizable,
    length: "" || uid.length,
    breadth: "" || uid.breadth,
    height: "" || uid.height,
    no_of_box: "" || uid.no_of_box,
    shipping_time: "" || uid.shipping_time,
    tracking_no: "" || uid.tracking_no,
    courier_name: "" || uid.courier_name,
    weight: "" || uid.weight,
    hsn_code: "" || uid.hsn_code,
    lbh_unit: "" || uid.lbh_unit,
    weight_unit: "" || uid.weight_unit,
  });

  useEffect(() => {
    setValue({
      sizeimage: `${IMG_URL}/sizechart/` + uid.size_image,
      title: uid.title,
      price: uid.price,
      discountedprice: uid.disc_price,
      description: uid.description,
      slug: uid.slug,
      gst: uid.gst,
      customize: uid.customizable,
      length: uid.length,
      breadth: uid.breadth,
      height: uid.height,
      no_of_box: uid.no_of_box,
      shipping_time: uid.shipping_time,
      tracking_no: uid.tracking_no,
      courier_name: uid.courier_name,
      weight: uid.weight,
      hsn_code: uid.hsn_code,
      lbh_unit: uid.lbh_unit,
      weight_unit: uid.weight_unit,
    });
  }, [uid]);

  const [sizeimage, setSizeImage] = useState();
  const [specification, setSpecification] = useState();
  const { update_id } = useParams();

  // console.log(value.sizeimage, "000")
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!catid) {
      isValid = false;
      newErrors.category = "category is required";
    }
    if (!groupid) {
      isValid = false;
      newErrors.group = "group is required";
    }

    if (!value.title) {
      isValid = false;
      newErrors.title = "title is required";
    }
    if (!value.slug) {
      isValid = false;
      newErrors.slug = "slug is required";
    }

    if (!selectedOptionBrand) {
      isValid = false;
      newErrors.brand = "brand is required";
    }
    if (!selectedOptionvendor) {
      isValid = false;
      newErrors.vendor = "vendor is required";
    }
    // if (!value.price) {
    //   isValid = false;
    //   newErrors.price = "price is required";
    // }
    if (!value.gst) {
      isValid = false;
      newErrors.gst = "gst is required";
    }

    if (!value.length) {
      isValid = false;
      newErrors.length = "Length is required";
    }
    if (!value.height) {
      isValid = false;
      newErrors.height = "Height is required";
    }
    if (!value.lbh_unit) {
      isValid = false;
      newErrors.lbh_unit = "This is required";
    }
    if (!value.weight_unit) {
      isValid = false;
      newErrors.weight_unit = "This is required";
    }
    if (!value.weight) {
      isValid = false;
      newErrors.weight = "Weight is required";
    }
    if (!value.no_of_box) {
      isValid = false;
      newErrors.no_of_box = "This is required";
    }
    if (!value.shipping_time) {
      isValid = false;
      newErrors.shipping_time = "This is required";
    }
    if (!value.tracking_no) {
      isValid = false;
      newErrors.tracking_no = "This is required";
    }
    if (!value.courier_name) {
      isValid = false;
      newErrors.courier_name = "This is required";
    }
    if (!value.customize) {
      isValid = false;
      newErrors.customize = "This is required";
    }
    if (!value.breadth) {
      isValid = false;
      newErrors.breadth = "Breadth is required";
    }

    setError(newErrors);
    return isValid;
  };

  async function getcollectionData() {
    axios
      .get(`${BASE_URL}/collection_data`)
      .then((res) => {
        // console.log(res.data);
        setCollection(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }




  useEffect(() => {
    getcollectionData();
  }, []);

  const setCustomizeValue = (data) => {
    setValue((prevValue) => ({
        ...prevValue,
        customize: data.customizable === '1' ? 'Yes' : 'No', 
    }));
};


  async function getUpdateData() {
    setLoader(true);
    axios
      .post(`${BASE_URL}/product_update`, { u_id: update_id })
      .then((res) => {
        setLoader(false);
        console.log("Fetched Data:", res.data[0]);
        setUid(res.data[0]);

        setCustomizeValue(res.data[0]);
       setHasPrice(res.data[0].isdiscounted)
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  
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
      alert("Status Changed")
    });
  };

  async function getGroupData() {
    axios
      .get(`${BASE_URL}/group_data`)
      .then((res) => {
        // console.log(res.data)
        setGroupData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const basic_info = () => {
    const section = document.getElementById("basic_info");
    section.scrollIntoView({ behavior: "smooth" });
  };
  // const media = () => {
  //   const section = document.getElementById('#');
  //   section.scrollIntoView({ behavior: 'smooth' });
  // };
  const varients = () => {
    const section = document.getElementById("varients");
    section.scrollIntoView({ behavior: "smooth" });
  };
  const specifications = () => {
    const section = document.getElementById("specification");
    section.scrollIntoView({ behavior: "smooth" });
  };
  const tax = () => {
    const section = document.getElementById("tax");
    section.scrollIntoView({ behavior: "smooth" });
  };

  async function getBrandData() {
    axios
      .get(`${BASE_URL}/Brand_data`)
      .then((res) => {
        // console.log(res.data)
        setBrand(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getVendordata() {
    axios
      .get(`${BASE_URL}/vendor_data`)
      .then((res) => {
        // console.log(res.data)
        setVendorData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getCatData() {
    axios
      .get(`${BASE_URL}/category_data`)
      .then((res) => {
        setCatData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getsubcatData() {
    axios
      .get(`${BASE_URL}/subcategory_data`)
      .then((res) => {
        setsubcategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (update_id !== ":update_id") {
      getUpdateData();
      setHasPrice("yes");
    }
 
    getGroupData();
    getBrandData();
    getVendordata();
    getCatData();
    getsubcatData();
    getcollectionData();
  }, [update_id]);

  const handlePriceChange = (e) => {
    const priceValue = e.target.value;
    setValue((prev) => ({ ...prev, price: priceValue }));
  };

  const handleDiscountedPriceChange = (e) => {
    const discountedPriceValue = e.target.value;
    setValue((prev) => ({ ...prev, discountedprice: discountedPriceValue }));
  };

  const handleHasPriceChange = (e) => {
    setHasPrice(e.target.value);
    if (e.target.value === "no") {
      setValue((prev) => ({ ...prev, price: "" }));
    }
  };

  const handleSelectShipping = (e) => {
    setSelectedShipping(e.target.value);
  };

  const onhandleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const HandleVendorChange = (selectedValue) => {
    if (selectedValue) {
      const vendorid = selectedValue.id;
      setSelectedVendor(selectedValue);
      selectedVendorId(vendorid);
    }
  };

  useEffect(() => {
    if (uid.v_id) {
      const selected = vendor.find((option) => option.id === uid.v_id);
      setSelectedVendor(selected);
      selectedVendorId(uid.v_id);
    }
  }, [uid, vendor, vendor_id]);

  // console.log(vendor_id,"dd")

  const HandleBrandChange = (selectedValue) => {
    if (selectedValue) {
      const brandid = selectedValue.id;
      setSelectedBrand(selectedValue);
      selectedBrandId(brandid);
    }
  };

  useEffect(() => {
    if (uid.b_id) {
      const selected = brand.find((option) => option.id === uid.b_id);
      setSelectedBrand(selected);
      selectedBrandId(uid.b_id);
    }
  }, [uid, brand, brand_id]);


  const HandlesubcatChange = (selectedValue) => {
    if (selectedValue) {
      const subcatid = selectedValue.id;
      selectedsubcatId(subcatid);
      setSelectedSub(selectedValue);
    }
  };
  useEffect(() => {
    if (uid.scatid) {
      const selected = subcat.find((option) => option.id === uid.scatid);
      setSelectedSub(selected);
      selectedsubcatId(uid.scatid);
    }
  }, [uid, subcat]);


  const HandleCollectionChange = (selectedValue) => {
    if (selectedValue) {
      const subcollectionid = selectedValue.id;
      setCollectionID(subcollectionid);
      setSelectedOptionCollection(selectedValue);
    }
  };

  useEffect(() => {
    // console.log("UID:", uid);
    // console.log("Collection:", collection);
    if (uid.coll_id) {
      const selected = collection.find((option) => option.id === uid.coll_id);
      // console.log("Selected Collection:", selected);
      setSelectedOptionCollection(selected);
      setCollectionID(uid.coll_id);
    }
  }, [uid, collection]);

  const HandleGroupChange = (selectedValue) => {
    const val = selectedValue.id;

    selectedgroupId(val);
    setSelectedGroup(selectedValue);
    // setSelectedSub();
    // setsubcategory([]);

    const data = {
      groupid: val,
    };

    axios
      .post(`${BASE_URL}/getcategory_data`, data)
      .then((res) => {
        // console.log(res.data)
        setCatData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {

    if (uid.groupid) {
      const selected = group.find((option) => option.id === uid.groupid);
      setSelectedGroup(selected);
      selectedgroupId(uid.groupid);
    }
  }, [uid, group]);

  // const HandleCatChange = (selectedValue) => {
  //   const val = selectedValue.id;
  //   setSelectedCat(selectedValue);
  //   selectedId(val);
  //   const data = {
  //     catid: val,
  //   };

  //   axios
  //     .post(`${BASE_URL}/getsubcategory`, data)
  //     .then((res) => {
  //       // console.log(res.data)
  //       setsubcategory(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const HandleCatChange = (selectedValue) => {
    if (selectedValue) {
      const catid = selectedValue.id;
      selectedcatId(catid);
      setSelectedCat(selectedValue);
    }
  };

  useEffect(() => {
    if (uid.catid) {
      const selected = cat.find((option) => option.id === uid.catid);
      setSelectedCat(selected);
      selectedcatId(uid.catid);
    }
  }, [uid, cat]);

  async function ImageBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

    return data;
  }

  const handlesizeimage = async (e) => {
    const file = e.target.files[0];
    setSizeImage(file);
    // setHide(true)

    const data = await ImageBase64(e.target.files[0]);
    setValue((prev) => {
      return {
        ...prev,
        sizeimage: data,
      };
    });
  };



  
  const handlesubmit = (e) => {
    e.preventDefault();
    
    // Clear previous errors
    const errors = {};
  
    // Check the selected shipping method
    if (selectedShipping === "company") {
      // Validate fields for company shipping
      if (!value.lbh_unit) {
        errors.lbh_unit = "LBH Unit is required.";
      }
      if (!value.length) {
        errors.length = "Length is required.";
      }
      if (!value.breadth) {
        errors.breadth = "Breadth is required.";
      }
      if (!value.height) {
        errors.height = "Height is required.";
      }
      if (!value.weight_unit) {
        errors.weight_unit = "Weight Unit is required.";
      }
      if (!value.weight) {
        errors.weight = "Weight is required.";
      }
      if (!value.no_of_box) {
        errors.no_of_box = "Number of Boxes is required.";
      }
      if (!value.shipping_time) {
        errors.shipping_time = "Shipping Time is required.";
      }
    } else if (selectedShipping === "self") {
      // Validate fields for self shipping
      if (!value.courier_name) {
        errors.courier_name = "Courier Name is required.";
      }
      if (!value.tracking_no) {
        errors.tracking_no = "Tracking Number is required.";
      }
    }
  
    // If there are errors, set the error state and return
    if (Object.keys(errors).length > 0) {
      setError(errors); // Assuming you have a state to hold errors
      return;
    }
  
    setLoader(true);
    const formdata = new FormData();
    formdata.append("uid", uid.id);
  
    if (update_id === ":update_id") {
      formdata.append("v_id", decryptedvendorid());
      formdata.append("b_id", brand_id);
      formdata.append("subcatid", subcatid);
      formdata.append("catid", catid);
      formdata.append("groupid", groupid);
      formdata.append("collectionid", collectionid);
    } else {
      formdata.append("v_id", decryptedvendorid());
      formdata.append("b_id", brand_id);
      formdata.append("catid", catid);
      formdata.append("groupid", groupid);
      formdata.append("subcatid", subcatid);
      formdata.append("collectionid", collectionid);
    }
  
    formdata.append("title", value.title);
    formdata.append("customizable", value.customize);
    formdata.append("isdiscounted", hasPrice);
    formdata.append("slug", value.slug);
    formdata.append("price", value.price);
    formdata.append("d_price", value.discountedprice);
    formdata.append("description", value.description);
    formdata.append("gst", value.gst);
    formdata.append("hsn_code", value.hsn_code);
    formdata.append("shipping_option", selectedShipping);
    
    // Append fields based on the selected shipping method
    if (selectedShipping === "company") {
      formdata.append("lbh_unit", value.lbh_unit);
      formdata.append("length", value.length);
      formdata.append("height", value.height);
      formdata.append("breadth", value.breadth);
      formdata.append("weight_unit", value.weight_unit);
      formdata.append("weight", value.weight);
      formdata.append("no_of_box", value.no_of_box);
      formdata.append("shipping_time", value.shipping_time);
    } else if (selectedShipping === "self") {
      formdata.append("tracking_no", value.tracking_no);
      formdata.append("courier_name", value.courier_name);
    }
  
    formdata.append("sizeimage", sizeimage);
    formdata.append("specification", specification);
    formdata.append("user_id", decryptedvendorid());
  
    axios.post(`${BASE_URL}/add_product`, formdata).then((res) => {
      setLoader(false);
      // alert(res.data);
      alert("The data Successfully");
      navigate("/vendor/productcatalog");

    }).catch((error) => {
      setLoader(false);
      console.error("There was an error submitting the form!", error);
    });
  };

  const handleslugclick = () => {
    axios
      .post(`${BASE_URL}/check_slug`, {
        slug:
          value.title &&
          value.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-"),
        table_name: "awt_add_product",
      })
      .then((res) => {
        setValue({
          slug: res.data.newslug,
          title: value.title,
        });
      });
  };

  return (
    <div className="container-fluid page-body-wrapper col-lg-10">
      {loader && <Loader />}
      <InnerHeader />
      <div className="main-panel">
        <div className="content-wrapper">
          <h4 className="card-title">Add Product</h4>
          <form onSubmit={handlesubmit}>
            <div className="row">
              <div className="col-lg-3 grid-margin stretch-card">
                <div className="sticky-top">
                  <div className="card" style={{ height: "600px" }}>
                    <div className="card-body list">
                      <ul className="prod_list">
                        <li className="prod_li">
                          <a onClick={basic_info} className="prod_flex">
                            <div style={{ marginRight: "8px" }}>
                              <DescriptionOutlinedIcon />
                            </div>
                            <div>
                              <h5>Basic Details</h5>
                              <span className="weight para">
                                Manage the product's basic information.
                              </span>
                            </div>
                          </a>
                        </li>
                        <hr></hr>

                        {/* <li className="prod_li">
                          <a  className="prod_flex">
                            <div style={{ marginRight: "8px" }}>
                              <PermMediaIcon />
                            </div>
                            <div>
                              <h5>Media</h5>
                              <span className="weight para">
                                {" "}
                                Manage your product's image gallery.{" "}
                              </span>
                            </div>
                          </a>
                        </li> */}
                        <li className="prod_li">
                          <a onClick={varients} className="prod_flex">
                            <div style={{ marginRight: "8px" }}>
                              <MenuIcon />
                            </div>
                            <div>
                              <h5>Size Chart</h5>
                              <span className="weight para">
                                Upload a image of size of your product.
                              </span>
                            </div>
                          </a>
                        </li>
                        <hr></hr>
                        <li className="prod_li">
                          <a onClick={specifications} className="prod_flex">
                            <div style={{ marginRight: "8px" }}>
                              <DescriptionOutlinedIcon />
                            </div>
                            <div>
                              <h5>Specifications</h5>
                              <span className="weight para">
                                Manage the product-related specifications.
                              </span>
                            </div>
                          </a>
                        </li>
                        <hr></hr>
                        <li className="prod_li">
                          <a onClick={tax} className="prod_flex">
                            <div style={{ marginRight: "8px" }}>
                              <LocalShippingIcon />
                            </div>
                            <div>
                              <h5>Shipping</h5>
                              <span className="weight para">
                                Set up the shipping information of the product.
                              </span>
                            </div>
                          </a>
                        </li>
                        <hr></hr>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-6 grid-margin stretch-card"
                style={{ display: "block" }}
              >
                <div>
                  <h3>Add Product</h3>
                  <p className="para">Fields with (*) are mandatory</p>
                </div>
                <div className="card" id="basic_info">
                  <div
                    className="card-head"
                    style={{ borderBottom: "1px solid gray", padding: "15px" }}
                  >
                    <h5
                      style={{
                        color: "#000000DE",
                        fontSize: "20px",
                        margin: "0",
                      }}
                    >
                      Basic Information
                    </h5>
                    <p className="para">
                      Manage the product's basic information.
                    </p>
                  </div>
                  <div className="card-body" style={{ padding: "20px 10px" }}>
                    <div className="col-md-12">
                      <div className="row">
                    
                        <div className="col-md-12 ">
                          <div className="form-group ">
                            <label htmlFor="prod_id">
                              Product title
                              <span className="text-danger">*</span>
                              {error.title && (
                                <span className="text-danger">
                                  {error.title}
                                </span>
                              )}
                            </label>

                            <div>
                              <TextField
                                id="outlined-basic"
                                InputLabelProps={{
                                  shrink: true, // This makes the label move up when there's a value
                                }}
                                label="Enter product title.."
                                value={value.title}
                                sx={{ width: "100%" }}
                                variant="outlined"
                                name="title"
                                onChange={onhandleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 ">
                          <div className="form-group ">
                            <label htmlFor="prod_id">
                              slug
                              <span className="text-danger">*</span>
                              {error.slug && (
                                <span className="text-danger">
                                  {error.slug}
                                </span>
                              )}
                            </label>

                            <div>
                              <TextField
                                id="outlined-basic"
                                InputLabelProps={{
                                  shrink: true, // This makes the label move up when there's a value
                                }}
                                label="Enter product title.."
                                onClick={handleslugclick}
                                value={value.slug}
                                sx={{ width: "100%" }}
                                variant="outlined"
                                name="slug"
                                onChange={onhandleChange}
                              />
                            </div>
                          </div>
                        </div>

                        {/* <div className="row ">
                        <div className="col-md-12 py-3">
                          <div className="form-group ">
                            <label htmlFor="prod_id">
                              Product identifier
                              <span className="text-danger">*</span>
                            </label>

                            <input
                              type="text"
                              className="form-control"
                              id="prod_id"
                              placeholder="Product Title"
                              name="title"
                              onChange={onhandleChange}

                            />
                        
                          </div>

                        </div>

                       </div> */}

                        <div className="col-md-6 ">
                          <div className="form-group ">
                            <label htmlFor="category">
                              Brand<span className="text-danger">*</span>
                              {error.brand && (
                                <span className="text-danger">
                                  {error.brand}
                                </span>
                              )}
                            </label>
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={brand}
                              value={selectedOptionBrand}
                              placeholder="brand"
                              getOptionLabel={(option) => option.title}
                              getOptionSelected={(option, value) =>
                                option.id === value.id
                              }
                              sx={{
                                width: "100%",
                                border: "none",
                                borderColor: "lightgrey",
                                borderRadius: "5px",
                                height: "20px",
                              }}
                              renderInput={(params) => (
                                <TextField {...params} label="Select Brand" />
                              )}
                              onChange={(event, value) =>
                                HandleBrandChange(value)
                              }
                              name="brand"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 ">
                          <div className="form-group ">
                            <label htmlFor="category">
                              Group<span className="text-danger">*</span>
                              {error.group && (
                                <span className="text-danger">
                                  {error.group}
                                </span>
                              )}
                            </label>
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={group}
                              value={selectedGroup}
                              placeholder="Group"
                              getOptionLabel={(option) => option.title}
                              getOptionSelected={(option, value) =>
                                option.id === value.id
                              }
                              sx={{
                                width: "100%",
                                border: "none",
                                borderColor: "lightgrey",
                                borderRadius: "5px",
                                height: "20px",
                              }}
                              renderInput={(params) => (
                                <TextField {...params} label="Select Group" />
                              )}
                              onChange={(event, value) =>
                                HandleGroupChange(value)
                              }
                              name="group"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group ">
                            <label htmlFor="category">
                              Category<span className="text-danger">*</span>
                              {error.category && (
                                <span className="text-danger">
                                  {error.category}
                                </span>
                              )}
                            </label>
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={cat}
                              value={selectedOptionCat}
                              getOptionLabel={(option) => option.title}
                              getOptionSelected={(option, value) =>
                                option.id === value.id
                              }
                              sx={{
                                width: "100%",
                                border: "none",
                                borderColor: "lightgrey",
                                borderRadius: "5px",
                                height: "20px",
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select Category"
                                />
                              )}
                              onChange={(event, value) =>
                                HandleCatChange(value)
                              }
                              name="category"
                            />
                          </div>
                        </div>

                        <div
                          className="col-md-6 "
                          style={{ paddingTop: "30px" }}
                        >
                          <div className="form-group ">
                            <label htmlFor="prod_id">
                              SubCategory<span className="text-danger">*</span>
                              {error.subcategory && (
                                <span className="text-danger">
                                  {error.subcategory}
                                </span>
                              )}
                            </label>
                            <div></div>
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={subcat}
                              value={selectedOptionSub}
                              getOptionLabel={(option) => option.title}
                              getOptionSelected={(option, value) =>
                                option.id === value.id
                              }
                              sx={{
                                width: "100%",
                                border: "none",
                                borderColor: "lightgrey",
                                borderRadius: "5px",
                                height: "20px",
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select Subcategory"
                                />
                              )}
                              onChange={(event, value) =>
                                HandlesubcatChange(value)
                              }
                              name="subcategory"
                            />
                          </div>
                        </div>
                        <div
                          className="col-md-6 "
                          style={{ paddingTop: "30px" }}
                        >
                          <div className="form-group ">
                            <label htmlFor="prod_id">
                              Customizable<span className="text-danger">*</span>
                              {error.customize && (
                                <span className="text-danger">
                                  {error.customize}
                                </span>
                              )}
                            </label>
                            <div></div>
                            <FormControl
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Select
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // label="Age"
                                name="customize"
                                value={value.customize || `1`}
                                onChange={onhandleChange} 
                              >
                                <MenuItem value={`1`}>Yes</MenuItem>
                                <MenuItem value={`2`}>No</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </div>

                        <div className="col-md-6 ">
                          <div className="form-group ">
                            <label htmlFor="prod_id">
                              Collection<span className="text-danger">*</span>
                              {error.collection && (
                                <span className="text-danger">
                                  {error.collectionid}
                                </span>
                              )}
                            </label>
                            <div></div>
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={collection}
                              value={selectedOptionCollection}
                              getOptionLabel={(option) => option.title}
                              getOptionSelected={(option, value) =>
                                option.id === value.id
                              }
                              sx={{
                                width: "100%",
                                border: "none",
                                borderColor: "lightgrey",
                                borderRadius: "5px",
                                height: "20px",
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select Collection"
                                />
                              )}
                              onChange={(event, value) =>
                                HandleCollectionChange(value)
                              }
                              name="collection"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group ">
                            <label htmlFor="slug">
                              Add gst % <span className="text-danger">*</span>{" "}
                            </label>
                            {error.gst && (
                              <span className="text-danger">{error.gst}</span>
                            )}
                            <div>
                              <TextField
                                label="Enter percentage.."
                                InputLabelProps={{
                                  shrink: true, // This makes the label move up when there's a value
                                }}
                                value={value.gst}
                                variant="outlined"
                                sx={{ width: "100%" }}
                                type="number"
                                name="gst"
                                onChange={onhandleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group ">
                            <label htmlFor="slug">
                              Hsn_code <span className="text-danger">*</span>
                              {error.hsn_code && (
                                <span className="text-danger">
                                  {error.hsn_code}
                                </span>
                              )}{" "}
                            </label>

                            <div>
                              <TextField
                                label="Enter code.."
                                InputLabelProps={{
                                  shrink: true, // This makes the label move up when there's a value
                                }}
                                value={value.hsn_code}
                                variant="outlined"
                                sx={{ width: "100%" }}
                                type="text"
                                name="hsn_code"
                                onChange={onhandleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 ">
                          <div className="form-group">
                            <label>
                              Do you have a discount price?
                              <span className="text-danger">*</span>
                            </label>
                            <FormControl
                              variant="outlined"
                              sx={{ width: "100%" }}
                            >
                              <InputLabel id="has-price-label">
                                Select
                              </InputLabel>
                              <Select
                                labelId="has-price-label"
                                value={hasPrice}
                                onChange={handleHasPriceChange}
                                label="Select"
                              >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </div>

                        {hasPrice === "yes" && (
                          <div className="row" style={{ marginLeft: "3.6rem" }}>
                            <div className="col-md-6">
                              <div className="form-group ">
                                <label htmlFor="name">
                                  Price
                                  {error.price && (
                                    <span className="text-danger">
                                      {error.price}
                                    </span>
                                  )}
                                </label>

                                <div>
                                  <TextField
                                    id="outlined-basic"
                                    InputLabelProps={{
                                      shrink: true, // This makes the label move up when there's a value
                                    }}
                                    label="Enter price.."
                                    value={value.price}
                                    sx={{ width: "100%" }}
                                    variant="outlined"
                                    type="number"
                                    name="price"
                                    onChange={handlePriceChange}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group ">
                                <label htmlFor="slug">Discounted Price </label>
                                <div>
                                  <TextField
                                    label="Enter price.."
                                    InputLabelProps={{
                                      shrink: true, // This makes the label move up when there's a value
                                    }}
                                    value={value.discountedprice}
                                    variant="outlined"
                                    sx={{ width: "100%" }}
                                    type="number"
                                    name="discountedprice"
                                    onChange={handleDiscountedPriceChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {hasPrice === "no" && (
                          <div
                            className="form-group"
                            style={{ marginLeft: "12rem" }}
                          >
                            <label>Price</label>
                            <TextField
                              label="Enter price.."
                              value={value.discountedprice}
                              sx={{ width: "100%" }}
                              variant="outlined"
                              type="number"
                              name="discountedprice"
                              onChange={handleDiscountedPriceChange}
                            />
                          </div>
                        )}

                        <div className="col-md-12">
                          <div className="form-group ">
                            <label htmlFor="description">Description</label>
                            <textarea
                              className="form-control"
                              id="description"
                              rows="4"
                              value={value.description}
                              name="description"
                              onChange={onhandleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mt-3" id="varients">
                  <div
                    className="card-head"
                    style={{ padding: "20px 22px 0px" }}
                  >
                    <h5
                      style={{
                        color: "#000000DE",
                        fontSize: "20px",
                        margin: "0",
                      }}
                    >
                      Size Chart Upload (Image)
                    </h5>
                    <p className="para">Manage your product's image gallery.</p>
                  </div>

                  <div className="card-body" style={{ padding: "20px 10px" }}>
                    <div className="col-md-12">
                      <ul
                        className="uploaded-stocks ui-sortable"
                        id="productDefaultImagesJs"
                      >
                        <li className="browse unsortableJs">
                          <div>
                            <strong> Upload images(s)</strong>
                            <span className="text-muted form-text">
                              Png,jpeg accepted
                            </span>
                          </div>
                          <input
                            type="file"
                            style={{ zIndex: "100" }}
                            placeholder="new"
                            onChange={handlesizeimage}
                          />
                        </li>
                        <li className="unsortableJs">
                          <div
                            className="uploaded-stocks-item"
                            data-ratio="1:1"
                          >
                            <img
                              className="uploaded-stocks-img"
                              data-bs-toggle="tooltip"
                              data-placement="top"
                              src={
                                value.sizeimage == "" ? img1 : value.sizeimage
                              }
                              title=""
                              alt=""
                              data-bs-original-title=""
                            ></img>
                            <div className="uploaded-stocks-actions"></div>
                          </div>
                        </li>
                      </ul>
                      <p className="para">Preferred Dimensions 1500 x 1500</p>
                    </div>

                    {error.sizeimage && (
                      <span className="text-danger">{error.sizeimage}</span>
                    )}
                  </div>
                </div>

                <div className="card mt-3" id="specification">
                  <div
                    className="card-head"
                    style={{ padding: "20px 22px 0px" }}
                  >
                    <h5
                      style={{
                        color: "#000000DE",
                        fontSize: "20px",
                        margin: "0",
                      }}
                    >
                      Specifications
                    </h5>
                    <p className="para">
                      Manage the product-related specifications.
                    </p>
                  </div>
                  <div style={{ width: "100%", padding: "20px 22px " }}>
                    <CKEditor
                      editor={ClassicEditor}
                      data={uid.specification}
                      onReady={(editor) => {
                        // Allows you to store the editor instance and use it later.
                        // console.log('Editor is ready to use!', editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setSpecification(data);
                      }}
                      onBlur={(event, editor) => {
                        // console.log('Blur.', editor);
                      }}
                      onFocus={(event, editor) => {
                        // console.log('Focus.', editor);
                      }}
                    />
                  </div>
                </div>

                <div className="card mt-3" id="tax">
                  <div
                    className="card-head"
                    style={{ padding: "20px 22px 0px" }}
                  >
                    <h5
                      style={{
                        color: "#000000DE",
                        fontSize: "20px",
                        margin: "0",
                      }}
                    >
                      Shipping
                    </h5>

                    <select
                      className="form-select mb-2"
                      onChange={handleSelectShipping}
                      value={selectedShipping}
                    >
                      <option value="" disabled selected>
                        Choose an option
                      </option>
                      <option value="company">company</option>
                      <option value="self">Self</option>
                    </select>
                  </div>

                  <div className="card-body" style={{ padding: "20px 10px" }}>
                    {selectedShipping === "company" ? (
                      <div className="col-md-12">
                        <div className="row" style={{ background: "#f1f1f1" }}>
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label htmlFor="category">
                                Lbh Unit<span className="text-danger">*</span>
                                {error.lbh_unit && (
                                  <span className="text-danger">
                                    {error.lbh_unit}
                                  </span>
                                )}
                              </label>
                              <select
                                className="form-control"
                                id="tx_category"
                                value={value.lbh_unit}
                                name="lbh_unit"
                                onChange={onhandleChange}
                              >
                                <option value="">Select Unit</option>
                                <option value="inch">Inch</option>
                                <option value="cm">Cm</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group ">
                              <label htmlFor="category">
                                Length<span className="text-danger">*</span>
                                {error.length && (
                                  <span className="text-danger">
                                    {error.length}
                                  </span>
                                )}
                              </label>
                              <input
                                type="number"
                                onChange={onhandleChange}
                                className="form-control"
                                value={value.length}
                                name="length"
                                placeholder="Enter length"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group ">
                              <label htmlFor="category">
                                Breadth<span className="text-danger">*</span>
                                {error.breadth && (
                                  <span className="text-danger">
                                    {error.breadth}
                                  </span>
                                )}
                              </label>
                              <input
                                type="number"
                                onChange={onhandleChange}
                                className="form-control"
                                value={value.breadth}
                                name="breadth"
                                placeholder="Enter breadth"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group ">
                              <label htmlFor="category">
                                Height<span className="text-danger">*</span>
                                {error.height && (
                                  <span className="text-danger">
                                    {error.height}
                                  </span>
                                )}
                              </label>
                              <input
                                type="number"
                                onChange={onhandleChange}
                                className="form-control"
                                value={value.height}
                                name="height"
                                placeholder="Enter height"
                              />
                            </div>
                          </div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label htmlFor="category">
                                Weight Unit
                                <span className="text-danger">*</span>
                                {error.weight_unit && (
                                  <span className="text-danger">
                                    {error.weight_unit}
                                  </span>
                                )}
                              </label>
                              <select
                                className="form-control"
                                value={value.weight_unit}
                                onChange={onhandleChange}
                                name="weight_unit"
                              >
                                <option value=""> Select Unit</option>
                                <option value="kg">Kg</option>
                                <option value="lbs">Lbs</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group ">
                              <label htmlFor="weight">
                                Weight<span className="text-danger">*</span>
                                {error.weight && (
                                  <span className="text-danger">
                                    {error.weight}
                                  </span>
                                )}
                              </label>
                              <input
                                type="number"
                                onChange={onhandleChange}
                                className="form-control"
                                value={value.weight}
                                name="weight"
                                placeholder="Enter weight"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group ">
                              <label htmlFor="no_of_box">
                                Number of Boxes
                                <span className="text-danger">*</span>
                                {error.no_of_box && (
                                  <span className="text-danger">
                                    {error.no_of_box}
                                  </span>
                                )}
                              </label>
                              <input
                                type="number"
                                onChange={onhandleChange}
                                className="form-control"
                                value={value.no_of_box}
                                name="no_of_box"
                                placeholder="Enter number of boxes"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group ">
                              <label htmlFor="shipping_time">
                                Shipping Time
                                <span className="text-danger">*</span>
                                {error.shipping_time && (
                                  <span className="text-danger">
                                    {error.shipping_time}
                                  </span>
                                )}
                              </label>
                              <input
                                type="text"
                                onChange={onhandleChange}
                                className="form-control"
                                value={value.shipping_time}
                                name="shipping_time"
                                placeholder="Enter shipping time"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : selectedShipping === "self" ? (
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="courier_name">
                            Courier Name<span className="text-danger">*</span>
                            {error.courier_name && (
                              <span className="text-danger">
                                {error.courier_name}
                              </span>
                            )}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={value.courier_name}
                            onChange={onhandleChange}
                            name="courier_name"
                            placeholder="Enter courier name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="tracking_no">
                            Tracking No<span className="text-danger">*</span>
                            {error.tracking_no && (
                              <span className="text-danger">
                                {error.tracking_no}
                              </span>
                            )}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={value.tracking_no}
                            onChange={onhandleChange}
                            name="tracking_no"
                            placeholder="Enter tracking number"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-lg-3 grid-margin stretch-card">
                <div className="">
                  <div className="card" style={{ height: "300px" }}>
                    <div
                      className="card-body "
                      style={{ padding: "1.4rem 0.875rem" }}
                    >
                      <button
                        type="submit"
                        className="btn btn-brand btn-block submitBtnJs"
                        style={{ borderRadius: "0" }}
                      >
                        Save
                      </button>
                      {window.location.pathname.match(
                        /^\/webapp\/product\/\d+$/
                      ) && (
                        <div className="mt-3">
                          <div className="form-group">
                            <div className="setting-block">
                              <div>
                                <label
                                  htmlFor=""
                                  className="switch switch-sm switch-icon"
                                >
                                  Activate it
                                </label>
                              </div>
                              <div>
                                {isNaN(update_id) && (
                                  <FormControlLabel
                                    control={<Android12Switch disabled />}
                                  />
                                )}
                                {uid.active == 1 && (
                                  <FormControlLabel
                                    control={
                                      <Android12Switch
                                        onChange={(e) =>
                                          handlestatus(e, uid.id, "active")
                                        }
                                        value="0"
                                        defaultChecked
                                      />
                                    }
                                  />
                                )}
                                {uid.active == 0 && (
                                  <FormControlLabel
                                    control={
                                      <Android12Switch
                                        onChange={(e) =>
                                          handlestatus(e, uid.id, "active")
                                        }
                                        value="1"
                                      />
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {window.location.pathname.match(
                        /^\/webapp\/product\/\d+$/
                      ) && (
                        <div className="mt-3">
                          <div className="form-group">
                            <div className="setting-block">
                              <label
                                htmlFor=""
                                className="switch switch-sm switch-icon"
                              >
                                Approval status
                              </label>
                              {isNaN(update_id) && (
                                <FormControlLabel
                                  control={<Android12Switch disabled />}
                                />
                              )}

                              {uid.approve == 1 && (
                                <FormControlLabel
                                  control={
                                    <Android12Switch
                                      onChange={(e) =>
                                        handlestatus(e, uid.id, "approve")
                                      }
                                      value="0"
                                      defaultChecked
                                    />
                                  }
                                />
                              )}
                              {uid.approve == 0 && (
                                <FormControlLabel
                                  control={
                                    <Android12Switch
                                      onChange={(e) =>
                                        handlestatus(e, uid.id, "approve")
                                      }
                                      value="1"
                                    />
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="card mt-3">
                    <div
                      className="card-body "
                      style={{ padding: "1.4rem 0.875rem" }}
                    >
                      <div className="">
                        <div className="form-group">
                          <div></div>
                          <div className="setting-block">
                            <div>
                              <label
                                htmlFor=""
                                className="switch switch-sm switch-icon"
                              >
                                Mark as featured
                              </label>
                            </div>
                            <div>
                              {isNaN(update_id) && (
                                <FormControlLabel
                                  control={<Android12Switch disabled />}
                                />
                              )}
                              {uid.featured == 1 && (
                                <FormControlLabel
                                  control={
                                    <Android12Switch
                                      onChange={(e) =>
                                        handlestatus(e, uid.id, "featured")
                                      }
                                      value="0"
                                      defaultChecked
                                    />
                                  }
                                />
                              )}
                              {uid.featured == 0 && (
                                <FormControlLabel
                                  control={
                                    <Android12Switch
                                      onChange={(e) =>
                                        handlestatus(e, uid.id, "featured")
                                      }
                                      value="1"
                                    />
                                  }
                                />
                              )}
                            </div>
                          </div>
                          <p
                            className="para"
                            style={{ fontSize: "12px", lineHeight: "15px" }}
                          >
                            Mark this product as a featured product, and it will
                            be displayed under the featured product list on the
                            front end.
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="form-group">
                          <div></div>
                          <div className="setting-block">
                            <div>
                              <label
                                htmlFor=""
                                className="switch switch-sm switch-icon"
                              >
                                Mark as Trending
                              </label>
                            </div>
                            <div>
                              {isNaN(update_id) && (
                                <FormControlLabel
                                  control={<Android12Switch disabled />}
                                />
                              )}
                              {uid.trending == 1 && (
                                <FormControlLabel
                                  control={
                                    <Android12Switch
                                      onChange={(e) =>
                                        handlestatus(e, uid.id, "trending")
                                      }
                                      value="0"
                                      defaultChecked
                                    />
                                  }
                                />
                              )}
                              {uid.trending == 0 && (
                                <FormControlLabel
                                  control={
                                    <Android12Switch
                                      onChange={(e) =>
                                        handlestatus(e, uid.id, "trending")
                                      }
                                      value="1"
                                    />
                                  }
                                />
                              )}
                            </div>
                          </div>
                          <p
                            className="para"
                            style={{ fontSize: "12px", lineHeight: "15px" }}
                          >
                            Mark this product as a Trending product, and it will
                            be displayed under the Trending product list on the
                            front end.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;
