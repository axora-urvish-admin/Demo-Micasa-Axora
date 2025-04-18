import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InnerHeader from './InnerHeader';
import { BASE_URL, IMG_URL } from './BaseUrl';
import decryptedUserId from '../Utils/UserID';

const AboutUS = () => {
    const [confirmationVisibleMap, setConfirmationVisibleMap] = useState({});
    const [errors, setErrors] = useState({});
    const [images, setImages] = useState({ image1: null, image2: null, image3: null });
    const [aboutUsList, setAboutUsList] = useState([]);

    useEffect(() => {
        fetchAboutUsData();
    }, []);

    async function fetchAboutUsData() {
        try {
            const res = await axios.get(`${BASE_URL}/AboutUs_data`);
            setAboutUsList(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!images.image1 || !images.image2 || !images.image3) {
            isValid = false;
            newErrors.images = "All images are required";
        }

        setErrors(newErrors);
        setTimeout(() => setErrors({}), 5000);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData();
            formData.append("user_id", decryptedUserId());

            Object.keys(images).forEach((key) => {
                if (images[key]) {
                    formData.append(key, images[key]);
                }
            });

            try {
                const res = await axios.post(`${BASE_URL}/update_AboutUs`, formData);
                alert(res.data);
                setImages({ image1: null, image2: null, image3: null });
                fetchAboutUsData();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setImages((prevImages) => ({
            ...prevImages,
            [name]: files[0]
        }));
    };

    return (
        <div className="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-lg-5 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Add AboutUS Images</h4>
                                    <form className="forms-sample py-3" onSubmit={handleSubmit}>
                                        {["image1", "image2", "image3"].map((imgName, index) => (
                                            <div key={index} className="form-group">
                                                <label htmlFor={imgName}>Image {index + 1}</label>
                                                <input type="file" className="form-control" name={imgName} onChange={handleFileChange} />
                                            </div>
                                        ))}
                                        {errors.images && <div className="text-danger">{errors.images}</div>}
                                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">List of About Us Images</h4>
                                    <div className="table-responsive pt-3">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Image1</th>
                                                    <th>Image2</th>
                                                    <th>Image3</th>
                                                    </tr>
                                            </thead>
                                            <tbody>
                                                {aboutUsList.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <img src={`${IMG_URL}/AboutUS/${item.image1}`} alt="Image 1" style={{ width: "100%", height: "auto" }} />
                                                        </td>
                                                        <td>
                                                            <img src={`${IMG_URL}/AboutUS/${item.image2}`} alt="Image 2" style={{ width: "100%", height: "auto" }} />
                                                        </td>
                                                        <td>
                                                            <img src={`${IMG_URL}/AboutUS/${item.image3}`} alt="Image 3" style={{ width: "100%", height: "auto" }} />
                                                        </td>
                                                    </tr>
                                                ))}
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

export default AboutUS;
                                               