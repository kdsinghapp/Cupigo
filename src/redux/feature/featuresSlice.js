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
  DashboardList: null,
  ResturantDish: null,
  Privacypolicy: null,
  TermsCondition: null,
  getProfile: null,
  FavoriteList: null,
  ResturantDetails: null,
  OrderDetails: null,
  TotalList: null,
  DriverDetails: null,
  assignOrder: null,
  Orderlocations: [],
  getOrder_list:[],
  TransactionHistory:[],
  BankAccountList:[],

};

export const get_HomeDashBoard = createAsyncThunk(
  'get_HomeDashBoard',
  async (params, thunkApi) => {
    try {
      const response = await API.post('/home/get-home', null, {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      });

      if (response.data.success) {
        console.log('User Get_Home Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: get_HomeDashBoard .js:16 ~ get_HomeDashBoard ~ error:',
        error,
      );

      return thunkApi.rejectWithValue(error);
    }
  },
);


export const get_order_locations = createAsyncThunk(
  'get_order_locations',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp



      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');


      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params.data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/driver/get-locations`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      // console.log('get_order_locations =>>>>>>>>>>>>> :', responseData.data);


      if (responseData.success) {
        console.log('get_order_locations  successfully');
        // successToast("Your order has been successfully canceled.")
      } else {
        //errorToast(responseData.message); 
        console.log('get_order_locations ', responseData.message);
      }


      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      //  errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const get_wallet_details = createAsyncThunk(
  'get_wallet_details',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp

      console.log('get_wallet_details=>>>>', params);



      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params.data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/driver/get-wallet-details`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('get_wallet_details =>>>>>>>>>>>>> :', responseData.data);


      if (responseData.success) {
        console.log('get_wallet_details ', responseData.message);
        // successToast("Your order has been successfully canceled.")
      } else {
        //errorToast(responseData.message); 
        console.log('get_wallet_details ', responseData.message);
      }


      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      //  errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const payment_withdraw = createAsyncThunk(
  'payment_withdraw',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp

      console.log('payment_withdraw=>>>>', params.token);



      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:null,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/driver/payment-withdraw`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('payment_withdraw responseData  =>>>>>>>>>>>>> :', responseData);


      if (responseData.success) {
        successToast('Payment withdraw Request send SuccessFuly');
        // successToast("Your order has been successfully canceled.")
      } else {
        //errorToast(responseData.message); 
        console.log('payment_withdraw ', responseData.message);
      }


      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      //  errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);



export const change_order_status = createAsyncThunk(
  'change_order_status',
  async (params, thunkApi) => {
    console.log('=============change_order_status=======================', params);
    try {



      // Create form data with identity and otp
      const formdata = new FormData();
      formdata.append("order_id", params.order_id);
      formdata.append("delivery_status", params.delivery_status);

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);
      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/driver/change-assign-order-Status`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response  status=>>>>>>>>>>>>> :', responseData);

      // Handle successful response
      if (responseData.success) {
        console.log("Order Is Accepted ");


      } else {
        errorToast(responseData.message);

      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const get_assign_order = createAsyncThunk(
  'get_assign_order',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp
      console.log('============get_assign_order========================');

      const formdata = new FormData();


      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);

      // Create request options
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: null,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/driver/get-assign-order`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      // console.log('get_assign_order=>>>>>>>>>>>>> :', responseData.data);

      // Handle successful response
      if (responseData.success) {
        //successToast(responseData.message);
        //params.navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
      } else {
        //errorToast(responseData.message); 
        console.log('restaurant/get-order-data-by-id', responseData.message);
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);

export const add_vehicle = createAsyncThunk(
  'add_vehicle',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp
      console.log('==========add_vehicle==========================', params.data);


      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);
      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params.data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/driver/add-vehicle`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('add_vehicle=>>>>>>>>>>>>> :', responseData.success);

      // Handle successful response
      if (responseData.success) {
        successToast(responseData.message);

        params.navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
      } else {
        errorToast(responseData.message);
        console.log('==============add_vehicle======================');
        console.log(responseData.message);
        console.log('====================================');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);

export const update_profile = createAsyncThunk(
  'update_profile',
  async (params, thunkApi) => {
    try {
      console.log('==========update_profile==========================', params.data);



      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);


      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params.data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/driver/auth/update-profile`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      // console.log('Response update_profile=>>>>>>>>>>>>> :', responseData);

      // Handle successful response
      if (responseData.success) {
        if (!params.Notification) {

          successToast(responseData.message);
        }


      } else {
        errorToast(responseData.message);
        console.log('==============update_profile======================');
        console.log(responseData.message);
        console.log('====================================');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const get_order_list = createAsyncThunk(
  'get_order_list',
  async (params, thunkApi) => {
    try {
      console.log('==========get_order_list==========================', params.data);
 


      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);


      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params.data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/driver/get-order-list`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response get_order_list=>>>>>>>>>>>>> :', responseData);

      // Handle successful response
      if (responseData.success) {
       


      } else {
       
        
  
        console.log('=============responseData.message=======================');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const change_assign_order = createAsyncThunk(
  'change_assign_order',
  async (params, thunkApi) => {
    try {
      console.log('==========change_assign_order==========================', params.data);
    

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);


      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params.data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/driver/change-assign-order-Status`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response change_assign_order=>>>>>>>>>>>>> :', responseData);

      // Handle successful response
      if (responseData.success) {


        successToast("Order Status Updated");



      } else {
        errorToast(responseData.message);
        console.log('==============update_profile======================');
        console.log(responseData.message);
        console.log('====================================');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const update_Details = createAsyncThunk(
  'update_Details',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp
      console.log('==========update_Details==========================', params.data);


      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);


      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params.data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/driver/update-vehicle`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response update_Details=>>>>>>>>>>>>> :', responseData);

      // Handle successful response
      if (responseData.success) {


        successToast(responseData.message);



      } else {
        errorToast(responseData.message);
        console.log('==============update_profile======================');
        console.log(responseData.message);
        console.log('====================================');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);

export const create_new_password = createAsyncThunk(
  'create_new_password',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp


      const data = new FormData();

      data.append('password', params.password);
      data.append('c_password', params.c_password);
      data.append('old_password', params.old_password);
      data.append('user_id', params.user_id);

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);


      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/driver/auth/create-new-password`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response create_new_password=>>>>>>>>>>>>> :', responseData.success);

      // Handle successful response
      if (responseData.success) {
        successToast(responseData.message);


      } else {
        errorToast(responseData.message);
        console.log('==============create_new_password======================');
        console.log(responseData.message);
        console.log('====================================');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.log('==========create_new_password==========================', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);


export const get_terms_conditions = createAsyncThunk(
  'get_terms_conditions',
  async (params, thunkApi) => {
    try {
      const response = await API.get('/home/get-terms-and-conditions', null, {
        headers: {
          Authorization: `Bearer ${params.token}`,
        }
      },);



      if (response.data.success) {
        console.log('User get_terms_conditions Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ : get_terms_conditions error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_Profile = createAsyncThunk(
  'get-profile',
  async (params, thunkApi) => {

    console.log(params);
    try {
      const response = await API.post('/driver/auth/get-profile', null, {
        headers: {
          Authorization: `Bearer ${params.token}`,
        }
      },);


      if (response.data.success) {
        console.log('User get-profile Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ :auth/get-profile error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const driver_details = createAsyncThunk(
  'driver_details',
  async (params, thunkApi) => {

    console.log('driver_details=>>>>>>>.', params);
    try {
      const response = await API.get('/driver/driver-details', {
        headers: {
          Authorization: `Bearer ${params.token}`,
        }
      },);


      if (response.data.success) {
        console.log('User get-driver_details Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 driver_details:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const dashboard_data = createAsyncThunk(
  'dashboard_data',
  async (params, thunkApi) => {
    const formdata = new FormData();
    formdata.append('restaurant_id', params.restaurant_id);

    try {
      const response = await API.post('/restaurant/dashboard-data', formdata, {
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        timeout: 5000, // Optional: specify timeout in ms
      });

      if (response.data.success) {
        console.log('User /restaurant/dashboard-data Successfully');
      }
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message);
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Axios error response:', error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error('Axios error request:', error.request);
        }
      } else {
        // Other error
        console.error('Unexpected error:', error);
      }

      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const get_privacy_policy = createAsyncThunk(
  'get_privacy_policy',
  async (params, thunkApi) => {
    try {
      const response = await API.get('/home/get-privacy-policy', null, {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      });

      console.log('🚀 ~ get_privacy_policy ~ response:', response);

      if (response.data.success) {
        console.log('User get_privacy_policy Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ : get_privacy_policy error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_account_driver = createAsyncThunk(
  'get_account_driver',
  async (params, thunkApi) => {

    try {
      const response = await API.post('/driver/get-account-driver',null,{ headers: {
        Authorization: `Bearer ${params.token}`,
      }
    },);

  
      if (response.data.success) {
        console.log('User get_account_driver Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ :get_account_driver:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const add_account_driver = createAsyncThunk(
  'add_account_driver',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp
      console.log('==========add_account_driver==========================',params.data);
   
  
      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);


      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params.data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/driver/add-account-driver`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response add_account_driver=>>>>>>>>>>>>> :', responseData.success);

      // Handle successful response
      if (responseData.success) {
        if(!params.Notification){

          successToast(responseData.message);
        }
       
       
      } else {
        errorToast(responseData.message); 
        console.log('==============add_account_driver======================');
        console.log(responseData.message);
        console.log('====================================');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const delete_account = createAsyncThunk(
  'delete_account',
  async (params, thunkApi) => {
    try {
      const formdata = new FormData();
      formdata.append("account_id", params.account_id);

      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`); // Add token to headers

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      const response = await fetch(
        `${base_url.url}/driver/delete-account`,
        requestOptions,
      );

      const responseData = await response.json();

      console.log('Response delete_account=>>>>>>>>>>>>> :', responseData.success);

      if (responseData.success) {
        successToast('Account Deleted Successfully');
      } else {
        errorToast(responseData.message); 
        console.log(responseData.message);
      }

      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error); // Use rejectWithValue to pass error
    }
  },
);
const FeatureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(delete_account.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(delete_account.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(delete_account.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_account_driver.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_account_driver.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(add_account_driver.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_account_driver.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_account_driver.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.BankAccountList = action.payload;
    });
    builder.addCase(get_account_driver.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_order_locations.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_order_locations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.Orderlocations = action.payload;
    });
    builder.addCase(get_order_locations.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(payment_withdraw.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(payment_withdraw.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
 
    });
    builder.addCase(payment_withdraw.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_wallet_details.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_wallet_details.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.TransactionHistory = action.payload;
    });
    builder.addCase(get_wallet_details.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_order_list.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_order_list.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.getOrder_list = action.payload;
    });
    builder.addCase(get_order_list.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(create_new_password.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(create_new_password.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(create_new_password.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(change_assign_order.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(change_assign_order.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(change_assign_order.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(update_Details.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_Details.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(update_Details.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    // DashboardSlice cases
    builder.addCase(get_HomeDashBoard.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_HomeDashBoard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.DashboardList = action.payload;
    });
    builder.addCase(get_HomeDashBoard.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(driver_details.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(driver_details.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.DriverDetails = action.payload;
    });
    builder.addCase(driver_details.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    builder.addCase(change_order_status.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.assignOrder = [];
    });
    builder.addCase(change_order_status.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(update_profile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_profile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(update_profile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(change_order_status.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(get_privacy_policy.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_privacy_policy.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.Privacypolicy = action.payload;
    });
    builder.addCase(get_privacy_policy.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_terms_conditions.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_terms_conditions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.TermsCondition = action.payload;
    });
    builder.addCase(get_terms_conditions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_Profile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_Profile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.getProfile = action.payload;
    });
    builder.addCase(get_Profile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(dashboard_data.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(dashboard_data.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.TotalList = action.payload;
    });
    builder.addCase(dashboard_data.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    builder.addCase(get_assign_order.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_assign_order.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.assignOrder = action.payload;
    });
    builder.addCase(get_assign_order.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    builder.addCase(add_vehicle.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_vehicle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(add_vehicle.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

  },
});

export default FeatureSlice.reducer;
