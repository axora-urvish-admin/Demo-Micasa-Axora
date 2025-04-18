import React, { useEffect, useState } from 'react'
import product1 from '../../assets/frontimg/product/1.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { getWishList, } from '../../Store/WishList/wishlist-actions';
import { removeFromWishList } from '../../Store/WishList/wishlist-actions';
import { ToastContainer, toast } from 'react-toastify';
import empty from '../../assets/frontimg/empty.gif'
import custdecryptedUserId from '../../Utils/CustUserid';
import { Link } from 'react-router-dom';
import { getCartCount } from '../../Store/Cart/cart-action';
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl';
import addToCart from '../../Utils/AddtoCart';
import { Helmet } from "react-helmet";
import axios from 'axios';
import useBreadcrumb from '../../Utils/Breadcrum';

const ShopWishlist = () => {
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    const wishList = useSelector((state) => state.wishlist.wishList);
    const breaddata = useBreadcrumb(14)
    const notify = () => toast("Removing Product");
    const addify = () => toast("Product added to the cart");
    const removeWishListItem = (data) => {
        // console.log(decryptedUserId());
        const id = data;
        const userId = custdecryptedUserId();
        const wishData = {
            id,
            userId,
        }
        dispatch(removeFromWishList(wishData));
        // dispatch(getWishList(userId));
        // dispatch(getCartCount())

    }
    useEffect(() => {
        const userId = custdecryptedUserId();

        dispatch(getWishList(userId));
    }, [])

    async function getmetadetail() {
        const data = {
            page_id: 14
        }
        axios.post(`${BASE_URL}/getmetadetail`, data)
            .then((res) => {
                setData(res.data[0])
            })
    }

    useEffect(() => {
        getmetadetail()
    }, [])


    return (
        <div id="page" class="hfeed page-wrapper">
            <ToastContainer theme="dark" position="bottom-right" />
            <div id="site-main" class="site-main">
                <Helmet>
                    <title>{data.seo_title}</title>
                    <meta name="description" content={data.seo_desc} dangerouslySetInnerHTML={{ __html: data.seo_desc }} />
                    <meta name="author" content={data.seo_title} />
                </Helmet>
                <div id="main-content" class="main-content">
                    <div id="primary" class="content-area">
                        <div id="title" className="page-title" style={{ backgroundImage: `url('${IMG_URL}/Breadcrumbs/${breaddata}')` }}>
                            <div class="section-container d-flex justify-content-center">
                                <div class="content-title-heading">

                                </div>
                                <div
                                    class="breadcrumbs bg-light"
                                    style={{
                                        width: "fit-content",
                                        padding: "5px 10px",
                                    }}
                                >
                                    <Link href="index.html">Home</Link><span class="delimiter"></span><Link href="shop-grid-left.html">Shop</Link><span class="delimiter"></span>Wishlist
                                </div>
                            </div>
                        </div>

                        <div id="content" class="site-content" role="main">
                            <div class="section-padding">
                                <div class="section-container p-l-r">
                                    <div class="shop-wishlist">
                                        <div className='text-center'>
                                            {wishList.length == 0 && <img src={empty} alt='' />}
                                            {wishList.length == 0 && <h3>Your wishlist is empty</h3>}
                                        </div>
                                        <table class="wishlist-items">
                                            <tbody>
                                                {wishList?.map((wishItem) => {
                                                    return (
                                                        <tr class="wishlist-item">
                                                            <td class="wishlist-item-remove" onClick={() => {
                                                                removeWishListItem(wishItem.id)
                                                                notify()
                                                            }} ><span></span></td>
                                                            <td class="wishlist-item-image">
                                                                <Link href="shop-details.html">
                                                                    <img width="600" height="600" src={`${IMG_URL}/productimg/` + wishItem.image1} alt="" />
                                                                </Link>
                                                            </td>
                                                            <td class="wishlist-item-info">
                                                                <div class="wishlist-item-name">
                                                                    <Link href="shop-details.html">{wishItem.title}</Link>
                                                                </div>
                                                                {wishItem.price ? (<div class="wishlist-item-price">
                                                                    <del aria-hidden="true"><span><span>&#8377;</span> {wishItem.price}</span></del>
                                                                    <ins><span>{wishItem.disc_price}</span></ins>
                                                                </div>) : (
                                                                    <div class="wishlist-item-price">
                                                                        <span><span>&#8377;</span> {wishItem.disc_price}</span>
                                                                    </div>
                                                                )}
                                                                {/* <div class="wishlist-item-time">June 6, 2022</div> */}
                                                            </td>
                                                            <td class="wishlist-item-actions">
                                                                <div class="wishlist-item-stock">
                                                                    {wishItem.stock > 0 ? <span >In stock</span> : <span className='text-danger'>Out of stock</span>}
                                                                </div>
                                                                <div class="wishlist-item-add">
                                                                    {wishItem.stock > 0 && <div class="btn-add-to-cart" data-title="Add to cart">
                                                                        <Link rel="nofollow" onClick={() => {
                                                                            addToCart(wishItem.prod_id, wishItem.title, wishItem.catid, wishItem.disc_price, dispatch, 1, wishItem.v_id, wishItem.gst);
                                                                            removeWishListItem(wishItem.id)
                                                                            addify();
                                                                        }} class="product-btn button">Add to cart</Link>
                                                                    </div>}

                                                                </div>
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
    )
}

export default ShopWishlist