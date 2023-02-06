import { createSlice, isAsyncThunkAction } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartProductsSlice = createSlice({
    name: 'cartProducts',
    initialState: [],
    reducers: {

        setCartProduct: (state,action) => {
            const cartProduct = action.payload
            return cartProduct
        }

    }
})

export const getCartProductThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart',getConfig())
        .then((res) => dispatch(setCartProduct(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addProductCartThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart',product,getConfig())
        .then((res) => dispatch(getCartProductThunk()))
        .finally(() => dispatch(setIsLoading(false)))
}

export const { setCartProduct } = cartProductsSlice.actions;

export default cartProductsSlice.reducer;
