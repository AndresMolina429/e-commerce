import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const purchases = useSelector(state => state.purchases)
  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  console.log('purchases', purchases);



  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="rute p-5 pb-0 text-left d-flex gap-2 align-items-center"><Link to={'/'} >Home</Link><div className="separator"></div> <h6 className="m-0">Purchases</h6></div>
            </div>
          </div>
          <div className="row py-5">
            <ul>
              <li>
                <h3 className='px-5'>My Purchases</h3>
              </li>
              {
                purchases.map(purchase => (
                  <li key={purchase.id}  onClick={() => navigate(`/product/${purchase.product.id}`)} style={{cursor:'pointer'}}>
                    <div className='row'>
                      <div className="col-md-8 offset-2 py-5 ">
                        <div className='item-purchases row'>
                        <div className="image col-md-2">
                          <img src={purchase.product?.images[0].url} alt="" />
                        </div>
                        <div className='name-product col-md-4'>
                           <h6>{purchase.product?.title}</h6>
                        </div>
                        <div className="date text-muted col-md-2">
                             {purchase.createdAt.split("T")[0]}
                        </div>
                        <div className="quantity col-md-2">
                          <div>
                            <input type="text" value={purchase.quantity} disabled/>
                          </div>
                        </div>
                        <div className="price col-md-2">
                            <h6>${purchase.product?.price}</h6>
                        </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Purchases;