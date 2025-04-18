import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ProfileSidebar from '../../Subcomponents/ProfileSidebar';
import { getCartCount } from '../../../Store/Cart/cart-action';
import { getWishList, removeFromWishList } from '../../../Store/WishList/wishlist-actions';
import custdecryptedUserId from '../../../Utils/CustUserid';
import { IMG_URL } from '../../../AdminComponent/BaseUrl';
import addToCart from '../../../Utils/AddtoCart';

const ProfileWish = () => {
    const dispatch = useDispatch();
    const wishList = useSelector((state) => state.wishlist.wishList);
    const [sidebarOpen, setSidebarOpen] = useState(false);
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

    const userId = custdecryptedUserId();


    useEffect(() => {
        dispatch(getWishList(userId));

    }, [])
    
    return (
        <div className='row p-5' style={{marginTop:"5rem"}}>
            <div className='col-lg-4 col-md-4 col-12'>
                <button
                    className='btn d-md-none' 
                    onClick={() => setSidebarOpen(!sidebarOpen)} 
                    style={{ marginBottom: "1rem",backgroundColor:"#000000", color:"#ffffff" }}>
                    {sidebarOpen ? 'Hide Menu' : 'Show Menu'}
                </button>
               
                <div style={{ display: (sidebarOpen || window.innerWidth > 768) ? 'block' : 'none', transition: 'all 0.3s ease-in-out',}}>
                    <ProfileSidebar />
                </div>
            </div>
            <div className='col-lg-8 col-md-4 col-12'>
                <div id="page" class="hfeed page-wrapper">
                    <ToastContainer theme="dark"     position="bottom-right" />
                    <div id="site-main" class="site-main">
                        <div id="main-content" class="main-content">
                            <div id="primary" class="content-area">
                              

                                <div id="content" class="site-content" role="main">
                                    <div class="section-padding">
                                        <div class="section-container p-l-r">
                                            <div class="shop-wishlist">
                                                <div className='text-center'>
                                                    {wishList.length == 0 && <img  alt='' />}
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
                                                                            <img width="600" height="600" src={`${IMG_URL}/productimg/` + wishItem.image1}  alt="" />
                                                                        </Link>
                                                                    </td>
                                                                    <td class="wishlist-item-info">
                                                                        <div class="wishlist-item-name">
                                                                            <Link href="shop-details.html">{wishItem.title}</Link>
                                                                        </div>
                                                                        {wishItem.disc_price ? (<div class="wishlist-item-price">
                                                                            <del aria-hidden="true"><span><span>&#8377;</span> {wishItem.price}</span></del>
                                                                            <ins><span>{wishItem.disc_price}</span></ins>
                                                                        </div>) : (
                                                                            <div class="wishlist-item-price">
                                                                                <span><span>&#8377;</span> {wishItem.price}</span>
                                                                            </div>
                                                                        )}
                                                                        <div class="wishlist-item-time">June 6, 2022</div>
                                                                    </td>
                                                                    <td class="wishlist-item-actions">
                                                                        <div class="wishlist-item-stock">
                                                                            In stock
                                                                        </div>
                                                                        <div class="wishlist-item-add">
                                                                            <div class="btn-add-to-cart" data-title="Add to cart">
                                                                            <Link rel="nofollow" onClick={() =>{
                                                                                addToCart(wishItem.prod_id, wishItem.title, wishItem.catid, wishItem.price, dispatch);
                                                                                 addify();
                                                                        }} href="#" class="product-btn button">Add to cart</Link>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                        {/* <tr class="wishlist-item">
                                            <td class="wishlist-item-remove"><span></span></td>
                                            <td class="wishlist-item-image">
                                                <Link href="shop-details.html">
                                                    <img width="600" height="600" src={product1} alt="" />
                                                </Link>
                                            </td>
                                            <td class="wishlist-item-info">
                                                <div class="wishlist-item-name">
                                                    <Link href="shop-details.html">Pillar Dining Table Round</Link>
                                                </div>
                                                <div class="wishlist-item-price">
                                                    <del aria-hidden="true"><span>$150.00</span></del>
                                                    <ins><span>$100.00</span></ins>
                                                </div>
                                                <div class="wishlist-item-time">June 6, 2022</div>
                                            </td>
                                            <td class="wishlist-item-actions">
                                                <div class="wishlist-item-stock">
                                                    In stock
                                                </div>
                                                <div class="wishlist-item-add">
                                                    <div class="btn-add-to-cart" data-title="Add to cart">
                                                        <Link rel="nofollow" href="#" class="product-btn button">Add to cart</Link>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr> */}
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
            </div>
        </div>


    )
}

export default ProfileWish