import { BASE_URL } from "../../AdminComponent/BaseUrl";
import { productActions } from "./productSlice";

export const getProducts = ()=>{
    
    return async (dispatch) =>{
        try{
            const response = await fetch(`${BASE_URL}/products`);

            const data = await response.json();

            dispatch(productActions.getProducts({
                products : data || [],
            }))
        }catch(error){
            console.error(error);

        }
    }
}