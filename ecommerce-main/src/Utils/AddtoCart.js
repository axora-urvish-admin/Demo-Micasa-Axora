import Cookies from 'js-cookie';
import { BASE_URL } from '../AdminComponent/BaseUrl';
import custdecryptedUserId from './CustUserid';
import { useState } from 'react';
import { getCartCount } from '../Store/Cart/cart-action';

const addToCart = (pro_id, title, catid, price, dispatch,p_qty,v_id,gst) => {
    try {
        if (!Cookies.get("orderid") && !Cookies.get("custuserid")) {
            const randomUserId = Math.random().toString(36).substring(2);
            const user = {
                id: randomUserId,
                pro_id: pro_id
            };
            fetch(`${BASE_URL}/addToCart`, {
                method: "POST",
                body: JSON.stringify({
                    userId: user.id,
                    pro_id: user.pro_id,
                    pro_name: title,
                    catid: catid,
                    price: price,
                    p_qty: p_qty,
                    v_id : v_id,
                    gst : gst
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(response => response.json())
            .then(apiData => {
                Cookies.set("orderid", apiData[0].orderid , { expires: 365 });
            
                dispatch(getCartCount());
                
           
                
            })
            .catch(error => console.error('Error:', error));
        } else if (Cookies.get("custuserid") && !Cookies.get("orderid")) {
            const user = {
                id: custdecryptedUserId(),
                pro_id: pro_id
            };
            fetch(`${BASE_URL}/addToCart`, {
                method: "POST",
                body: JSON.stringify({
                    userId: user.id,
                    pro_id: user.pro_id,
                    pro_name: title,
                    catid: catid,
                    price: price,
                    p_qty: p_qty,
                    v_id : v_id,
                    gst : gst
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(response => response.json())
            .then(apiData => {
                Cookies.set("orderid", apiData[0].orderid , { expires: 365 });
               
                    dispatch(getCartCount());
                   
              
                
            })
            .catch(error => console.error('Error:', error));
        } else if ((Cookies.get("custuserid") && Cookies.get("orderid")) || Cookies.get("orderid")) {
            const user = {
                id: custdecryptedUserId(),
                orderid: Cookies.get("orderid"),
                pro_id: pro_id
            };
            fetch(`${BASE_URL}/addToCart`, {
                method: "POST",
                body: JSON.stringify({
                    userId: user.id,
                    orderid: user.orderid,
                    pro_id: user.pro_id,
                    pro_name: title,
                    catid: catid,
                    price: price,
                    p_qty: p_qty,
                    v_id : v_id,
                    gst : gst
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(response => response.json())
            .then(apiData => {
                // Handle response data if needed
               
                    dispatch(getCartCount());
                   
                
                
            })
            .catch(error => console.error('Error:', error));
        }
    }
    catch(error) {
        console.error('Error:', error);
    }
};

export default addToCart;
