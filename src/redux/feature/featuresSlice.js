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


const FeatureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
  
   

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

   

  },
});

export default FeatureSlice.reducer;
