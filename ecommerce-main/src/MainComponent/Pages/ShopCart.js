import React, { useEffect, useState } from 'react'
import product1 from '../../assets/frontimg/product/1.jpg'
import axios from 'axios'
import { BASE_URL, IMG_URL } from '../../AdminComponent/BaseUrl'
import Cookies from 'js-cookie'
import custdecryptedUserId from '../../Utils/CustUserid'
import { Link, useNavigate } from 'react-router-dom'
import empty from '../../assets/frontimg/empty.gif'
import LoginForm from '../Authentication/LoginForm'
import { getCartCount } from '../../Store/Cart/cart-action'
import { useDispatch } from 'react-redux'
import { Helmet } from "react-helmet";
import useBreadcrumb from '../../Utils/Breadcrum'

const ShopCart = ({ fetchcount }) => {
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])
  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = useState(false);
  const breaddata = useBreadcrumb(12)
  const orderid = Cookies.get(`orderid`)
  const handleToggle = (e) => {
    setOpen(!open);
    
  }


  const handleLoginSuccess = () => {
    setOpen(false);
    // console.log("Login was successful!");
    // alert("Login was successful!");
    Navigate(`/checkout/${orderid}`);
  };


  const handleIncrease = (itemId, proid, qty, stock) => {
    setQuantities(prevQuantities => {
      const currentQty = prevQuantities[itemId] || Number(qty);
      const updatedQty = currentQty < stock ? currentQty + 1 : stock; // Ensure it doesn't exceed stock
  
      const data = {
        pqty: updatedQty,  // Use the updated quantity
        order_id: Cookies.get(`orderid`),
        p_id: proid
      };
  
      if (currentQty < stock) { // Only update the API if quantity is increasing
        axios.post(`${BASE_URL}/update_proqty`, data)
          .then(() => {
            getcartdata();
          });
      }
  
      return {
        ...prevQuantities,
        [itemId]: updatedQty
      };
    });
  };
  
  



  const handleDecrease = (itemId, proid, qty) => {
    setQuantities(prevQuantities => {
      const updatedQty = Math.max((prevQuantities[itemId] || Number(qty)) - 1, 1);
  
      const data = {
        pqty: updatedQty,  // Use the updated quantity
        order_id: Cookies.get(`orderid`),
        p_id: proid
      };
  
      axios.post(`${BASE_URL}/update_proqty`, data)
        .then(() => {
          getcartdata();
        });
  
      return {
        ...prevQuantities,
        [itemId]: updatedQty
      };
    });
  };
  

  async function getcartdata() {

    const data = {
      order_id: Cookies.get(`orderid`)
    }

    axios.post(`${BASE_URL}/getcartData`, data)
      .then((res) => {
        console.log(res)

        setCart(res.data)
        // setQuantities(quantities[4] || res.data.pqty)


      })
  }

  useEffect(() => {
    getcartdata()
  }, [])

  const dispatch = useDispatch();

  const handledelete = (id) => {
    const data = {
      cart_id: id
    }

    axios.post(`${BASE_URL}/removecartitem`, data)
      .then((res) => {
        console.log(res)
        getcartdata()
        dispatch(getCartCount())

        if (fetchcount) {
          fetchcount(res.data[0]);
        }

      })
      .catch((err) => {
        console.log(err)
      })
  }

  const Navigate = useNavigate()

  const handleprocess = (orderid) =>{
    if(totalPrice > 0){
      Navigate(`/checkout/${orderid}`)
      
    }else{
      alert(`Please add something in cart`)
    }
  }



  const totalPrice = cart.reduce((acc, item) => {
    const itemTotal = item.price * item.pqty; // Use 1 as default quantity if not 
    return acc + itemTotal;
  }, 0);

  async function getmetadetail() {
    const data = {
        page_id: 12
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
    <div>
      <div id="page" class="hfeed page-wrapper">
        <div id="site-main" class="site-main">
                <Helmet>
                    <title>{data.seo_title}</title>
                    <meta name="description" content={data.seo_desc} dangerouslySetInnerHTML={{ __html: data.seo_desc }} />
                    <meta name="author" content={data.seo_title} />
                </Helmet>
          <div id="main-content" class="main-content">
            <div id="primary" class="content-area">
            <div id="title" className="page-title" style={{backgroundImage:`url('${IMG_URL}/Breadcrumbs/${breaddata}')`}}>
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
                    <Link href="index.html">Home</Link><span class="delimiter"></span><Link href="shop-grid-left.html">Shop</Link><span class="delimiter"></span>Shopping Cart
                  </div>
                </div>
              </div>

              <div id="content" class="site-content" role="main">
                <div class="section-padding">
                  <div class="section-container p-l-r">
                    <div class="shop-cart">
                      <div class="row">
                        
                        {/* <div class="col-xl-8 col-lg-12 col-md-12 col-12">
                          <div className='text-center'>
                            {cart.length == 0 && <img src={empty} alt='' />}
                            {cart.length == 0 && <h3>Your cart is empty</h3>}

                          </div>
                          <form class="cart-form" action="" method="post">
                            <div class="table-responsive">
                              {cart.length !== 0 &&  <table class="cart-items table" cellspacing="0">
                                <thead>
                                  <tr>
                                    <th class="product-thumbnail">Product</th>
                                    <th class="product-price">Price</th>
                                    <th class="product-quantity">Quantity</th>
                                    <th class="product-subtotal">Subtotal</th>
                                    <th class="product-remove">&nbsp;</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {cart?.map((item) => {
                                    const total = item.price * (quantities[item.id] || item.pqty);
                                    return (
                                      <tr className="cart-item">
                                        <td className="product-thumbnail">
                                          <Link  >
                                            <div style={{ width: "50px", height: "50px", overflow: "hidden", borderRadius: "50%", background: "lightgrey", display: "flex", alignItems: "center" }}>
                                              <img style={{ height: "100%" }} src={`${IMG_URL}/productimg/` + item.image1} className="" alt="" />

                                            </div>
                                          </Link>
                                          <div className="product-name">
                                            <Link >{item.pname}</Link>
                                          </div>
                                        </td>
                                        <td className="product-price">
                                          <span className="price">₹{item.price}</span>
                                        </td>
                                        <td className="product-quantity">
                                          <div className="quantity">
                                            <button type="button" className="minus" onClick={() => handleDecrease(item.id, item.proid , item.pqty)}>-</button>

                                            <input type="number" className="qty" step="1" min="0" max="" name="quantity" value={quantities[item.id] || item.pqty} title="Qty" size="4" placeholder="" inputMode="numeric" autoComplete="off" />

                                            <button type="button" onClick={() => handleIncrease(item.id, item.proid)} className="plus">+</button>
                                          </div>
                                        </td>
                                        <td className="product-subtotal">
                                          <span>₹{total}</span>
                                        </td>

                                        <td className="product-remove">
                                          <Link onClick={() => handledelete(item.id)} className="remove">×</Link>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>}
                            </div>
                          </form>
                        </div> */}
                        <div className="col-xl-8 col-lg-12 col-md-12 col-12">
                          <div className='text-center'>
                            {cart.length === 0 && <img src={empty} alt='' style={{ width: '100px', margin: '20px 0' }} />}
                            {cart.length === 0 && <h3 className="text-muted">Your cart is empty</h3>}
                          </div>
                          <form className="cart-form" action="" method="post">
                            <div className="table-responsive">
                              {cart.length !== 0 && (
                                <div className="row">
                                  {cart.map((item) => {
                                    const total = item.price * (quantities[item.id] || item.pqty);
                                    return (
                                      <div className="col-12 mb-3" key={item.id}>
                                        <div className="card shadow-sm">
                                          <div className="card-body d-flex align-items-center">
                                            <div style={{ width: '60px', height: '60px', overflow: 'hidden', borderRadius: '50%', background: 'lightgrey', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight:'15px' }}>
                                              <img src={`${IMG_URL}/productimg/${item.image1}`} className="img-fluid" alt="" />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                              <h5 className="product-name">
                                                <Link className="text-dark text-uppercase">{item.pname}</Link>
                                              </h5>
                                              <p className="product-price">Price: <span className="fw-bold">₹{item.price}</span></p>
                                              <div className="product-quantity">
                                                <div className="quantity">
                                                  <button type="button" className="minus" onClick={() => handleDecrease(item.id, item.proid , item.pqty )}>-</button>
                                                  <input type="number" className="qty" step="1" min="0" max="" name="quantity" value={quantities[item.id] || item.pqty} title="Qty" size="4" placeholder="" inputMode="numeric" autoComplete="off" />
                                                  <button type="button" onClick={() => handleIncrease(item.id, item.proid , item.pqty , item.stock)} className="plus">+</button>
                                                </div>
                                              </div>
                                              <p className="product-subtotal mt-2">Subtotal: <span className="product-subtotal fw-bold">₹{total}</span></p>
                                            </div>
                                            <div className="product-remove">
                                            <Link onClick={() => {if (window.confirm("Are you sure you want to remove this item from the cart?")) {handledelete(item.id);} }} className="remove text-danger"><i class="bi bi-trash3"></i>Remove</Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </form>
                        </div>



                        <div class="col-xl-4 col-lg-12 col-md-12 col-12">
                          {cart.length !== 0 &&      <div class="cart-totals">
                            <h2 className='text-uppercase'>Cart total</h2>
                            <div>
                              <div class="cart-subtotal">
                                <div class="title">Subtotal</div>
                                <div><span>₹{totalPrice}</span></div>
                              </div>
                              <div class="shipping-totals">
                                <div class="title">Shipping</div>
                                <div>
                                  {/* <ul class="shipping-methods custom-radio">
                                    <li>
                                      <input type="radio" name="shipping_method" data-index="0" value="free_shipping" class="shipping_method" checked="checked" /><label>Free shipping</label>
                                    </li>
                                    <li>
                                      <input type="radio" name="shipping_method" data-index="0" value="flat_rate" class="shipping_method" /><label>Flat rate</label>
                                    </li>
                                  </ul> */}
                                  <p class="shipping-desc">
                                   Shipping will be calculated at checkout.
                                  </p>
                                </div>
                              </div>
                              <div class="order-total">
                                <div class="title">Total</div>
                                <div><span>₹{totalPrice}</span></div>
                              </div>
                            </div>
                            <div class="proceed-to-checkout">
                              {Cookies.get(`custuserid`) ? <Link class="checkout-button button" onClick={() =>handleprocess(orderid)}>
                                Proceed to checkout
                              </Link>  : <Link onClick={() => handleToggle()} class="checkout-button button">
                                Proceed to checkout
                              </Link>}


                            </div>
                          </div> }
                     
                        </div>
                      </div>
                    </div>
                    {cart.length == 0 && <div class="shop-cart-empty">
                      <div class="notices-wrapper">
                        <p class="cart-empty">Your cart is currently empty.</p>
                      </div>
                      <div class="return-to-shop">
                        <Link class="button" to="/">

                          Return to shop
                        </Link>
                      </div>
                    </div>}


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {open && <LoginForm setOpen={setOpen} open={open}  onLoginSuccess={handleLoginSuccess} />}
      </div>



{/* 
      <div class="search-overlay">
        <div class="close-search"></div>
        <div class="wrapper-search">
          <form role="search" method="get" class="search-from ajax-search" action="">
            <div class="search-box">
              <button id="searchsubmit" class="btn" type="submit">
                <i class="icon-search"></i>
              </button>
              <input id="myInput" type="text" autocomplete="off" value="" name="s" class="input-search s" placeholder="Search..." />
              <div class="search-top">
                <div class="close-search">Cancel</div>
              </div>
              <div class="content-menu_search">
                <label>Suggested</label>
                <ul id="menu_search" class="menu">
                  <li><Link href="#">Furniture</Link></li>
                  <li><Link href="#">Home Décor</Link></li>
                  <li><Link href="#">Industrial</Link></li>
                  <li><Link href="#">Kitchen</Link></li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div> */}


      {/* <div class="wishlist-popup">
        <div class="wishlist-popup-inner">
          <div class="wishlist-popup-content">
            <div class="wishlist-popup-content-top">
              <span class="wishlist-name">Wishlist</span>
              <span class="wishlist-count-wrapper"><span class="wishlist-count">2</span></span>
              <span class="wishlist-popup-close"></span>
            </div>
            <div class="wishlist-popup-content-mid">
              <table class="wishlist-items">
                <tbody>
                  <tr class="wishlist-item">
                    <td class="wishlist-item-remove"><span></span></td>
                    <td class="wishlist-item-image">
                      <Link href="shop-details.html">
                        <img width="600" height="600" src={product1} alt="" />
                      </Link>
                    </td>
                    <td class="wishlist-item-info">
                      <div class="wishlist-item-name">
                        <Link href="shop-details.html">Chair Oak Matt Lacquered</Link>
                      </div>
                      <div class="wishlist-item-price">
                        <span>$150.00</span>
                      </div>
                      <div class="wishlist-item-time">June 4, 2022</div>
                    </td>
                    <td class="wishlist-item-actions">
                      <div class="wishlist-item-stock">
                        In stock
                      </div>
                      <div class="wishlist-item-add">
                        <div data-title="Add to cart">
                          <Link rel="nofollow" href="#" class="button">Add to cart</Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="wishlist-item">
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
                      <div class="wishlist-item-time">June 4, 2022</div>
                    </td>
                    <td class="wishlist-item-actions">
                      <div class="wishlist-item-stock">
                        In stock
                      </div>
                      <div class="wishlist-item-add">
                        <div data-title="Add to cart">
                          <Link rel="nofollow" href="#" class="button">Add to cart</Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="wishlist-popup-content-bot">
              <div class="wishlist-popup-content-bot-inner">
                <Link class="wishlist-page" href="shop-wishlist.html">
                  Open wishlist page
                </Link>
                <span class="wishlist-continue" data-url="">
                  Continue shopping
                </span>
              </div>
              <div class="wishlist-notice wishlist-notice-show">Added to the wishlist!</div>
            </div>
          </div>
        </div>
      </div> */}


      {/* <div class="compare-popup">
        <div class="compare-popup-inner">
          <div class="compare-table">
            <div class="compare-table-inner">
              <Link href="#" id="compare-table-close" class="compare-table-close">
                <span class="compare-table-close-icon"></span>
              </Link>
              <div class="compare-table-items">
                <table id="product-table" class="product-table">
                  <thead>
                    <tr>
                      <th>
                        <Link href="#" class="compare-table-settings">Settings</Link>
                      </th>
                      <th>
                        <Link href="shop-details.html">Chair Oak Matt Lacquered</Link> <span class="remove">remove</span>
                      </th>
                      <th>
                        <Link href="shop-details.html">Zunkel Schwarz</Link> <span class="remove">remove</span>
                      </th>
                      <th>
                        <Link href="shop-details.html">Namaste Vase</Link> <span class="remove">remove</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="tr-image">
                      <td class="td-label">Image</td>
                      <td>
                        <Link href="shop-details.html">
                          <img width="600" height="600" src={product1} alt="" />
                        </Link>
                      </td>
                      <td>
                        <Link href="shop-details.html">
                          <img width="600" height="600" src="media/product/1.jpg" alt="" />
                        </Link>
                      </td>
                      <td>
                        <Link href="shop-details.html">
                          <img width="600" height="600" src="media/product/2.jpg" alt="" />
                        </Link>
                      </td>
                    </tr>
                    <tr class="tr-sku">
                      <td class="td-label">SKU</td>
                      <td>VN00189</td>
                      <td></td>
                      <td>D1116</td>
                    </tr>
                    <tr class="tr-rating">
                      <td class="td-label">Rating</td>
                      <td>
                        <div class="star-rating">
                          <span style={{ width: "80%" }}></span>
                        </div>
                      </td>
                      <td>
                        <div class="star-rating">
                          <span style={{ width: "100%" }}></span>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                    <tr class="tr-price">
                      <td class="td-label">Price</td>
                      <td><span class="amount">$150.00</span></td>
                      <td><del><span class="amount">$150.00</span></del> <ins><span class="amount">$100.00</span></ins></td>
                      <td><span class="amount">$200.00</span></td>
                    </tr>
                    <tr class="tr-add-to-cart">
                      <td class="td-label">Add to cart</td>
                      <td>
                        <div data-title="Add to cart">
                          <Link href="#" class="button">Add to cart</Link>
                        </div>
                      </td>
                      <td>
                        <div data-title="Add to cart">
                          <Link href="#" class="button">Add to cart</Link>
                        </div>
                      </td>
                      <td>
                        <div data-title="Add to cart">
                          <Link href="#" class="button">Add to cart</Link>
                        </div>
                      </td>
                    </tr>
                    <tr class="tr-description">
                      <td class="td-label">Description</td>
                      <td>Phasellus sed volutpat orci. Fusce eget lore mauris vehicula elementum gravida nec dui. Aenean aliquam varius ipsum, non ultricies tellus sodales eu. Donec dignissim viverra nunc, ut aliquet magna posuere eget.</td>
                      <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</td>
                      <td>The EcoSmart Fleece Hoodie full-zip hooded jacket provides medium weight fleece comfort all year around. Feel better in this sweatshirt because Hanes keeps plastic bottles of landfills by using recycled polyester.7.8 ounce fleece sweatshirt made with up to 5 percent polyester created from recycled plastic.</td>
                    </tr>
                    <tr class="tr-content">
                      <td class="td-label">Content</td>
                      <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</td>
                      <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</td>
                      <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</td>
                    </tr>
                    <tr class="tr-dimensions">
                      <td class="td-label">Dimensions</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default ShopCart