import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishList : [],
    totalItems : 0,
    wishCount :""
}

const wishListSlice = createSlice({
    name : "wishList",
    initialState : initialState,
    reducers : {
        addToWishList(state, action){
            const newProduct = action.payload.products;

            console.log(newProduct);
        },
        
        getWishList(state, action){
            const newList = action.payload;
            state.wishList = newList;
            // console.log(newList, "from slice");
        },
        getWishCount(state, action){
            const newList = action.payload;
            state.wishCount = newList;
            // console.log(newList, "from slice");
        }

    }
})

export const wishListActions = wishListSlice.actions;
export default wishListSlice.reducer;