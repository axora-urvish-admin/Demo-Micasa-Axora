import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./BaseUrl";
import EditIcon from "@mui/icons-material/Edit";
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import img1 from "../assets/images/prof.png";
import decryptedUserId from "../Utils/UserID";

const SocialMedia = () => {
  const [social, setSocial] = useState([]);
  const [uid, setUpdateId] = useState([])

  const [value, setValue] = useState({
    title: "" || uid.title,
    link: "" || uid.link,
    colorcode: "" || uid.colorcode,
  });

  useEffect(() => {
    setValue({
      title: uid.title,
      link: uid.link,
      colorcode: uid.colorcode
    })
  }, [uid])

  async function getsocialData() {
    axios
      .get(`${BASE_URL}/social_data`)
      .then((res) => {
        console.log(res.data);
        setSocial(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getsocialData();
  }, []);


  const handleUpdate = (id) => {
    const data = {
      social_id: id
    }

    axios.post(`${BASE_URL}/social_update_data`, data)
      .then((res) => {
        console.log(res)
        setUpdateId(res.data[0])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  console.log(uid.title)



  const handleSubmit = (e,uid) => {
    e.preventDefault();

    const data = {
      title: value.title,
      link: value.link,
      colorcode: value.colorcode,
      user_id: decryptedUserId(),
      uid :uid
    };

    axios
      .post(`${BASE_URL}/update_social`, data)
      .then((res) => {
        alert(res.data);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onhandleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div class="container-fluid page-body-wrapper col-lg-10">
      <div class="main-panel">
        <header class="main-header">
          <div class="container-fluid">
            <div class="main-header-inner">
              <div class="page-title">
                <h1>Social Media Links</h1>
              </div>
              <div class="main-header-toolbar">
                <div class="header-action">
                  <div class="header-action__item">
                    <Link class="link"><DesktopWindowsRoundedIcon style={{ fontSize: "17px" }} /></Link>
                  </div>
                  <div class="header-action__item">
                    <Link class="link"><SearchRoundedIcon style={{ fontSize: "17px" }} /></Link>
                  </div>
                  <div class="header-action__item">
                    <Link class="link"><StorefrontOutlinedIcon style={{ fontSize: "17px" }} /></Link>
                  </div>
                  <div class="header-action__item">
                    <Link class="link"><NotificationsActiveTwoToneIcon style={{ fontSize: "17px" }} /></Link>
                  </div>

                  <div class="header-action__item header-acc">
                    <span class="header-account__img"><Link class="link"><img src={img1} alt="" /></Link></span>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </header>
        <div class="content-wrapper">
          <div class="breadcrumb-wrap">
            <ul class="breadcrumb ">
              <li class="breadcrumb-item">
                <a href="/admin">Home </a>
              </li>
              <li class="breadcrumb-item">
                <a href="/admin/subscription-orders">Social Media Links </a>
              </li>

            </ul>
          </div>
          <div class="row">
            <div class="col-md-6 ">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Add Links</h4>
                  <form class="forms-sample py-3" onSubmit={(e) =>handleSubmit(e,uid.id) }>
                    <div class="form-group">
                      <label for="title">Title </label>
                      {
                        uid.title ?
                          <input
                            type="text"
                            class="form-control"
                            id="title"
                            onChange={onhandleChange}
                            value={value.title}
                            placeholder="Title"
                            name="title"

                          /> : <input
                            type="text"
                            class="form-control"
                            id="title"

                            placeholder="Title"
                            name="title"
                            disabled

                          />}
                    </div>
                    <div class="form-group">
                      <label for="link">Link </label>
                      {
                        uid.title ? <input
                          type="text"
                          class="form-control"
                          value={value.link}
                          id="link"
                          onChange={onhandleChange}
                          placeholder="Enter Link"
                          name="link"


                        /> : <input
                          type="text"
                          class="form-control"

                          id="link"

                          placeholder="Enter Link"
                          name="link"
                          disabled


                        />
                      }

                    </div>
                    <div class="form-group">
                      <label for="insta">Colorcode </label>
                      {
                        uid.title ? <input
                          type="text"
                          class="form-control"
                          value={value.colorcode}
                          onChange={onhandleChange}
                          id="colorcode"
                          placeholder="Enter Color Code"
                          name="colorcode"

                        /> : <input
                          type="text"
                          class="form-control"

                          id="link"

                          placeholder="Enter Color Code"
                          name="link"
                          disabled


                        />
                      }

                    </div>


                    {uid.title ? <button type="submit" class="btn btn-sm btn-primary mr-2">
                      Update
                    </button> : null}

                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">List Of Links</h4>
                  <div class="table-responsive pt-3">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th width="18%">Sr. No.</th>
                          <th width="60%">Image</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {social.map((item, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.title}</td>
                              <td>
                                <Link>
                                  <EditIcon onClick={() => handleUpdate(item.id)} />
                                </Link>
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

export default SocialMedia;
