import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API, base_url } from '../Api';

import { Alert } from 'react-native';
import { SuccessToast } from 'react-native-toast-message';
import { errorToast, successToast } from '../../configs/customToast';
import ScreenNameEnum from '../../routes/screenName.enum';
import { err } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  SubscriptionPlan: null,
  PayMentStatus:null,
  matchPersons:[],
  privacy_policy:[]
 

};
export const get_Plans = createAsyncThunk(
  'get_Plans',
  async (params, thunkApi) => {
    try {
      const response = await API.get('/getPlans');

      if (response.data.status == '1') {
        console.log('get_Plans Success', response.data.message);
      } else {
        console.log(
          'get_Plans Not Found',
       
        );
      }

      return response.data.result;
    } catch (error) {
      console.log('Error: get_Plans ', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_privacy_policy = createAsyncThunk(
  'get_privacy_policy',
  async (params, thunkApi) => {
    try {
      const response = await API.get('/get-privacy-policy');

      if (response.data.status == '1') {
        console.log('get_privacy_policy Success', response.data.message);
      } else {
        console.log(
          'get_privacy_policy Not Found',
       
        );
      }

      return response.data.result;
    } catch (error) {
      console.log('Error: get_privacy_policy ', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const Payment_api = createAsyncThunk(
  'Payment_api',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp



      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');


      console.log('Payment_api=>>>>>>>>>>>>>>', params.data);
      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params.data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `https://server-php-8-2.technorizen.com/cupigo/api/create-checkout-session`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response Payment_api=>>>>>>>>>>>>> :', responseData.data);

      // Handle successful response
      if (responseData.data) {
        // successToast(responseData.message);


      } else {
      

      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.log('==========Payment_api==========================', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const create_subscription = createAsyncThunk(
  'create_subscription',
  async (params, thunkApi) => {
    console.log('🚀 create_subscription', params.data);


    try {
      let data = new FormData();
      data.append('user_id',params.user_id);
      data.append('plan_id', params.plan_id);
      data.append('price', params.price);
      data.append('payment_status', params.payment_status);
      data.append('payment_intent', params.payment_intent);

      const response = await API.post('/create-subscription', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      

      if (response.data.status == '1') {
        
       successToast('Your purchase Subcription Successfuly')
   

      } else {
        errorToast(response.data.message || 'Unknown error occurred');
      }

      return response.data?.result;
    } catch (error) {
      console.log('🚀 ~ file: AuthSlice.js:16 ~ login ~ error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const matchPersons = createAsyncThunk(
  'matchPersons',
  async (params, thunkApi) => {
    console.log('🚀 create_subscription', params.data);


    try {
      let data = new FormData();
      data.append('user_id',params.user_id);
      

      const response = await API.post('/matchPersons', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      

      if (response.data.status == '1') {
        
     
   console.log('matches sucess  ');

      } else {
        errorToast(response.data.message || 'Unknown error occurred');
      }

      return response.data?.result;
    } catch (error) {
      console.log('🚀 ~ file: AuthSlice.js:16 ~ login ~ error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const add_support_inquiries = createAsyncThunk(
  'add_support_inquiries',
  async (params, thunkApi) => {
    try {
      let data = new FormData();
      data.append('user_id',params.user_id);
      data.append('message', params.message);

      const response = await API.post('/add_support_inquiries', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      

      if (response.data.status == '1') {
        
     
 successToast('support inquiry send successfuly');

      } else {
        errorToast(response.data.message || 'Unknown error occurred');
      }

      return response.data?.result;
    } catch (error) {
      console.log('🚀 ~ file: AuthSlice.js:16 ~ login ~ error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error);
    }
  },
);

const FeatureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
  
   
    builder.addCase(Payment_api.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Payment_api.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.PayMentStatus = action.payload;
    });
    builder.addCase(Payment_api.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_privacy_policy.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_privacy_policy.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.privacy_policy = action.payload;
    });
    builder.addCase(get_privacy_policy.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
   
    builder.addCase(add_support_inquiries.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_support_inquiries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
  
    });
    builder.addCase(add_support_inquiries.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
   
    builder.addCase(matchPersons.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(matchPersons.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.matchPersons = action.payload;
    });
    builder.addCase(matchPersons.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_Plans.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_Plans.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.SubscriptionPlan =action.payload
    });
    builder.addCase(get_Plans.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(create_subscription.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(create_subscription.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
     
    });
    builder.addCase(create_subscription.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

   

  },
});

export default FeatureSlice.reducer;
