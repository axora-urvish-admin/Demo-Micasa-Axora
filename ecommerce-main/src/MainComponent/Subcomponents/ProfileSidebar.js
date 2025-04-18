import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  mdiAccount,
  mdiAccountOutline,
  mdiGiftOutline,
  mdiHeartOutline,
  mdiLocationExit,
  mdiMapMarkerOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import Cookies from "js-cookie";

const ProfileSidebar = () => {
  const Navigate = useNavigate();
  const handlelogout = () => {
    Cookies.remove("custuserid");
    Cookies.remove("orderid");
    localStorage.clear("custuserid");
    localStorage.clear("orderid");
    Navigate("/home");
  };

  const name = localStorage.getItem("Name");
  return (
    <div className="shadow-sm p-3 mb-5 bg-body rounded">
      <div className="py-3">
        {/* <p className=''>Guest User</p> */}
        <h4 className="">
          {" "}
          <Icon path={mdiAccount} size={1} />
          {name}
        </h4>
      </div>
      <div className="bg-light py-2">
        <p className="px-2">DashBoard</p>
      </div>

      <Link to="/profile/order">
        <div className="py-2">
          <h5>
            {" "}
            <Icon path={mdiGiftOutline} size={1} /> Orders
          </h5>
        </div>
      </Link>
      <Link to="/profile/wishlist">
        <div className="py-2">
          <h5>
            <Icon path={mdiHeartOutline} size={1} /> Wishlist
          </h5>
        </div>
      </Link>
      <Link to="">
        <div className="py-2">
          <h5>
            <Icon path={mdiMapMarkerOutline} size={1} /> Order tracking
          </h5>
        </div>
      </Link>
      <div className="bg-light py-2">
        <p className="px-2">Account Setting</p>
      </div>
      <Link to="/profile">
        <div className="py-2">
          <h5>
            <Icon path={mdiAccountOutline} size={1} /> Profile Info
          </h5>
        </div>
      </Link>
      <Link to="/profile/address">
        <div className="py-2">
          <h5>
            <Icon path={mdiMapMarkerOutline} size={1} /> Address{" "}
          </h5>
        </div>
      </Link>
      <Link
        to="/"
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm("Are you sure you want to sign out?")) {
            handlelogout();
          }
        }}
      >
        <div className="py-2">
          <h5>
            <Icon path={mdiLocationExit} size={1} /> Sign Out{" "}
          </h5>
        </div>
      </Link>
    </div>
  );
};

export default ProfileSidebar;
