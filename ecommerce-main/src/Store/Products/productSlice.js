import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products : [],
    totalProducts : 0,
}

const productSlice = createSlice({
    name : "productSlice",
    initialState : initialState,

    reducers : {
        getProducts(state, action){
            const newProducts = action.payload.products;
            state.products = newProducts;
        },
    }
})

export const productActions = productSlice.actions;
export default productSlice.reducer;