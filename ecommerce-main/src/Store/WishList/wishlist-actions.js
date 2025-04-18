import { json } from "react-router-dom";
import { BASE_URL } from "../../AdminComponent/BaseUrl";
import { wishListActions } from "./wishListSlice";
import Cookies from "js-cookie";
import custdecryptedUserId from "../../Utils/CustUserid";

export const addToWishList = (data) => {

    console.log(data);
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/addToWishList`, {
                method: "POST",
                body: JSON.stringify({
                    userId: data.userId,
                    productId: data.id,
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })

            const apidata = await response.json();
    

            dispatch(getWishList())

            dispatch(getWishCount())

        } catch (error) {
            console.log(error)
        }
    }
}

export const getWishList = (data) => {


    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/getUserWishList`, {
                method: "POST",
                body: JSON.stringify({
                    userId: data,
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });

            const apiData = await response.json();
            dispatch(wishListActions.getWishList(apiData));
          
        } catch (error) {
            console.log(error)
        }

    }
}

export const getWishCount = () => {


    return async (dispatch) => {
        const data = {
            user_id :custdecryptedUserId()
        }
        try {
            const response = await fetch(`${BASE_URL}/getwishcount`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json"
                }
            });

            const apiData = await response.json();
            dispatch(wishListActions.getWishCount(apiData[0].count));

            console.log(apiData[0].count , "count")
          
        } catch (error) {
            console.log(error)
        }

    }
}

export const removeFromWishList = (data) => {
    console.log(data, "from  deleteeeeeeeee");

    return async (dispatch) => {

        const user_id = custdecryptedUserId()
        try {
            const response = await fetch(`${BASE_URL}/removeWishItem`, {
                method: "POST",
                body: JSON.stringify({
                    userId: data.userId,
                    productId: data.id,
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const apiData = await response.json();

            console.log(apiData, "delete wish")
        

         
        } catch (error) {

        }

        dispatch(getWishList(user_id))

        dispatch(getWishCount())

     
    }
}