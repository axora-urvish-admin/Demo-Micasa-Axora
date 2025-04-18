import React from 'react'
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import img1 from "../assets/images/prof.png";

const InnerHeader = () => {

    const location = useLocation();
    const getPageName = () => {
        switch (location.pathname) {
            case '/webapp':
                return 'Dashboard';
            case '/webapp/vendormaster':
                return 'Vendor Master';
            case '/vendor/productcatalog':
                return 'Product Catalog';
            case '/vendor/orders':
                return 'Orders';
            case '/vendor/settings':
                return 'Settings';
            case '/vendor/vendoruser':
                return 'Vendor User';
            case '/vendor/addProduct/:update_id':
                return 'Add Product';
            case '/vendor/addbrand':
                return 'Add Brand';
            case '/vendor/productstock':
                return 'Product Stock';
            case '/vendor/Breadcrumbs':
                return 'Breadcrumbs';
         

            default:
                return '';
        }
    };
    return (
        <div>
            <header class="main-header">
                <div class="container-fluid">
                    <div class="main-header-inner">
                        <div class="page-title">
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