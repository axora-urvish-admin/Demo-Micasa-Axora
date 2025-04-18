import React, { useEffect, useState } from "react";
import product4_2 from "../../assets/frontimg/product/4-2.jpg";
import product6_2 from "../../assets/frontimg/product/6-2.jpg";
import { Chip, Slider } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, DEF_IMG_BRA, IMG_URL } from "../../AdminComponent/BaseUrl";
import ProductCard from "../Subcomponents/ProductCard";
import { mdiClose, mdiFilterVariant } from "@mdi/js";
import Icon from "@mdi/react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Store/Products/product-actions";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Helmet } from "react-helmet";
// import useBreadcrumb from "../../Utils/Breadcrum";
import { mdiStar } from "@mdi/js";
import Noproduct from "../../assets/images/no-product-found.png";
import bread from "../../assets/images/bread.png";
import Loader from "../../AdminComponent/Loader";

const ShopProduct = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [groupData, setGroup] = useState([]);
  const [catData, setCatData] = useState([]);
  const [subcatData, setsubCatData] = useState([]);
  const [brand, setBrand] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [header, SiteHeader] = useState();
  const [sort, setSort] = useState("");
  const [brandid, setBrandid] = useState("");
  const [brandname, setBrandName] = useState("");
  const [value, setValue] = React.useState("");
  const [groupbread, setGroupBread] = useState("");
  const [Catebread, setCateBread] = useState("");
  const [Subcatebread, setSubcateBread] = useState("");
  const [breadcrumbImage, setBreadcrumbImage] = useState("");
  const [loader, setLoader] = useState(false);

  // const breaddata = useBreadcrumb();
  // const defaultBreadcrumbImage = "https://micasasucasa.in/ecomuploads/Breadcrumbs/image-1733552051451.png";
  function valuetext(value) {
    return `₹${value}`;
  }

  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  const marks = [
    {
      value: 0,
      label: "₹0",
    },

    {
      value: 2500,
      label: "₹2500",
    },
    {
      value: 5000,
      label: "₹5000",
    },
    {
      value: 7500,
      label: "₹7500",
    },
    {
      value: 10000,
      label: "₹10000",
    },
  ];

  const dispatch = useDispatch();
  const productnew = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { groupslug, catslug, subcatslug, brand_id } = useParams();

  async function getproductdetails() {
    const data = {
      groupslug: groupslug,
      catslug: catslug,
      subcatslug: subcatslug,
      brand_id: brand_id,
      sort: sort,
      price: value,
      brandid: brandid,
    };

    axios
      .post(`${BASE_URL}/getproductlisting`, data)
      .then((res) => {
        // console.log(res)
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getGroupData() {
    axios
      .get(`${BASE_URL}/group_data`)
      .then((res) => {
        // console.log(res)
        setGroup(res.data);

        const groupdata = res.data;
        setGroupBread(res.data[0].breadcrumb);

        if (!catslug && !subcatslug) {
          const group = groupdata.find((group) => group.slug == groupslug);
          if (group.breadcrumb != '') {
            setBreadcrumbImage(`${IMG_URL}/Breadcrumbs/${group.breadcrumb}`);
            // console.log(group, "this is if");
          } else {
            // console.log(group, "this is else");
             setBreadcrumbImage(
              DEF_IMG_BRA
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getcatData() {
    axios
      .get(`${BASE_URL}/category_data`)
      .then((res) => {
        console.log(res.data);
        setCatData(res.data);
        setCateBread(res.data[0].breadcrumb);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getsubcatData() {
    axios
      .get(`${BASE_URL}/subcategory_data`)
      .then((res) => {
        setsubCatData(res.data);
        setSubcateBread(res.data[0].breadcrumb);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getsubcatData();
  }, []);

  async function getbrand() {
    const data = {
      groupslug: groupslug,
      catslug: catslug,
      subcatslug: subcatslug,
      brand_id: brand_id,
    };
    axios
      .post(`${BASE_URL}/getbrand`, data)
      .then((res) => {
        // console.log(res)
        setBrand(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getbrand();
    getproductdetails();
    getGroupData();
    getcatData();
    getsubcatData();
    SiteHeader(subcatslug || catslug || groupslug);

    if (subcatslug) {
      const subcat = subcatData.find((sub) => sub.slug == subcatslug);
      // console.log(subcat, "this is subcat");
      if (subcat) {
        setBreadcrumbImage(`${IMG_URL}/Breadcrumbs/${subcat.breadcrumb}`);
        if (subcat.breadcrumb != '') {
          setBreadcrumbImage(
            DEF_IMG_BRA
          );
        }
      }
    } else if (catslug) {
      const cat = catData.find((cat) => cat.slug == catslug);
      // console.log(cat, "this is cat");
      if (cat) {
        setBreadcrumbImage(`${IMG_URL}/Breadcrumbs/${cat.breadcrumb}`);
        if (cat.breadcrumb != '' ) {
          setBreadcrumbImage(
            DEF_IMG_BRA
          );
        }
      }
    } else {
      setBreadcrumbImage("");
    }
  }, [groupslug, catslug, subcatslug, brand_id, sort, value, brandid]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlesortchange = (e) => {
    setSort(e.target.value);
  };

  async function getmetadetail() {
    const data = {
      page_id: 13,
    };
    axios.post(`${BASE_URL}/getmetadetail`, data).then((res) => {
      setData(res.data[0]);
    });
  }

  const handledelete = () => {
    setValue("");
    getproductdetails();
  };
  const handlbrandedelete = () => {
    setBrandName("");
  };

  // useEffect(() => {
  //   getmetadetail();
  // }, []);
  useEffect(() => {
    getproductdetails();
    getmetadetail();
  }, [groupslug, catslug, subcatslug, brand_id, sort, value, brandid]);

  return (
    <div>
      {loader && <Loader />}
      <div id="site-main" className="site-main">
        <Helmet>
          <title>{data.seo_title}</title>
          <meta
            name="description"
            content={data.seo_desc}
            dangerouslySetInnerHTML={{ __html: data.seo_desc }}
          />
          <meta name="author" content={data.seo_title} />
        </Helmet>
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div
              id="title"
              className="page-title"
              style={{
                // backgroundImage: `url('${breadcrumbImage == "" ? DEF_IMG_BRA : breadcrumbImage  }')`,
                backgroundImage: `url('${breadcrumbImage}')`,
                // backgroundImage: `url('${breadcrumbImage == "" ? {bread} : breadcrumbImage  }')`,
              }}
            >
              <div className="section-container d-flex justify-content-center">
                <div className="content-title-heading">
                  {/* <h1 className="text-title-heading">{header}</h1> */}
                </div>
                <div
                  className="breadcrumbs bg-light"
                  style={{ width: "fit-content", padding: "5px 10px" }}
                >
                  <Link to={`/`}>Home</Link>
                  <span className="delimiter"></span>
                  <Link style={{ textTransform: "capitalize" }}>{header}</Link>
                </div>
              </div>
            </div>

            <div id="content" className="site-content" role="main">
              <div className="section-padding">
                <div className="section-container p-l-r">
                  <div className="row">
                    <div
                      className={`col-xl-3 col-lg-3 col-md-12 col-12 mob-left-sidebar ${
                        toggle ? `mob-left-view` : ``
                      }  left-sidebar md-b-50`}
                    >
                      {/* <!-- Block Product Categories --> */}
                      <div className="block block-product-cats mb-3">
                        <div
                          className="py-4  mob-left-sidebar-close "
                          onClick={toggleSidebar}
                          style={{ textAlign: "right", display: "none" }}
                        >
                          <Icon path={mdiClose} size={1} />
                        </div>
                        <div className="block-title">
                          <h2
                            className="bg-light text-dark text-uppercase"
                            style={{
                              fontSize: "17px",
                              fontWeight: "bold",
                              padding: "5px",
                            }}
                          >
                            Categories
                          </h2>
                        </div>
                        <div className="block-content">
                          <div
                            className="product-cats-list scrollable"
                            style={{ maxHeight: "200px", overflowY: "auto" }}
                          >
                            <ul style={{ marginLeft: "10px" }}>
                              {/* {groupData.map((item) => {
                                return (
                                  <li className="current">
                                    <Link
                                      onClick={toggleSidebar}
                                      to={`/shoproduct/${item.slug}`}
                                    >
                                      {item.title}
                                    </Link>
                                  </li>
                                );
                              })} */}

                              {/* {groupData.slice(0, 4).map((item) => (
                                <li
                                  key={item.slug}
                                  className={`current`}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Link
                                    onClick={toggleSidebar}
                                    to={`/shoproduct/${item.slug}`}
                                    style={{
                                      textDecoration: "none",
                                      color: "inherit",
                                    }} // Optional styling for the link
                                  >
                                    <i
                                      class="bi bi-circle-fill"
                                      style={{
                                        fontSize: "10px",
                                        marginRight: "8px",
                                      }}
                                    ></i>
                                    {item.title}
                                  </Link>
                                </li>
                              ))} */}

                              {catData.map((item) => (
                                <li
                                  key={item.slug}
                                  className={`current`}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Link
                                    onClick={toggleSidebar}
                                    to={`/shoproduct/${item.slug}`}
                                    style={{
                                      textDecoration: "none",
                                      color: "inherit",
                                    }}
                                  >
                                    <i
                                      class="bi bi-circle-fill"
                                      style={{
                                        fontSize: "10px",
                                        marginRight: "8px",
                                      }}
                                    ></i>
                                    {item.title}
                                  </Link>
                                </li>
                              ))}

                              {/* {subcatData.slice(0, 4).map((item) => (
                                <li
                                  key={item.slug}
                                  className={`current`}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Link
                                    onClick={toggleSidebar}
                                    to={`/shoproduct/${item.slug}`}
                                    style={{
                                      textDecoration: "none",
                                      color: "inherit",
                                    }}
                                  >
                                    <i
                                      class="bi bi-circle-fill"
                                      style={{
                                        fontSize: "10px",
                                        marginRight: "8px",
                                      }}
                                    ></i>
                                    {item.title}
                                  </Link>
                                </li>
                              ))} */}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* <!-- Block Product Filter --> */}
                      <div className="block block-product-filter">
                        <div className="block-title">
                          <h2
                            className="bg-light text-dark text-uppercase"
                            style={{
                              fontSize: "17px",
                              fontWeight: "bold",
                              padding: "5px ",
                            }}
                          >
                            Price
                          </h2>
                        </div>
                        <div className="block-content">
                          <Slider
                            onChange={handleChange}
                            style={{ width: "90%" }}
                            defaultValue={100}
                            getAriaValueText={valuetext}
                            marks={marks}
                            max={10000}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            sx={{
                              color: "black",
                              "& .MuiSlider-thumb": {
                                borderColor: "black",
                              },
                              "& .MuiSlider-track": {
                                borderColor: "black",
                              },
                              "& .MuiSlider-rail": {
                                borderColor: "black",
                              },
                            }}
                          />
                        </div>
                      </div>

                      {/* <!-- Block Product Filter --> */}
                      {/* <div className="block block-product-filter clearfix my-3">
                                            <div className="block-title"><h2>Brands</h2></div>
                                            <div className="block-content">
                                                <ul className="filter-items image">
                                                    {brand.map((brand) => {
                                                        return (
                                                            <li><Link to={`/${brand.id}` }><span><img onClick={toggleSidebar}  src={`${IMG_URL}/brand/` + brand.logo} alt="Brand" /></span></Link></li>
                                                        )
                                                    })}

                                              
                                                </ul>
                                            </div>
                                        </div> */}

                      <div className="block block-product-filter clearfix my-3">
                        {brand.length > 0 && (
                          <>
                            <div className="block-title">
                              <h2
                                className="bg-light text-dark text-uppercase"
                                style={{
                                  fontSize: "17px",
                                  fontWeight: "bold",
                                  padding: "5px",
                                }}
                              >
                                Brands
                              </h2>
                            </div>
                            <div
                              className="block-content"
                              style={{ marginLeft: "10px" }}
                            >
                              <ul className="filter-items image">
                                {brand.map((brand) => {
                                  return (
                                    <li key={brand.id}>
                                      {" "}
                                      {/* Added key for better performance */}
                                      <span
                                        onClick={() => {
                                          setBrandid(brand.id);
                                          setBrandName(brand.title);
                                        }}
                                      >
                                        <img
                                          src={
                                            brand.logo
                                              ? `${IMG_URL}/brand/${brand.logo}`
                                              : `${IMG_URL}/brand/${brand.logo}`
                                          }
                                          alt={brand.title || "Brand"}
                                        />
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </>
                        )}
                      </div>

                      {/* <!-- Block Products --> */}
                      <div className="block block-products">
                        {products.length > 0 && (
                          <>
                            <div className="block-title">
                              <h2
                                className="bg-light text-dark text-uppercase"
                                style={{
                                  fontSize: "17px",
                                  fontWeight: "bold",
                                  padding: "5px",
                                }}
                              >
                                Feature Product
                              </h2>
                            </div>
                            <div
                              className="block-content"
                              style={{ marginLeft: "10px" }}
                            >
                              <ul className="products-list">
                                {products
                                  .filter((featured) => featured.featured === 1)
                                  .map((featured) => {
                                    return (
                                      <Link
                                        to={`/product/${featured.slug}`}
                                        onClick={toggleSidebar}
                                      >
                                        <li className="product-item my-2">
                                          <a
                                            href="shop-details.html"
                                            className="product-image"
                                          >
                                            <img
                                              src={
                                                `${IMG_URL}/productimg/` +
                                                featured.image1
                                              }
                                              alt="product6"
                                            />
                                          </a>
                                          <div className="product-content">
                                            <h2 className="product-title text-uppercase">
                                              <Link
                                                to={`/product/${featured.slug}`}
                                              >
                                                {featured.product_title}
                                              </Link>
                                            </h2>
                                            {/* <div className="rating small">
                                          <div className="star star-5"></div>
                                        </div> */}

                                            {featured.disc_price ? (
                                              <span className="price">
                                                <del aria-hidden="true">
                                                  <span>₹{featured.price}</span>
                                                </del>
                                                <ins>
                                                  <span>
                                                    ₹{featured.disc_price}
                                                  </span>
                                                </ins>
                                              </span>
                                            ) : (
                                              <span className="price">
                                                ₹{featured.price}
                                              </span>
                                            )}
                                          </div>
                                        </li>
                                      </Link>
                                    );
                                  })}
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                      <div className="products-topbar clearfix ">
                        <div className="d-flex justify-content-between">
                          <div
                            className="flex-container"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {/* <div
                              className="filter-toggle"
                              onClick={toggleSidebar}
                            >
                              Filter
                            </div> */}
                            <div
                              className="mob-filter"
                              style={{ display: "none" }}
                            >
                              <Icon
                                path={mdiFilterVariant}
                                onClick={toggleSidebar}
                                className="border p-1"
                                size={2}
                              />
                            </div>

                            {value > 0 && (
                              <Chip
                                className="mx-2"
                                label={`₹0 to ${value}`}
                                onDelete={handledelete}
                                style={{ fontSize: "0.75rem" }}
                              />
                            )}
                            {brandname !== "" && (
                              <Chip
                                label={`${brandname}`}
                                onDelete={handlbrandedelete}
                                style={{ fontSize: "0.75rem" }}
                              />
                            )}
                          </div>

                          <div>
                            <div className="" style={{ fontSize: "0.75rem" }}>
                              <div className="products-count">
                                Showing all {products.length} results
                              </div>
                            </div>
                            <div className="products-topbar-right">
                              <div
                                className="products-sort dropdown"
                                style={{ flexShrink: 0 }}
                              >
                                <FormControl sx={{ m: 0.5, minWidth: 80 }}>
                                  <Select
                                    onChange={handlesortchange}
                                    // displayEmpty
                                    defaultValue={`default`}
                                    sx={{
                                      "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                          borderColor: "rgba(0, 0, 0, 1)",
                                        },
                                      "& .MuiSelect-select": {
                                        padding: "10px 16px",
                                        fontSize: "0.75rem",
                                      },
                                      "&:hover .MuiOutlinedInput-notchedOutline":
                                        {
                                          borderColor: "rgba(0, 0, 0, 1)",
                                        },
                                    }}
                                  >
                                    <MenuItem value="default">
                                      Default sorting
                                    </MenuItem>
                                    {/* <MenuItem value={10}>Sort by popularity</MenuItem>
                                                                    <MenuItem value={20}>Sort by average rating</MenuItem> */}
                                    <MenuItem value={"latest"}>
                                      Sort by latest
                                    </MenuItem>
                                    <MenuItem value={"low"}>
                                      Sort by price: low to high
                                    </MenuItem>
                                    <MenuItem value={"high"}>
                                      Sort by price: high to low
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="layout-grid"
                          role="tabpanel"
                        >
                          <div className="products-list grid">
                            <div className="row">
                              {products.length === 0 ? (
                                <div
                                  className="no-products-message"
                                  style={{
                                    textAlign: "center",
                                    width: "100%",
                                    marginTop: "20px",
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <img
                                    src={Noproduct}
                                    alt="No Products Found"
                                    style={{
                                      width: "100%",
                                      maxWidth: "400px",
                                      height: "auto",
                                      display: "block",
                                      margin: "0 auto",
                                    }}
                                  />

                                  {/* <p
                                    style={{
                                      fontSize: "25px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    No products Found
                                  </p> */}
                                </div>
                              ) : (
                                products.map((product) => {
                                  return (
                                    <ProductCard
                                      proid={product.proid}
                                      title={product.product_title}
                                      disc_price={product.disc_price}
                                      price={product.disc_price}
                                      image1={product.image1}
                                      image2={product.image2}
                                      trending={product.trending}
                                      catid={product.catid}
                                      slug={product.slug}
                                      v_id={product.v_id}
                                      gst={product.gst}
                                      customizable={product.customizable}
                                      stock={product.stock}
                                      r_tock={product.r_stock}
                                    />
                                  );
                                })
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 
                                        <nav className="pagination">
                                            <ul className="page-numbers">
                                                <li><a className="prev page-numbers" href="#">Previous</a></li>
                                                <li><span aria-current="page" className="page-numbers current">1</span></li>
                                                <li><a className="page-numbers" href="#">2</a></li>
                                                <li><a className="page-numbers" href="#">3</a></li>
                                                <li><a className="next page-numbers" href="#">Next</a></li>
                                            </ul>
                                        </nav> */}
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

export default ShopProduct;
