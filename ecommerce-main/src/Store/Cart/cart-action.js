import { BASE_URL } from "../../AdminComponent/BaseUrl";
import Cookies from "js-cookie";
import { cartActions } from "./cartSlice";


export const getCartCount = ()=>{
  

    return async (dispatch)=>{
        try{
            const response = await fetch(`${BASE_URL}/getcartcount`, {
                method : "POST",
                    body : JSON.stringify ({
                        order_id: Cookies.get(`orderid`)
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
            });

            const apiData = await response.json();


            dispatch(cartActions.getCartCount(apiData[0].count));

  



        }catch(error){
            console.log(error)
        }
        
    }
}
