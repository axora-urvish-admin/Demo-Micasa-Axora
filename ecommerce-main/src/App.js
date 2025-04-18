import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Outlet, createBrowserRouter, createHashRouter, useLocation, useNavigate } from 'react-router-dom';
import '../src/MainComponent/Library/Fontawsome/Font-awsome.css';
import '../src/MainComponent/Library/Icomoonfont/icomoon.css';
import '../src/MainComponent/Library/elegant-icons/css/elegant.css';
import '../src/MainComponent/Library/feather-font/css/iconfont.css';
import '../src/MainComponent/Library/wpbingofont/css/wpbingofont.css';
import AddProductImg from './AdminComponent/AddProductImg';
import AdminDashBoard from './AdminComponent/AdminDashBoard';
import AdminUser from './AdminComponent/AdminUser';
import Banner from './AdminComponent/Banner';
import { BASE_URL } from './AdminComponent/BaseUrl';
import Brand from './AdminComponent/Brand';
import Category from './AdminComponent/Category'; 
import Color from './AdminComponent/Color';
import Gallery from './AdminComponent/Gallery';
import Group from './AdminComponent/Group';
import Header from './AdminComponent/Header';
import Orders from './AdminComponent/Orders';
import PageNotFound from './AdminComponent/PageNotFound';
import Product from './AdminComponent/Product';
import ProductApproval from './AdminComponent/ProductApproval';
import ProductCatalog from './AdminComponent/ProductCatalog';
import Productapprovalview from './AdminComponent/Productapprovalview';
import ReviewComment from './AdminComponent/ReviewComment';
import SettingPages from './AdminComponent/SettingPages';
import SocialMedia from './AdminComponent/SocialMedia';
import SubCatetgory from './AdminComponent/SubCategory';
import VendorForm from './AdminComponent/VendorForm';
import VendorMaster from './AdminComponent/VendorMaster';
import View from './AdminComponent/View';
import  Vendorview from './VendorComponents/View';
import WebLogin from './AdminComponent/WebLogin';
import './App.css';
import SiteFooter from './MainComponent/Layout/SiteFooter';
import SiteHeader from './MainComponent/Layout/SiteHeader';
import DetailPage from './MainComponent/Pages/DetailPage';
import DashBoard from './MainComponent/Pages/Home';
import ShopCart from './MainComponent/Pages/ShopCart';
import ShopProduct from './MainComponent/Pages/ShopProduct';
import ShopWishlist from './MainComponent/Pages/ShopWishlist';
import SiteLoader from './MainComponent/Ui/SiteLoader';
import './Responsive.css';
import './Style.css';
import VProduct from './VendorComponents/Product';
import { useDispatch } from 'react-redux';
import AddRole from './AdminComponent/AddRole';
import RoleAssignment from './AdminComponent/RoleAssignment';
import Checkout from './MainComponent/Pages/Checkout';
import OrderView from './MainComponent/Pages/ProfileComponent/OrderView';
import Profile from './MainComponent/Pages/ProfileComponent/Profile';
import Address from './MainComponent/Pages/ProfileComponent/ProfileAddress';
import ProfileOrder from './MainComponent/Pages/ProfileComponent/ProfileOrders';
import ProfileWish from './MainComponent/Pages/ProfileComponent/ProfileWish';
import { getCartCount } from './Store/Cart/cart-action';


// vendor Component

