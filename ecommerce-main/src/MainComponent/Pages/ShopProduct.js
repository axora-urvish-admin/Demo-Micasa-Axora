import React, { useEffect, useState, useRef } from "react";
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
import Noproduct from "../../assets/images/no-product-found.png";
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
    const togBoxRef = useRef(null);
    const togIconRef = useRef(null);
    const [priceValArr, setPriceValArr] = useState([0, 100000]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // To hide button when no more products
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
            value: 25000,
            label: "₹25000",
        },
        {
            value: 50000,
            label: "₹50000",
        },
        {
            value: 75000,
            label: "₹75000",
        },
        {
            value: 100000,
            label: "₹100000",
        },
    ];

    const dispatch = useDispatch();
    const productnew = useSelector((state) => state.products.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const { groupslug, catslug, subcatslug, brand_id } = useParams();

    const group = groupslug && groupData.find((g) => g.slug === groupslug);
    const cat = catslug && catData.find((c) => c.slug === catslug);

    async function getproductdetails(pageNumber, reset = false) {
        if (loading) return; // Prevent multiple requests
        setLoading(true);
    
        const data = {
            groupslug,
            catslug,
            subcatslug,
            brand_id,
            sort,
            price: value,
            start_price: priceValArr[0],
            end_price: priceValArr[1],
            brandid,
            page: pageNumber, // Send the page number for pagination
        };
    
        try {
            const res = await axios.post(`${BASE_URL}/getproductlisting`, data);
    
            setProducts((prevProducts) => reset ? res.data : [...prevProducts, ...res.data]);
    
            // If the response is empty, it means no more products
            setHasMore(res.data.length > 0);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
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

                    if (group.breadcrumb != "") {
                        setBreadcrumbImage(`${IMG_URL}/Breadcrumbs/${group.breadcrumb}`);
                        // console.log(group, "this is if");
                    } else {
                        // console.log(group, "this is else");
                        setBreadcrumbImage(DEF_IMG_BRA);
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
                setCatData(res.data);
                setCateBread(res.data[0].breadcrumb);

                if (!subcatslug) {
                    const cat = catData.find((sub) => sub.slug == catslug);

                    if (cat.breadcrumb != "") {
                        setBreadcrumbImage(`${IMG_URL}/Breadcrumbs/${cat.breadcrumb}`);
                        // console.log(group, "this is if");
                    } else {
                        // console.log(group, "this is else");
                        setBreadcrumbImage(DEF_IMG_BRA);
                    }
                }
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

                if (subcatslug) {
                    const subcat = subcatData.find((subcat) => subcat.slug == subcatslug);

                    if (subcat.breadcrumb != "") {
                        setBreadcrumbImage(`${IMG_URL}/Breadcrumbs/${subcat.breadcrumb}`);
                        // console.log(group, "this is if");
                    } else {
                        // console.log(group, "this is else");
                        setBreadcrumbImage(DEF_IMG_BRA);
                    }
                }
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
    getGroupData();
    getcatData();
    getsubcatData();
    
    // Reset product list when filters change
    setProducts([]);  
    setPage(1);  
    setHasMore(true);
    
    getproductdetails(1, true); // Fetch fresh data for new filters
    
    SiteHeader((subcatslug || catslug || groupslug)?.replace(/[0-9-]/g, ""));
}, [groupslug, catslug, subcatslug, brand_id, sort, brandid, priceValArr]);

// Fetch more products when page changes (for Load More button)
useEffect(() => {
    if (page > 1) {
        getproductdetails(page);
    }
}, [page]);


    const handleChange = (event, newValue) => {
        console.log("event", event);
        console.log("newValue", newValue);
        setPriceValArr(newValue);
        setValue(newValue[1]);
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

    useEffect(() => {
        const isInsidetogBox = (e) => {
            if (togBoxRef.current && togIconRef.current) {
                if (!togBoxRef.current.contains(e.target) && !togIconRef.current.contains(e.target)) {
                    setToggle(false);
                    return;
                }
            }
        };

        document.addEventListener("click", isInsidetogBox);

        return () => {
            document.removeEventListener("click", isInsidetogBox);
        };
    }, []);

    const handledelete = () => {
        setPriceValArr([0, 100000]);
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
    }, [groupslug, catslug, subcatslug, brand_id, sort, priceValArr, brandid]);

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
                                backgroundImage: `url('${breadcrumbImage}')`,
                            }}
                        >
                            <div className="section-container d-flex justify-content-center">
                                <div className="content-title-heading">
                                    {/* <h1 className="text-title-heading">{header}</h1> */}
                                </div>
                                <div
                                    className="breadcrumbs bg-light"
                                    style={{
                                        width: "fit-content",
                                        padding: "5px 10px",
                                    }}
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
                                            className={`col-xl-3 col-lg-3 col-md-12 col-12 mob-left-sidebar ${toggle ? `mob-left-view` : ``
                                                }  left-sidebar md-b-50`}
                                            ref={togIconRef}
                                        >
                                            {/* <!-- Block Product Categories --> */}
                                            <div className="block block-product-cats mb-3">
                                                <div
                                                    className="py-4  mob-left-sidebar-close "
                                                    onClick={toggleSidebar}
                                                    style={{
                                                        textAlign: "right",
                                                        display: "none",
                                                    }}
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
                                                        style={{
                                                            maxHeight: "200px",
                                                            overflowY: "auto",
                                                        }}
                                                    >
                                                        <ul
                                                            style={{
                                                                marginLeft: "10px",
                                                            }}
                                                        >
                                                            {group
                                                                ? cat
                                                                    ? subcatData
                                                                        .filter((subcat) => subcat.cat_id === cat.id)
                                                                        .map((item) => (
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
                                                                                    to={`/shoproduct/${group.slug}/${cat.slug}/${item.slug}`}
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
                                                                        ))
                                                                    : catData
                                                                        .filter((cat) => cat.group_id === group.id)
                                                                        .map((item) => (
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
                                                                                    to={`/shoproduct/${group.slug}/${item.slug}`}
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
                                                                        ))
                                                                : null}
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
                                                        value={priceValArr}
                                                        style={{ width: "90%" }}
                                                        defaultValue={100}
                                                        getAriaValueText={valuetext}
                                                        marks={marks}
                                                        max={100000}
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
                                                            style={{
                                                                marginLeft: "10px",
                                                            }}
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
                                            <div className="block block-products d-md-none d-lg-block">
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
                                                            style={{
                                                                marginLeft: "10px",
                                                            }}
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


                                                                                        {featured.price ? (
                                                                                            <span className="price">
                                                                                                <del aria-hidden="true">
                                                                                                    <span>
                                                                                                        ₹
                                                                                                        {featured.price}
                                                                                                    </span>
                                                                                                </del>
                                                                                                <ins>
                                                                                                    <span>
                                                                                                        ₹
                                                                                                        {
                                                                                                            featured.disc_price
                                                                                                        }
                                                                                                    </span>
                                                                                                </ins>
                                                                                            </span>
                                                                                        ) : (
                                                                                            <span className="price">
                                                                                                ₹{featured.disc_price}
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
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <div
                                                            className="mob-filter"
                                                            style={{
                                                                display: "none",
                                                            }}
                                                            ref={togBoxRef}
                                                        >
                                                            <Icon
                                                                path={mdiFilterVariant}
                                                                onClick={toggleSidebar}
                                                                className="border p-1"
                                                                size={2}
                                                            />
                                                        </div>

                                                        {priceValArr[0] !== 0 || priceValArr[1] !== 100000 ? (
                                                            <Chip
                                                                className="mx-2"
                                                                label={`₹${priceValArr[0]} to ${priceValArr[1]}`}
                                                                onDelete={handledelete}
                                                                style={{
                                                                    fontSize: "0.75rem",
                                                                }}
                                                            />
                                                        ) : null}
                                                        {brandname !== "" && (
                                                            <Chip
                                                                label={`${brandname}`}
                                                                onDelete={handlbrandedelete}
                                                                style={{
                                                                    fontSize: "0.75rem",
                                                                }}
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div
                                                            className=""
                                                            style={{
                                                                fontSize: "0.75rem",
                                                            }}
                                                        >
                                                            <div className="products-count">
                                                                Showing all {products.length} results
                                                            </div>
                                                        </div>
                                                        <div className="products-topbar-right">
                                                            <div
                                                                className="products-sort dropdown"
                                                                style={{
                                                                    flexShrink: 0,
                                                                }}
                                                            >
                                                                <FormControl
                                                                    sx={{
                                                                        m: 0.5,
                                                                        minWidth: 80,
                                                                    }}
                                                                >
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
                                                                </div>
                                                            ) : (
                                                                products.map((product) => {
                                                                    return (
                                                                        <ProductCard
                                                                            proid={product.proid}
                                                                            title={product.product_title}
                                                                            disc_price={product.disc_price}
                                                                            price={product.price}
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
                                                                            isluxe={product.isluxe}
                                                                        />
                                                                    );
                                                                })
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {hasMore && (
                                                <button
                                                    onClick={() => setPage((prevPage) => prevPage + 1)}
                                                    disabled={loading}
                                                    style={{
                                                        padding: "10px 20px",
                                                        marginTop: "20px",
                                                        backgroundColor: "#000",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "5px",
                                                        cursor: "pointer",
                                                        
                                                    }}
                                                >
                                                    {loading ? "Loading..." : "Load More"}
                                                </button>
                                            )}

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
