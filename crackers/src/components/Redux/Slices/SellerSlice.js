import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sellerCycle = createAsyncThunk('seller-async-calls', async (formData, thunkApi) => {
    try {
        const res = await axios.post('https://www.crackers-distribution-ecommerce-9xccotwk0.vercel.app/product-api/editproducts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        // Use thunkApi.rejectWithValue(error) to pass the actual error value
        return thunkApi.rejectWithValue(error);
    }
});
export const deleteProduct = createAsyncThunk(
    'sellerSlice/deleteProduct',
    async (product, thunkAPI) => {
        try {
            const res = await axios.delete('https://www.crackers-distribution-ecommerce-9xccotwk0.vercel.app/product-api/deleteproducts', {
                data: product // Pass product as data
            });
            console.log(res.data);
            return res.data;
        } catch (error) {
            // Handle error if the request fails
            return thunkAPI.rejectWithValue(error);
        }
    }
);



const SellerSlice=createSlice({
    name:'SellerSlice',
    initialState:{
      oldProducts:{},
      productdesc:{},
      relatedProducts:[],
      updatedProducts:[]
    },
    reducers:{
oldProduct:(state,action)=>{
state.oldProducts=action.payload
},
productDesc:(state,action)=>{
    state.productdesc=action.payload
},
relatedProducts:(state,action)=>{
    state.relatedProducts=action.payload
},
addNewproducts:(state,action)=>{
    state.updatedProducts=action.payload
}
    },
    extraReducers:(builder)=>builder.addCase(sellerCycle.pending,(state,action)=>{

    }).addCase(sellerCycle.fulfilled,(state,action)=>{
state.editProducts=action?.payload?.payload
    }).addCase(sellerCycle.rejected,(state,action)=>{

    }).addCase(deleteProduct.pending, (state, action) => {
        // You can update state to indicate the delete operation is in progress if needed
      })
      // Handle successful deletion
      .addCase(deleteProduct.fulfilled, (state, action) => {
        // Remove the deleted product from the state
        state.updatedProducts = action?.payload?.Products
      })
      // Handle rejection while deleting product
      .addCase(deleteProduct.rejected, (state, action) => {
        // You can handle the error or show an error message to the user
      })
})
export const {oldProduct,productDesc,relatedProducts,addNewproducts} =SellerSlice.actions
 export default SellerSlice.reducer