import '../src/MainComponent/Library/Fontawsome/Font-awsome.css';
import '../src/MainComponent/Library/Icomoonfont/icomoon.css';
import '../src/MainComponent/Library/elegant-icons/css/elegant.css';
import '../src/MainComponent/Library/feather-font/css/iconfont.css';
import '../src/MainComponent/Library/wpbingofont/css/wpbingofont.css';
import AboutUS from './AdminComponent/AboutUs';
import Adminuserform from './AdminComponent/Adminuserform';
import Advertisements from './AdminComponent/Advertisements';
import BlogCategory from './AdminComponent/BlogCategory';
import BlogPosts from './AdminComponent/BlogPosts';
import BrandRequest from './AdminComponent/BrandRequest';
import Breadcrumbs from './AdminComponent/Breadcrumbs';
import CancellationReasons from './AdminComponent/CancellationReasons';
import Deleteduser from './AdminComponent/Deleteduser';
import Faq from './AdminComponent/Faq';
import MyDocument from './AdminComponent/MyDocument';
import ProductTag from './AdminComponent/ProductTag';
import Returnrequest from './AdminComponent/Returnrequest';
import Returnrequestview from './AdminComponent/Returnrequestview';
import SalesReport from './AdminComponent/SalesReport';
import Seo from './AdminComponent/Seo';
import SeoForm from './AdminComponent/SeoForm';
import Tags from './AdminComponent/Tags';
import VendorRequest from './AdminComponent/VendorRequest';
import About from './MainComponent/Pages/About';
import Contact from './MainComponent/Pages/Contact';
import SiteFaq from './MainComponent/Pages/Faq';
import ImageGallery from './MainComponent/Pages/ImageGallery';
import PaymentFailed from './MainComponent/Pages/PaymentFailed';
import Privacy from './MainComponent/Pages/Privacy';
import Refund from './MainComponent/Pages/Refund';
import ShippingPolicy from './MainComponent/Pages/ShippingPolicy';
import Terms from './MainComponent/Pages/Terms';
import TestCorousel from './MainComponent/Pages/TestCorousel';
import ThankYou from './MainComponent/Pages/ThankYouPage';
import VendorRegister from './MainComponent/Pages/VendorRegistration';
import AddBrand from './VendorComponents/AddBrand';
import VendorHeader from './VendorComponents/Header';
import VendorOrder from './VendorComponents/Orders';
import AddProduct from './VendorComponents/Product';
import VendorProductCatalog from './VendorComponents/ProductCatalog';
import ProductStock from './VendorComponents/ProductStock';
import VendorLogin from './VendorComponents/VendorLogin';
import VendorSettingPages from './VendorComponents/VendorSettingPages';
import VendorUser from './VendorComponents/VendorUser';
import Advertise from './AdminComponent/Advertise';
import LocationMaster from './AdminComponent/LocationMaster';
import CustomizeRequest from './AdminComponent/CustomizeRequest';
import CustomizationPage from './MainComponent/Pages/CustomizationPage';
import MailTemp from './Utils/MailTemp';
import CommingSoon from './MainComponent/CommingSoon';
import GroupBreadcrum from './AdminComponent/GroupBreadcrum';
import CategoryBreadcrum from './AdminComponent/CategoryBreadcrum';
import SubCategoryBreadcrum from './AdminComponent/SubCategoryBreadcrum';
import Collection from './AdminComponent/Collection';
import ContectRequest from './AdminComponent/ContectRequest';
import AddVendorProductImg from './VendorComponents/AddVendorProductImg';
import VendorDashboard from './VendorComponents/VendorDashboard';





