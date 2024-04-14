import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
let userRole
export const UserLoginLifecycle=createAsyncThunk('user-login',async(userObj,thunkApi)=>{
    const {role}=userObj
    userRole=role
    try{
        // if(role=='User'){
        //     let res=await axios.get('http://localhost:8000/user-api/users',userCredObj)
        // }
        if(role==='User'){
        let res = await axios.post('https://www.crackers-distribution-ecommerce-9xccotwk0.vercel.app/user-api/login', userObj)
       console.log(res.data)
        //save storage in local/session storage
        if(res.data.message === "login successful"){
            localStorage.setItem('token', res.data.payload.token)
        }
        else{
            return thunkApi.rejectWithValue(res.data.message);
        }
 
        return res.data; //this will be returned to the reducers, extra reducer
    }
    if(role==='Seller'){
       
            let res = await axios.post('https://www.crackers-distribution-ecommerce-9xccotwk0.vercel.app/user-api/sellerlogin', userObj)
           console.log(res.data)
            //save storage in local/session storage
            if(res.data.message === "login successful"){
                localStorage.setItem('token', res.data.payload.token)
            }
            else{
                return thunkApi.rejectWithValue(res.data.message);
            }
     
            return res.data; //this will be returned to the reducers, extra reducer
        }
        if(role==='Admin'){
            let res = await axios.post('https://www.crackers-distribution-ecommerce-9xccotwk0.vercel.app/user-api/adminlogin', userObj)
            console.log(res.data)
             //save storage in local/session storage
             if(res.data.message === "login successful"){
                 localStorage.setItem('token', res.data.payload.token)
             }
             else{
                 return thunkApi.rejectWithValue(res.data.message);
             }
      
             return res.data;
        }
       
    }
    


    catch(err){
        return thunkApi.rejectWithValue(err);
    }
})
// const checkTokenExpiration = () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         try {
//             const decodedToken = jwtDecode(token);
//             const currentTime = Math.floor(Date.now() / 1000);
//             console.log("Current Time:", new Date(currentTime * 1000)); // Convert current time to readable format
//             console.log("Token Expiration Time:", new Date(decodedToken.exp * 1000)); // Convert expiration time to readable format
//             if (decodedToken.exp < currentTime) {
//                 // Token is expired
//                 localStorage.removeItem('token');
//                 alert('Your session has expired. Please login again.');
//                 window.location.href = '/login';
//             }
//         } catch (error) {
//             // Handle invalid token or other decoding errors
//             console.error('Error decoding token:', error);
//         }
//     }
// };

const loginSlice=createSlice({
    name:'loginSlice',
    initialState:{
        ispending:false,
        loginStatus:false,
        currentUser:{},
        errorMessage:'',
        userRole:'',
        status:''
    },
    reducers:{

        clearState:(state,action)=>{
            state.ispending=false;
        state.loginStatus=false;
        state.currentUser={};
        state.errorMessage=''
        }
    },
    extraReducers:builder=>builder.addCase(UserLoginLifecycle.pending,(state,action)=>{
state.ispending=true
    }).addCase(UserLoginLifecycle.fulfilled,(state,action)=>{
        state.ispending=true
        state.currentUser = action.payload.payload.userSearch; 
        state.loginStatus = true;
        state.errorMessage = '';
        state.userRole=userRole;
        state.status=action.payload.message;
        // checkTokenExpiration();

// Check token expiration every 10 seconds
// setInterval(checkTokenExpiration, 10000);
        
            }).addCase(UserLoginLifecycle.rejected, (state, action) => {
                // console.log('state is rejected', state)
                // console.log('action is rejected', action)
         
                state.currentUser = {};
                state.loginStatus = false;
                state.errorMessage = action.payload;
                console.log(action.payload)
                state.ispending = false;
                state.status=action.payload.message
            })
})

export const{clearState} = loginSlice.actions
export default loginSlice.reducer