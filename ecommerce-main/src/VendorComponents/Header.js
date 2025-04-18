import { mdiAccountGroupOutline, mdiAccountOutline, mdiApps, mdiCartOutline, mdiCheckDecagram, mdiFormatColorFill, mdiFormatListBulletedSquare, mdiHome, mdiImageArea, mdiLandPlotsCircle, mdiLinkVariant, mdiMap, mdiMenu, mdiPlusBox, mdiStarBox, mdiViewGallery } from '@mdi/js';
import Icon from '@mdi/react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';


const VendorHeader = () => {

  const [openStates, setOpenStates] = useState({
    order: false,
    product: false,
    home: false,
    // Add more menu items as needed
  });

  const handleToggle = (itemName) => {
    setOpenStates((prevState) => {
      // If the clicked item is already true, toggle it to false
      if (prevState[itemName]) {
        return {
          ...prevState,
          [itemName]: false
        };
      } else {
        // Create a new state object where all items are set to false
        const newState = Object.fromEntries(Object.keys(prevState).map(key => [key, false]));
        // Set the clicked item to true
        newState[itemName] = true;
        return newState;
      }
    });
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar" wordBreak='break-word' overflowWrap='break-word'>
      <ul className="nav">

        <li className="nav-item">
          <Link className="nav-link" to="/vendor">
            <Icon path={mdiMenu} size={1} className='mx-3' />
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item sidebar-category">
          <p>Master</p>
          <span></span>
        </li>

        {/* <li className="nav-item">
          <Link className="nav-link" to='/vendor/vendoruser'>
            <Icon path={mdiAccountOutline} size={1} className='mx-3' />
            <span className="menu-title">Vendor User</span>
          </Link>
        </li> */}

        <li className="nav-item" onClick={() => handleToggle('product')}>
          <div className="nav-link" >
            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">Products</span>
            {openStates.product ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>
        </li>

        <Collapse in={openStates.product} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

     
            <li className="nav-item">
              <Link className="nav-link" to='/vendor/productcatalog'>
                <Icon path={mdiMap} size={1} className='mx-3' />
                <span className="menu-title">Product Catalog</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/vendor/productstock'>
                <Icon path={mdiMap} size={1} className='mx-3' />
                <span className="menu-title">Product Stock</span>
              </Link>
            </li>
       

          </ul>
        </Collapse>



        <li className="nav-item" >
          <Link className="nav-link" to='/vendor/orders'>
            <Icon path={mdiCartOutline} size={1} className='mx-3' />
            <span className="menu-title">Orders</span>
          </Link>
        </li>

        <li className="nav-item" >
          <Link className="nav-link" to='/vendor/addbrand'>
            <Icon path={mdiPlusBox} size={1} className='mx-3' />
            <span className="menu-title">Add Brand</span>
          </Link>
        </li>
        
        <Collapse timeout="auto" unmountOnExit>
          <ul className='inner-item'>
      
          </ul>
        </Collapse>



        <li className="nav-item">
          <Link className="nav-link" to="/vendor/settings">
            <Icon path={mdiAccountGroupOutline} size={1} className='mx-3' />
            <span className="menu-title">Settings</span>
          </Link>
        </li>


      </ul>
    </nav>
  )
}

export default VendorHeader