const Router = createBrowserRouter([
  {
    path: '/weblog',
    element: <WebLogin />
  },
  {
    path: '/mailtemp',
    element: <MailTemp />
  },
  // {
  //   path: '/splide',
  //   element: <CarouselWithThumbnails />
  // },
  {
    path: '/vendorlog',
    element: <VendorLogin />
  },
  {
    path: '/doc',
    element: <MyDocument />
  },
  {
    path: '/webapp/vendorform/:id',
    element: <VendorForm />
  },
  {
    path: '/webapp/addimages/:product_id/:product_name',
    element: <AddProductImg />
  },
  {
    path: '/webapp/addtags/:product_id/:product_name',
    element: <Tags />
  },
  {
    path: '/vendor/addimages/:product_id',
    element: <AddVendorProductImg />
  },
  {
    path: '/scarouser',
    element: <TestCorousel />
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <CommingSoon />
      },
      {
        path: '/home',
        element: <DashBoard />
      },
      {
        path: '/shopcart',
        element: <ShopCart />
      },
  
      {
        path: '/:brand_id',
        element: <ShopProduct />
      },

      {
        path: '/shopwishlist',
        element: <ShopWishlist />
      },
      {
        path: '/product/:productslug',
        element: <DetailPage />
      },
      {
        path: '/shoproduct',
        element: <ShopProduct />
      },
      {
        path: '/payment-success',
        element: <ThankYou />
      },
      {
        path: '/payment-failure',
        element: <PaymentFailed />
      },

      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/sitefaq',
        element: <SiteFaq />
      },
      {
        path: '/terms',
        element: <Terms />
      },
      {
        path: '/privacy',
        element: <Privacy />
      },
      {
        path: '/shippingpolicy',
        element: <ShippingPolicy />
      },
      {
        path: '/refund',
        element: <Refund />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/imagegallery',
        element: <ImageGallery />
      },
      {
        path: '/vendorregister',
        element: <VendorRegister />
      },
      {
        path: '/customizationpage',
        element: <CustomizationPage />
      },

      {
        path: '/shoproduct/:groupslug',
        element: <ShopProduct />
      },
      {
        path: '/shoproduct/:groupslug/:catslug',
        element: <ShopProduct />
      },
      {
        path: '/shoproduct/:groupslug/:catslug/:subcatslug',
        element: <ShopProduct />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/profile/wishlist',
        element: <ProfileWish />
      },
      {
        path: '/profile/address',
        element: <Address />
      },
      {
        path: '/profile/order',
        element: <ProfileOrder />
      },
      {
        path: '/profile/order/:orderid',
        element: <OrderView />
      },
      {
        path: '/checkout/:orderid',
        element: <Checkout />
      },
    ]
  },


  {
    path: '/webapp',
    element: <WebApp />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/webapp',
        element: <AdminDashBoard />
      },
      {
        path: '/webapp/gallery',
        element: <Gallery />
      },

      {
        path: '/webapp/vendormaster',
        element: <VendorMaster />
      },
      {
        path: '/webapp/adminuser',
        element: <AdminUser />
      },
      {
        path: '/webapp/adminuser/:userid',
        element: <Adminuserform />
      },
      {
        path: '/webapp/category/',
        element: <Category />
      },
      {
        path: '/webapp/Collection/',
        element: <Collection />
      },
      {
        path: '/webapp/group/',
        element: <Group />
      },
      {
        path: '/webapp/vendorrequest',
        element: <VendorRequest />
      },
      {
        path: '/webapp/customization',
        element: <CustomizeRequest />
      },
      {
        path: '/webapp/returnrequest',
        element: <Returnrequest />
      },
      {
        path: '/webapp/returnrequestview/:requestid',
        element: <Returnrequestview />
      },
      {
        path: '/webapp/productapproval',
        element: <ProductApproval />
      },
      {
        path: '/webapp/cancelreasons',
        element: <CancellationReasons />
      },
      {
        path: '/webapp/subcategory',
        element: <SubCatetgory />
      },
      {
        path: '/webapp/deleteduser',
        element: <Deleteduser />
      },
      {
        path: '/webapp/seo',
        element: <Seo />
      },
      {
        path: '/webapp/seo/:seoid',
        element: <SeoForm />
      },
      {
        path: '/webapp/Aboutus',
        element: <AboutUS />
      },

      {
        path: '/webapp/producttag',
        element: <ProductTag />
      },
      {
        path: '/webapp/salesreport',
        element: <SalesReport />
      },
      {
        path: '/webapp/product/:update_id',
        element: <Product />
      },

      {
        path: '/webapp/productcatalog',
        element: <ProductCatalog />

      },


      {
        path: '/webapp/brand',
        element: <Brand />
      },
      {
        path: '/webapp/brandrequest',
        element: <BrandRequest />
      },
      {
        path: '/webapp/orders',
        element: <Orders />
      },
      {
        path: '/webapp/Breadcrumbs',
        element: <Breadcrumbs />
      },
      {
        path: '/webapp/GroupBreadcrum',
        element: <GroupBreadcrum />
      },
      {
        path: '/webapp/ContectRequest',
        element: <ContectRequest />
      },
      {
        path: '/webapp/CategoryBreadcrum',
        element: <CategoryBreadcrum />
      },
      {
        path: '/webapp/SubCategoryBreadcrum',
        element: <SubCategoryBreadcrum />
      },
      {
        path: '/webapp/advertise',
        element: <Advertise />
      },
      {
        path: '/webapp/LocationMaster',
        element: <LocationMaster />
      },
   




      {
        path: '/webapp/view/:orderid',
        element: <View />
      },

      {
        path: '/webapp/banner',
        element: <Banner />
      },

      {
        path: '/webapp/reviewcomment',
        element: <ReviewComment />
      },


      {
        path: '/webapp/socialmedia',
        element: <SocialMedia />
      },

      {
        path: '/webapp/settings',
        element: <SettingPages />
      },
      {
        path: '/webapp/color',
        element: <Color />
      },
      {
        path: '/webapp/roleassign',
        element: <RoleAssignment />
      },
      {
        path: '/webapp/addrole',
        element: <AddRole />
      },
      {
        path: '/webapp/blogcategory',
        element: <BlogCategory />
      },
      {
        path: '/webapp/blogposts',
        element: <BlogPosts />
      },
      {
        path: '/webapp/faq',
        element: <Faq />
      },
      {
        path: '/webapp/productapprovalview/:productid',
        element: <Productapprovalview />
      },
      // {
      //   path: '/webapp/addimages/:product_id',
      //   element: <AddProductImg />
      // },

    ]
  },


  {
    path: '/vendor',
    element: <VendorApp />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/vendor',
        element: <VendorDashboard />
      },
      {
        path: '/vendor/addProduct/:update_id',
        element: <AddProduct />
      },

      {
        path: '/vendor/vendormaster',
        element: <VendorMaster />
      },
      {
        path: '/vendor/vendoruser',
        element: <VendorUser />
      },
      {
        path: '/vendor/',
        element: <VendorUser />
      },
      {
        path: '/vendor/product/:update_id',
        element: <VProduct />
      },

      {
        path: '/vendor/orders',
        element: <VendorOrder />
      },
      {
        path: '/vendor/productstock',
        element: <ProductStock />
      },
      {
        path: '/vendor/productcatalog',
        element: <VendorProductCatalog />
      },

      {
        path: '/vendor/view/:orderid',
        element: <Vendorview />
      },
      {
        path: '/vendor/addbrand',
        element: <AddBrand />
      },
      {
        path: '/vendor/settings',
        element: <VendorSettingPages />
      },



    ]
  }
])

