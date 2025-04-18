import {configureStore} from '@reduxjs/toolkit'
import productReducer from './Products/productSlice';
import wishtListReducer from './WishList/wishListSlice';
import cartCountReducer from './Cart/cartSlice';
import roleAssignReducer from './Role/roleSilce';
const store = configureStore({
    reducer : {
        products : productReducer,
        wishlist : wishtListReducer,
        cartCount : cartCountReducer,
        roleAssign : roleAssignReducer,
    }
})
export default store;