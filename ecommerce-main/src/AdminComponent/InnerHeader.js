import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img1 from "../assets/images/prof.png";

const InnerHeader = () => {

    const location = useLocation();
    const getPageName = () => {
        switch (location.pathname) {
            case '/webapp':
                return 'Dashboard';
            case '/webapp/vendormaster':
                return 'Vendor Master';
            case '/webapp/adminuser':
                return 'Admin Users';
            case '/webapp/productcatalog':
                return 'Products';
            case '/webapp/category':
                return 'Category';
            case '/webapp/subcategory':
                return 'SubCategory';
            case '/webapp/brand':
                return 'Brand';
            case '/webapp/Collection':
                return 'Collection';
            case '/webapp/productapproval':
                return 'Product Request';
            case '/webapp/orders':
                return 'Orders';
            case '/webapp/banner':
                return 'Banner';
            case '/webapp/socialmedia':
                return 'Social Media';
            case '/webapp/gallery':
                return 'Gallery';
            case '/webapp/settings':
                return 'Settings';
            case '/webapp/vendorrequest':
                return 'Vendor Request';
            case '/webapp/group':
                return 'Group';
            case '/webapp/addrole':
                return 'Add Role';
            case '/webapp/roleassign':
                return 'Role Assign';
            case '/webapp/brandrequest':
                return 'Brand Request';
            case '/vendor/addbrand':
                return 'Add Brand';
            case '/webapp/deleteduser':
                return 'Deleted Users';
            case '/webapp/color':
                return 'Colour';
            case '/webapp/Breadcrumbs':
                return 'Breadcrumbs';
            case '/webapp/GroupBreadcrum':
                return 'GroupBreadcrum';
            case '/webapp/CategoryBreadcrum':
                return 'CategoryBreadcrum';
            case '/webapp/SubCategoryBreadcrum':
                return 'SubCategoryBreadcrum';
            case '/webapp/customization':
                return 'customization';
            case '/webapp/Advertise':
                return 'Advertise';
            case '/webapp/SlotMaster':
                return 'SlotMaster';
            case '/webapp/LocationMaster':
                return 'LocationMaster';
            case '/webapp/product':
                return 'Add Product';
            case '/webapp/ContectRequest':
                return 'ContectRequest';
            case location.pathname.match(/^\/addservice\/\d+$/) ? location.pathname : '':
                return 'Add Service'
            case location.pathname.match(/^\/webapp\/addimages\/\d+$/) ? location.pathname : '':
                return 'Add Images'
            case location.pathname.match(/^\/webapp\/view\/\d+$/) ? location.pathname : '':
                return 'Order Details'

            default:
                return '';
        }
    };


    const navigate = useNavigate()
    return (
        <div>
            <header class="main-header">
                <div class="container-fluid">
                    <div class="main-header-inner">

                        <ArrowCircleLeftSharpIcon onClick={() => navigate(-1)} class="arrow" />

                        <div class="page-title px-2" >
                            <h1>{getPageName()}</h1>
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
        </div>
    )
}

export default InnerHeader