function checkLocalStorageAndRedirect(navigate) {
  const user_id = Cookies.get('userid');
  if (user_id == null) {
    navigate('/weblog'); // Redirect to dashboard if id exists in localStorage
  }
}


function checkLocalStorage(navigate) {
  const user_id = Cookies.get('vendorid');
  if (user_id == null) {
    navigate('/vendorlog'); // Redirect to dashboard if id exists in localStorage
  }
}


function ScrollToTop() {
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function WebApp() {

  const [id, setId] = useState(null)

  async function accessSession() {
    axios.get(`${BASE_URL}/checkauth`)
      .then((res) => {
        if (res.data.valid) {
          // setId(res.data.id)
        } else {
          navigate('/weblog')
        }
      });
  }



  // axios.defaults.withCredentials = true

  const navigate = useNavigate();
  useEffect(() => {
    checkLocalStorageAndRedirect(navigate);
    accessSession()

  }, [navigate]);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);





  return (
    <>

      <div className="container-scroller row">
        <Header />
        <Outlet />
      </div>
    </>

  );
}

function VendorApp() {

  const [id, setId] = useState(null)

  async function accessSession() {
    axios.get(`${BASE_URL}/checkauth`)
      .then((res) => {
        if (res.data.valid) {
          // setId(res.data.id)
        } else {
          navigate('/vendorlog')
        }
      });
  }



  const navigate = useNavigate();
  useEffect(() => {
    checkLocalStorage(navigate);
    accessSession()
  }, [navigate]);








  return (
    <>
      <div className="container-scroller d-flex">
        {/* <Header /> */}
        <VendorHeader />
        <Outlet />
      </div>
    </>

  );
}



function App() {
  const { pathname } = useLocation();

  const [cartCount, setCartCount] = useState(0);








  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartCount())


  }, [pathname]);

  const location = useLocation();
  const excludedPaths = ['/about'];

  return (
    <>
      <ScrollToTop />
      {/* <div id="page" class="hfeed page-wrapper"> */}
      <SiteHeader cartCount={cartCount} />
      <Outlet  />
      {!excludedPaths.includes(location.pathname) && <SiteFooter />}
      {/* </div> */}
    </>

  );
}

export default Router;
