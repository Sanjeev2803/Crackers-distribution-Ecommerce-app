import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/loginSlice";
import SellerSlice from "./Slices/SellerSlice";
import CartSlice from "./Slices/CartSlice";

export const store=configureStore({
    reducer:{
        name:'login',
        login:loginSlice,
        seller:SellerSlice,
        cart:CartSlice
    }
})