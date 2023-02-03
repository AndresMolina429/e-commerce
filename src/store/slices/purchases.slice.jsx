import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';
import axios from 'axios';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
          setPurchases : (state, action) => {
             const purchases = action.payload
             return purchases
         }
    }
})

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases/',getConfig())
        .then((res) => dispatch(setPurchases(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
