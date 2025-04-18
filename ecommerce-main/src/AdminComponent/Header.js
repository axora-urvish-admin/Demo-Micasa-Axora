import { mdiAccountArrowRightOutline, mdiAccountDetails, mdiAccountGroupOutline, mdiAccountOutline, mdiAccountRemoveOutline, mdiAdvertisements, mdiApplicationBracketsOutline, mdiApps, mdiCartOutline, mdiCheckDecagram, mdiFormatColorFill, mdiFormatListBulletedSquare, mdiFrequentlyAskedQuestions, mdiImageArea, mdiInformationVariantBoxOutline, mdiLandPlotsCircle, mdiLinkVariant, mdiMap, mdiMenu, mdiNavigationVariant, mdiNavigationVariantOutline, mdiNotebookEditOutline, mdiNut, mdiOrderBoolAscending, mdiPost, mdiRotateRight, mdiSearchWeb, mdiSelectMultipleMarker, mdiStarBox, mdiTagMultipleOutline, mdiTools, mdiViewGallery } from '@mdi/js';
import Icon from '@mdi/react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Header = () => {

  const [openStates, setOpenStates] = useState({
    order: false,
    product: false,
    home: false,
    usermanage: false,
    request: false,
    blog: false,
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
    <nav className="sidebar sidebar-offcanvas col-lg-2 p-3" id="sidebar" wordBreak='break-word' overflowWrap='break-word'>
      <ul className="nav">

        <li className="nav-item">
          <Link className="nav-link" to="/webapp">
            <Icon path={mdiMenu} size={1} className='mx-3' />
            <span className="menu-title">Dashboard</span>
            {/* <div className="badge badge-info badge-pill">2</div> */}
          </Link>
        </li>
        <li className="nav-item sidebar-category">
          <p>Master</p>
          <span></span>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/webapp/vendormaster">
            <Icon path={mdiAccountGroupOutline} size={1} className='mx-3' />
            <span className="menu-title">Vendor Master</span>
          </Link>
        </li>

        <li className="nav-item" onClick={() => handleToggle('product')}>
          <div className="nav-link" >
            <Icon path={mdiFormatListBulletedSquare} size={1} className='mx-3' />
            <span className="menu-title">Product Manage</span>
            {openStates.product ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>
        </li>

        <Collapse in={openStates.product} timeout="auto" unmountOnExit>
          <ul className='inner-item'>

            <li className="nav-item">
              <Link className="nav-link" to='/webapp/group'>
                <Icon path={mdiLandPlotsCircle} size={1} className='mx-3' />
                <span className="menu-title">Group</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/category'>
                <Icon path={mdiLandPlotsCircle} size={1} className='mx-3' />
                <span className="menu-title">Category</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/subcategory'>
                <Icon path={mdiApps} size={1} className='mx-3' />
                <span className="menu-title">SubCategory</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/brand'>
                {/* <Icon path={mdiMagnifyPlusOutline} size={1}  /> */}
                <Icon path={mdiStarBox} size={1} className='mx-3' />
                <span className="menu-title">Brand</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/color'>
                {/* <Icon path={mdiMagnifyPlusOutline} size={1}  /> */}
                <Icon path={mdiFormatColorFill} size={1} className='mx-3' />
                <span className="menu-title">Color</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/producttag'>
                {/* <Icon path={mdiMagnifyPlusOutline} size={1}  /> */}
                <Icon path={mdiTagMultipleOutline} size={1} className='mx-3' />
                <span className="menu-title">Product Tag</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/productcatalog'>
                <Icon path={mdiMap} size={1} className='mx-3' />
                <span className="menu-title">Products</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/webapp/Collection'>
                <Icon path={mdiMap} size={1} className='mx-3' />
                <span className="menu-title">Collection</span>
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link" to='/webapp/productapproval'>
                <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
                <span className="menu-title">Product Approval</span>
              </Link>
            </li> */}


          </ul>
        </Collapse>

        <li className="nav-item" onClick={() => handleToggle('request')}>
          <div className="nav-link" >
            <Icon path={mdiAccountDetails} size={1} className='mx-3' />
            <span className="menu-title">Request</span>
            {openStates.request ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>
        </li>


        <Collapse in={openStates.request} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/vendorrequest'>
                <Icon path={mdiAccountArrowRightOutline} size={1} className='mx-3' />
                <span className="menu-title">Vendor Request</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/brandrequest'>
                <Icon path={mdiStarBox} size={1} className='mx-3' />
                <span className="menu-title">Brand Request</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/productapproval'>
                <Icon path={mdiCheckDecagram} size={1} className='mx-3' />
                <span className="menu-title">Product Request</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/returnrequest'>
                <Icon path={mdiRotateRight} size={1} className='mx-3' />
                <span className="menu-title">Return Request</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/customization'>
                <Icon path={mdiTools} size={1} className='mx-3' />
                <span className="menu-title">Cutiomization</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/ContectRequest'>
                <Icon path={mdiAccountOutline} size={1} className='mx-3' />
                <span className="menu-title">Contect</span>
              </Link>
            </li>

          </ul>
        </Collapse>

        <li className="nav-item" onClick={() => handleToggle('usermanage')}>
          <div className="nav-link" >

            <Icon path={mdiAccountDetails} size={1} className='mx-3' />
            <span className="menu-title">User Master</span>
            {openStates.usermanage ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>
        </li>


        <Collapse in={openStates.usermanage} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/addrole'>
                <Icon path={mdiAccountOutline} size={1} className='mx-3' />
                <span className="menu-title">Add Role</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/adminuser'>
                <Icon path={mdiAccountOutline} size={1} className='mx-3' />
                <span className="menu-title">Admin User</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/webapp/roleassign'>
                <Icon path={mdiAccountOutline} size={1} className='mx-3' />
                <span className="menu-title">Role Page</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/deleteduser'>
                <Icon path={mdiAccountRemoveOutline} size={1} className='mx-3' />
                <span className="menu-title">Deleted Users</span>
              </Link>
            </li>

          </ul>
        </Collapse>

















        <li className="nav-item" onClick={() => handleToggle('order')}>
          <div className="nav-link" >
            <Icon path={mdiCartOutline} size={1} className='mx-3' />
            <span className="menu-title">Orders</span>
            {openStates.order ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>
        </li>

        <Collapse in={openStates.order} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/orders'>
                <Icon path={mdiOrderBoolAscending} size={1} className='mx-3' />
                <span className="menu-title">Orders</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/cancelreasons'>
                <Icon path={mdiNotebookEditOutline} size={1} className='mx-3' />
                <span className="menu-title">Cancellation reasons</span>
              </Link>
            </li>
          </ul>
        </Collapse>

        <li className="nav-item" onClick={() => handleToggle('blog')}>
          <div className="nav-link" >
            <Icon path={mdiPost} size={1} className='mx-3' />
            <span className="menu-title">Blog</span>
            {openStates.blog ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>
        </li>


        <Collapse in={openStates.blog} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/blogcategory'>
                <Icon path={mdiLandPlotsCircle} size={1} className='mx-3' />
                <span className="menu-title">Blog Category</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/blogposts'>
                <Icon path={mdiPost} size={1} className='mx-3' />
                <span className="menu-title">Blog Posts</span>
              </Link>
            </li>


          </ul>
        </Collapse>

        <li className="nav-item" onClick={() => handleToggle('home')}>
          <div className="nav-link" >

            <Icon path={mdiApplicationBracketsOutline} size={1} className='mx-3' />
            <span className="menu-title">Cms</span>
            {openStates.home ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>


        </li>
        <Collapse in={openStates.home} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/banner'>

                <Icon path={mdiImageArea} size={1} className='mx-3' />
                <span className="menu-title">Banner</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/socialmedia'>
                {/* <Icon path={mdiCheckDecagram} size={1} className='mx-3' /> */}
                <Icon path={mdiLinkVariant} size={1} className='mx-3' />
                <span className="menu-title">Social Link</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/gallery'>
                {/* <Icon path={mdiCheckDecagram} size={1} className='mx-3' /> */}
                <Icon path={mdiViewGallery} size={1} className='mx-3' />
                <span className="menu-title">Gallery</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/faq'>
                {/* <Icon path={mdiCheckDecagram} size={1} className='mx-3' /> */}
                <Icon path={mdiFrequentlyAskedQuestions} size={1} className='mx-3' />
                <span className="menu-title">Faq</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/aboutus'>
                {/* <Icon path={mdiCheckDecagram} size={1} className='mx-3' /> */}
                <Icon path={mdiInformationVariantBoxOutline} size={1} className='mx-3' />
                <span className="menu-title">About Us</span>
              </Link>
            </li>

          </ul>
        </Collapse>


        <li className="nav-item" onClick={() => handleToggle('Breadcrumbs')}>
          <div className="nav-link" >
            <Icon path={mdiNavigationVariant} size={1} className='mx-3' />
            <span className="menu-title">Breadcrumbs</span>
            {openStates.Breadcrumbs ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>
        </li>
        <Collapse in={openStates.Breadcrumbs} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/Breadcrumbs'>
                <Icon path={mdiNavigationVariantOutline} size={1} className='mx-3' />
                <span className="menu-title">Breadcrumbs</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/webapp/GroupBreadcrum'>
                <Icon path={mdiNavigationVariantOutline} size={1} className='mx-3' />
                <span className="menu-title">Group Breadcrum</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/webapp/CategoryBreadcrum'>
                <Icon path={mdiNavigationVariantOutline} size={1} className='mx-3' />
                <span className="menu-title">Category Breadcrum</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/webapp/SubCategoryBreadcrum'>
                <Icon path={mdiNavigationVariantOutline} size={1} className='mx-3' />
                <span className="menu-title">Subcate Breadcrum</span>
              </Link>
            </li>

          </ul>
        </Collapse>

        <li className="nav-item" onClick={() => handleToggle('Advertise')}>
          <div className="nav-link" >
            <Icon path={mdiAdvertisements} size={1} className='mx-3' />
            <span className="menu-title">Advertisements</span>
            {openStates.Advertise ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>
        </li>
        <Collapse in={openStates.Advertise} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
          <li className="nav-item">
              <Link className="nav-link" to='/webapp/LocationMaster'>
                <Icon path={mdiSelectMultipleMarker} size={1} className='mx-3' />
                <span className="menu-title">Location Master</span>
              </Link>
            </li>
          
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/Advertise'>
                <Icon path={mdiAdvertisements} size={1} className='mx-3' />
                <span className="menu-title">Advertisements</span>
              </Link>
            </li>
          </ul>
        </Collapse>

        <li className="nav-item" onClick={() => handleToggle('report')}>
          <div className="nav-link" >

            <Icon path={mdiApplicationBracketsOutline} size={1} className='mx-3' />
            <span className="menu-title">Reports</span>
            {openStates.report ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>


        </li>
        <Collapse in={openStates.report} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/salesreport'>
                <Icon path={mdiImageArea} size={1} className='mx-3' />
                <span className="menu-title">Sales Report</span>
              </Link>
            </li>
      

          </ul>
        </Collapse>


        <li className="nav-item">
          <Link className="nav-link" to='/webapp/seo'>
            <Icon path={mdiSearchWeb} size={1} className='mx-3' />
            <span className="menu-title">Seo</span>
          </Link>
        </li>

        <li className="nav-item" onClick={() => handleToggle('settings')}>
          <div className="nav-link" >

            <Icon path={mdiNut} size={1} className='mx-3' />
            <span className="menu-title">Settings</span>
            {openStates.settings ? <ExpandLess className='mx-3' /> : <ExpandMore className='mx-3' />}
          </div>

        </li>

        <Collapse in={openStates.settings} timeout="auto" unmountOnExit>
          <ul className='inner-item'>
            <li className="nav-item">
              <Link className="nav-link" to='/webapp/settings'>
                <Icon path={mdiNut} size={1} className='mx-3' />
                <span className="menu-title">Password/Tax</span>
              </Link>
            </li>
         
          </ul>
        </Collapse>


      </ul>
    </nav>
  )
}

export default Header