import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../store/slices/products.slice';

const Purchases = () => {

  const dispatch = useDispatch();

    const purchases = useSelector(state => state.purchases)
    console.log(purchases);
    useEffect(() => {
      dispatch(getProductsThunk());
    }, []);


    return (
        <div>
            <h1>Purchases</h1>
        </div>
    );
};

export default Purchases;