import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {API, base_url} from '../Api';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNameEnum from '../../routes/screenName.enum';
import {errorToast, successToast} from '../../configs/customToast';
import axios from 'axios';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userData: null,
  isLogin: false,
  isLogOut: false,
  User:[]
};

export const login = createAsyncThunk(
  'login',
  async (params, thunkApi) => {
    console.log('🚀 Login_phone:', params);
console.log('login=>>>>>>>>',params.data);
    try {
      let data = new FormData();
      data.append('country_code', params.data.country_code);
      data.append('mobile', params.data.mobile);

      const response = await API.post('/Login', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('🚀 ~ Login_phone', response.data);

      if (response.data.status == '1') {
        successToast('OTP sent successfully');
        params.navigation.navigate(ScreenNameEnum.OTP_SCREEN, {
          mobile: params.data.country_code + params.data.mobile,
        });
      } else {
        errorToast(response.data.message || 'Unknown error occurred');
      }

      return response.data;
    } catch (error) {
      console.log('🚀 ~ file: AuthSlice.js:16 ~ login ~ error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const login_with_otp = createAsyncThunk(
  'login_with_otp',
  async (params, thunkApi) => {
    console.log('🚀 login_with_otp:', params.data);

    
    try {
      let data = new FormData();
      data.append('otp', params.data.otp);
      data.append('mobile', params.data.mobile);

      const response = await API.post('/login_with_otp', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('🚀 ~ Login_phone', response.data);

      if (response.data.status == '1') {
        successToast('Login successfully');
        if(response.data.register_status){
     
          params.navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
        }else{
        
          params.navigation.navigate(ScreenNameEnum.ASK_NAME);
        
        }
        thunkApi.dispatch(loginSuccess(response.data.result));

      } else {
        errorToast(response.data.message || 'Unknown error occurred');
      }

      return response.data;
    } catch (error) {
      console.log('🚀 ~ file: AuthSlice.js:16 ~ login ~ error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);


const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogin = true;
      state.isLogOut = false;
      state.userData = action.payload;
    },
  },
  extraReducers: builder => {
    // login cases
   
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;
    
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
    builder.addCase(login_with_otp.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login_with_otp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;
state.User =action.payload
    
    });
    builder.addCase(login_with_otp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
    
  },
});

export const {loginSuccess} = AuthSlice.actions;

export default AuthSlice.reducer;
