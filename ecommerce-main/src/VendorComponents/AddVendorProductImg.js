import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import img1 from "../assets/images/product_default_image.jpg";
import EditIcon from "@mui/icons-material/Edit";
import InnerHeader from './InnerHeader';
import axios from 'axios';
import { BASE_URL, IMG_URL } from '../AdminComponent/BaseUrl';
import { Autocomplete, TextField } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import CustomHeder from './CustomHeder';
import Loader from './Loader';
import CloseIcon from '@mui/icons-material/Close';
import decryptedvendorid from '../Utils/Vendorid';
import ColorThief from 'color-thief-browser';
import { readAndCompressImage } from 'browser-image-resizer';

const AddVendorProductImg = () => {
    const [value, setValue] = useState({
        title: "",
        colorcode: "",
    })

    const [images, setImages] = useState([])
    const [imageValidation, setImageValidation] = useState([])
    const [loader, setLoader] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    const [color_id, setId] = useState("")
    const [color, setColor] = useState([])
    const [productimg, setProductimg] = useState([])
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const { product_id, product_name } = useParams()
    const [error, setError] = useState({})
    const [error2, setError2] = useState({})
    const [uploadError, setUploadError] = useState("")

    const colorThief = new ColorThief();

    const validateForm = () => {
        let isValid = true
        const newErrors = {}

        if (images.length < 2) {
            isValid = false;
            newErrors.images = "At least 2 images are required"
        }

        if (imageValidation.some(valid => !valid)) {
            isValid = false;
            newErrors.dimensions = "All images must be exactly 100x100 pixels"
        }

        if (!value.colorcode) {
            isValid = false
            newErrors.colorcode = "Color is required"
        }

        setError(newErrors)
        return isValid
    }


    const validateForm2 = () => {
        let isValid = true
        const newErrors2 = {}


        if (!value.title) {
            isValid = false;
            newErrors2.title = "title is require"
        }


        setError2(newErrors2)
        return isValid
    }


    async function getColorData() {
        axios.get(`${BASE_URL}/color_data`)
            .then((res) => {
                console.log(res.data)
                setColor(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function getProductimgData() {

        const data = {
            product_id: product_id
        }

        axios.post(`${BASE_URL}/product_img_data`, data)
            .then((res) => {
                console.log(res.data)
                setProductimg(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {
        getProductimgData()
        getColorData()
    }, [])


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

    const handleDelete = (id) => {

        setLoader(true)

        const data = {
            product_id: id
        }


        axios.post(`${BASE_URL}/product_img_delete`, data)
            .then((res) => {
                setLoader(false)
                getProductimgData()
            })

            .catch((err) => {
                console.log(err)
            })
        setConfirmationVisibleMap((prevMap) => ({
            ...prevMap,
            [id]: false,
        }));
    }




    async function ImageBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        const data = new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });

        return data;
    }

    const validateImageDimensions = (file) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = function() {
                const isValid = img.width === 100 && img.height === 100;
                resolve(isValid);
            };
            img.src = URL.createObjectURL(file);
        });
    };

    // Improved color matching function
    const findClosestColorMatch = (hexColor) => {
        if (!color || color.length === 0 || !hexColor) return null;
        
        try {
            // Convert hex to RGB
            const hex = hexColor.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            
            if (isNaN(r) || isNaN(g) || isNaN(b)) {
                console.error("Invalid color format:", hexColor);
                return null;
            }
            
            // Convert RGB to Lab (approximation for better perceptual matching)
            // First convert RGB to XYZ
            let rLinear = r / 255;
            let gLinear = g / 255;
            let bLinear = b / 255;
            
            // Apply gamma correction
            rLinear = rLinear > 0.04045 ? Math.pow((rLinear + 0.055) / 1.055, 2.4) : rLinear / 12.92;
            gLinear = gLinear > 0.04045 ? Math.pow((gLinear + 0.055) / 1.055, 2.4) : gLinear / 12.92;
            bLinear = bLinear > 0.04045 ? Math.pow((bLinear + 0.055) / 1.055, 2.4) : bLinear / 12.92;
            
            // Convert to XYZ
            const x = rLinear * 0.4124 + gLinear * 0.3576 + bLinear * 0.1805;
            const y = rLinear * 0.2126 + gLinear * 0.7152 + bLinear * 0.0722;
            const z = rLinear * 0.0193 + gLinear * 0.1192 + bLinear * 0.9505;
            
            // Find closest color with more weight on hue and saturation than luminance
            let closestColor = null;
            let minDistance = Number.MAX_VALUE;
            
            color.forEach(colorOption => {
                if (!colorOption.colorcode) return;
                
                const colorCode = colorOption.colorcode.replace('#', '');
                if (colorCode.length < 6) return;
                
                try {
                    const cr = parseInt(colorCode.substring(0, 2), 16);
                    const cg = parseInt(colorCode.substring(2, 4), 16);
                    const cb = parseInt(colorCode.substring(4, 6), 16);
                    
                    if (isNaN(cr) || isNaN(cg) || isNaN(cb)) return;
                    
                    // Convert to HSL for better color comparison
                    // This gives more weight to hue differences which is often perceptually better
                    const [h1, s1, l1] = rgbToHsl(r, g, b);
                    const [h2, s2, l2] = rgbToHsl(cr, cg, cb);
                    
                    // Calculate distance with higher weight on hue and saturation
                    const hueWeight = 2.0;
                    const satWeight = 1.5;
                    const lumWeight = 0.5;
                    
                    // Handle hue's circular nature (0 and 360 are the same)
                    let hueDiff = Math.abs(h1 - h2);
                    if (hueDiff > 180) hueDiff = 360 - hueDiff;
                    hueDiff = hueDiff / 180; // Normalize to 0-1 range
                    
                    const distance = Math.sqrt(
                        hueWeight * hueDiff * hueDiff +
                        satWeight * (s1 - s2) * (s1 - s2) +
                        lumWeight * (l1 - l2) * (l1 - l2)
                    );
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestColor = colorOption;
                    }
                } catch (e) {
                    console.error("Error comparing colors:", e);
                }
            });
            
            console.log("Found closest color match:", closestColor);
            return closestColor;
        } catch (error) {
            console.error("Error in findClosestColorMatch:", error);
            return null;
        }
    };

    // Helper function to convert RGB to HSL
    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
                default: h = 0;
            }
            
            h /= 6;
        }
        
        return [h * 360, s, l]; // Convert h to degrees
    }

    const handleAddImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Clear previous upload error
        setUploadError("");
        
        // Validate image dimensions
        const isValidDimension = await validateImageDimensions(file);
        
        // Immediately reject invalid images
        if (!isValidDimension) {
            setUploadError("Image must be exactly 100x100 pixels. This image was not added.");
            return; // Don't proceed with adding the image
        }
        
        if (images.length >= 10) {
            setUploadError("Maximum 10 images allowed");
            return;
        }
        
        const data = await ImageBase64(file);
        
        // Only process the dominant color if it's the first valid image
        if (images.length === 0 && isValidDimension) {
            const img = new Image();
            img.src = data;
            img.onload = function() {
                try {
                    const color = colorThief.getColor(img);
                    const detectedColorHex = `#${color.map(c => c.toString(16).padStart(2, '0')).join('')}`;
                    console.log("Detected color:", detectedColorHex);
                    
                    setValue((prev) => ({
                        ...prev,
                        colorcode: detectedColorHex,
                    }));
                    
                    // Find and select the closest matching color in the dropdown
                    const closestMatch = findClosestColorMatch(detectedColorHex);
                    console.log("Closest match found:", closestMatch);
                    
                    if (closestMatch) {
                        console.log("Setting selected color to:", closestMatch);
                        setSelectedOption(closestMatch);
                        setId(closestMatch.id);
                    }
                    
                } catch (error) {
                    console.error("Error extracting color:", error);
                }
            };
        }
        
        // Only add valid images
        setImages([...images, { file, preview: data }]);
        setImageValidation([...imageValidation, isValidDimension]);
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
        
        const newValidation = [...imageValidation];
        newValidation.splice(index, 1);
        setImageValidation(newValidation);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            setLoader(true)
            const formdata = new FormData()
            
            // Add all images to formdata
            images.forEach((img, index) => {
                formdata.append(`image${index+1}`, img.file);
            });
            
            // Convert hex color code to integer
            let colorAsInteger;
            try {
                // Remove # if present
                let hexColor = value.colorcode;
                if (hexColor.startsWith('#')) {
                    hexColor = hexColor.substring(1);
                }
                
                // Convert hex to integer
                colorAsInteger = parseInt(hexColor, 16);
                
                // Handle invalid hex values
                if (isNaN(colorAsInteger)) {
                    console.error("Invalid hex color:", value.colorcode);
                    colorAsInteger = 1; // Default value if conversion fails
                }
                
                console.log("Color conversion:", {
                    originalHex: value.colorcode,
                    cleanHex: hexColor,
                    intValue: colorAsInteger
                });
            } catch (error) {
                console.error("Error converting color:", error);
                colorAsInteger = 1; // Default value if there's an error
            }
            
            // Send the integer value instead of hex code
            formdata.append("color_id", colorAsInteger);
            formdata.append("product_id", product_id);
            formdata.append("user_id", decryptedvendorid());

            // Log the form data keys to verify
            for (let pair of formdata.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            axios.post(`${BASE_URL}/add_product_img`, formdata)
                .then((res) => {
                    console.log(res)
                    alert(res.data)
                    setLoader(false)
                    getProductimgData()
                    window.location.reload()
                })
                .catch((err) =>{
                    console.log(err , "$$$")
                    setLoader(false)
                })
        }
    }

    const handleSubmit2 = (e) => {


        if (validateForm2()) {

            const data = {
                title: value.title,
                colorcode: value.colorcode,
                user_id: decryptedvendorid(),

            }


            axios.post(`${BASE_URL}/add_color`, data)
                .then((res) => {
                    alert(res.data)
                    getColorData()
                    setValue({
                        title:"",
                        colorcode :""
                    })

                })
                .catch((err) => {
                    console.log(err)
                })

        }

    }

    const HandleChange = (selectedValue) => {
        if (selectedValue) {
            console.log(selectedValue, "::::")
            const selectedId = selectedValue.id;
            setSelectedOption(selectedValue);
            // Now you have the selected id, you can use it in your application logic
            setId(selectedId)
        } else {
            // Handle case when selection is cleared
            setSelectedOption(null);
            setId("");
        }
    };







    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // Add this helper function to safely convert integer to hex color code
    const intToHexColor = (colorId) => {
        try {
            // Make sure we have a valid number
            const colorInt = parseInt(colorId);
            
            if (isNaN(colorInt)) {
                console.warn("Invalid color ID:", colorId);
                return "#000000"; // Default to black if not a valid number
            }
            
            // Convert to hex string without "0x" prefix
            let hexColor = colorInt.toString(16);
            
            // Pad to ensure we have 6 digits
            hexColor = hexColor.padStart(6, '0');
            
            // Add # prefix
            return "#" + hexColor;
        } catch (error) {
            console.error("Error converting to hex:", error);
            return "#000000"; // Default to black on error
        }
    };

    return (
        <div class="container-fluid page-body-wrapper position-relative col-lg-12" >
            {loader && <Loader />}
         <div class="main-panel">
                <div class="content-wrapper" style={{ height: "100vh" }}>
                    <CustomHeder />
                    <div className='py-3'>
                        <h5>Product Name: {product_name}</h5>
                    </div>
                    <div class="row">
                        <div class="col-lg-5 grid-margin stretch-card">
                            <form onSubmit={handleSubmit} method='POST'>
                                <div class="card">
                                    <div class="card-body">

                                        <div class="card mt-3" id="media">
                                            <div class="card-head" style={{ padding: "20px 22px 0px" }}>
                                                <h5
                                                    style={{
                                                        color: "#000000DE",
                                                        fontSize: "20px",
                                                        margin: "0",
                                                    }}
                                                >
                                                    Media
                                                </h5>
                                                <p class="para">Manage your product's image gallery.</p>
                                            </div>

                                            <div class="card-body" style={{ padding: "20px 10px" }}>
                                                <div className='row'>
                                                    <div className="col-12 mb-3">
                                                        <p className="text-danger">Images must be exactly 100 x 100 pixels. Please re-upload if the size is incorrect.</p>
                                                    </div>
                                                    
                                                    <div className="col-12 mb-3">
                                                        <p className="text-danger">The dominant color will be auto-detected from the first image.</p>
                                                    </div>

                                                    <div className="col-12 mb-3">
                                                        <label>Upload Images (Min 2, Max 10)<span className='text-danger'>*</span></label>
                                                        
                                                        {images.length < 10 && (
                                                            <div className="d-flex align-items-center mb-3">
                                                                <label className="btn btn-primary m-0">
                                                                    Add Image
                                                                    <input 
                                                                        type="file" 
                                                                        accept="image/*" 
                                                                        onChange={handleAddImage}
                                                                        style={{ display: 'none' }} 
                                                                    />
                                                                </label>
                                                                <span className="ml-3 text-muted">
                                                                    {images.length} of 10 images added
                                                                </span>
                                                            </div>
                                                        )}
                                                        
                                                        {uploadError && (
                                                            <div className="alert alert-danger py-2 mt-2">
                                                                <strong>Error:</strong> {uploadError}
                                                            </div>
                                                        )}
                                                        
                                                        {error.images && <span className='text-danger d-block'>{error.images}</span>}
                                                        {error.dimensions && <span className='text-danger d-block'>{error.dimensions}</span>}
                                                        
                                                        <div className="row mt-3">
                                                            {images.map((img, index) => (
                                                                <div className="col-md-4 mb-3" key={index}>
                                                                    <div className="card">
                                                                        <div className="card-body p-2">
                                                                            <img 
                                                                                src={img.preview} 
                                                                                alt={`Preview ${index+1}`} 
                                                                                className="img-fluid mb-2" 
                                                                                style={{maxHeight: "100px"}}
                                                                            />
                                                                            <div className="d-flex justify-content-between align-items-center">
                                                                                <span>
                                                                                    Image {index+1} 
                                                                                    {imageValidation[index] ? 
                                                                                        <i className="mdi mdi-check-circle text-success ml-1"></i> : 
                                                                                        <i className="mdi mdi-alert-circle text-danger ml-1" title="Image must be 100x100px"></i>
                                                                                    }
                                                                                </span>
                                                                                <button 
                                                                                    type="button" 
                                                                                    className="btn btn-sm btn-danger" 
                                                                                    onClick={() => handleRemoveImage(index)}
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div class="form-group col-lg-6">
                                                        <label for="exampleInputUsername1">Colour<span className='text-danger'>*</span></label>
                                                        <div className="d-flex align-items-center">
                                                            <div 
                                                                style={{
                                                                    width: "30px", 
                                                                    height: "30px", 
                                                                    backgroundColor: value.colorcode || "#ffffff",
                                                                    border: "1px solid #ddd",
                                                                    marginRight: "10px"
                                                                }}
                                                            ></div>
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                value={value.colorcode} 
                                                                onChange={(e) => setValue({...value, colorcode: e.target.value})}
                                                                placeholder="Detected color code"
                                                            />
                                                        </div>
                                                        {error.colorcode && <span className='text-danger'>{error.colorcode}</span>}
                                                    </div>
                                                    
                                                    <div class="form-group col-lg-6 mt-4">
                                                        <button className='btn btn-primary mt-2 float-right' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Colour +</button>
                                                        
                                                        <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                                        <CloseIcon style={{width:"30px"}} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <form class="forms-sample py-3" >

                                                                            <div class="form-group">
                                                                                <label for="exampleInputUsername1">Title <span className='text-danger'>*</span></label>
                                                                                <input type="text" class="form-control" id="exampleInputUsername1" value={value.title} placeholder="Title" name='title' onChange={onhandleChange} />
                                                                                {error2.title && <span className='text-danger'>{error2.title}</span>}
                                                                            </div>

                                                                            <div class="form-group ">
                                                                                <label for="exampleTextarea1">Color code <span className='text-danger'>*</span></label>                                    
                                                                                <input type="color" class="form-control" value={value.colorcode} name='colorcode' onChange={onhandleChange} />
                                                                            </div>

                                                                           <> 
                                                                             <button type="button" onClick={handleSubmit2} class="btn btn-primary mr-2" data-bs-dismiss="modal">Submit</button>
                                                                                </>
                                                                                
                                                                                

                                                                        </form>
                                                                    </div>
                                                                 
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className='row'>
                                                    <div className="col-lg-12 my-3">

                                                      <> <button type='submit' className="btn btn btn-primary mr-2">Add</button>
                                                            <button type='button' onClick={() => {
                                                                window.location.reload()
                                                            }} class="btn btn-light">Cancel</button></>

                                                    </div>
                                                </div>



                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-lg-3 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Image Preview</h4>
                                    <div className='row'>
                                        {images.length > 0 ? (
                                            images.map((img, index) => (
                                                <div className='col-lg-6 py-2' key={index}>
                                                    <img
                                                        class=""
                                                        data-bs-toggle="tooltip"
                                                        data-placement="top"
                                                        src={img.preview}
                                                        title={`Image ${index+1}`}
                                                        alt={`Preview ${index+1}`}
                                                        data-bs-original-title=""
                                                    ></img>
                                                </div>
                                            ))
                                        ) : (
                                            <div className='col-12 text-center'>
                                                <p>No images uploaded yet</p>
                                            </div>
                                        )}
                                    </div>


                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">List Of Images</h4>
                                    <div class="table-responsive pt-3">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th width="18%">Sr. No.</th>
                                                    <th width="60%">Image</th>
                                                    <th width="20%">Color</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {productimg.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{item.images[0] ? <img src={`${IMG_URL}/productimg/` + item.images[0]} alt='' /> : <></>}{item.images[1]? <img src={`${IMG_URL}/productimg/` + item.images[1]} alt='' /> : <></>}{item.images[2] ? <img src={`${IMG_URL}/productimg/` + item.images[2]} alt='' /> : <></>}{item.images[3] && <img src={`${IMG_URL}/productimg/` + item.images[3]} alt='' /> }</td>
                                                            <td style={{ color: '#000', fontWeight: '500' }}>
                                                                {/* Try different approaches to make sure the value displays */}
                                                                {String(item.color_id || '')}
                                                                {/* If the property might be spelled differently, try this as a fallback */}
                                                                {!item.color_id && item.colour_id ? String(item.colour_id) : ''}
                                                            </td>
                                                            <td>
                                                                <Link>
                                                                    <DeleteIcon style={{ color: "red" }} onClick={() => handleClick(item.id)} />
                                                                </Link>
                                                            </td>
                                                            {confirmationVisibleMap[item.id] && (
                                                                <div className='confirm-delete'>
                                                                    <p>Are you sure you want to delete?</p>
                                                                    <button onClick={() => handleDelete(item.id)} className='btn btn-sm btn-primary'>OK</button>
                                                                    <button onClick={() => handleCancel(item.id)} className='btn btn-sm btn-danger'>Cancel</button>
                                                                </div>
                                                            )}
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
    )
}

export default AddVendorProductImg