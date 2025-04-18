import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartCount : "",
}

const cartSlice = createSlice({
    name : "cartCount",
    initialState : initialState,
    reducers : {
       
        getCartCount(state, action){
            const newList = action.payload;

            state.cartCount = newList;


        }

    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;