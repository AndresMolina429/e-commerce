import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartProductThunk } from '../store/slices/cartProducts.slice';
import getConfig from '../utils/getConfig';

const CartSidebar = ({ show, handleClose }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [changeQuantity, setChangeQuantity] = useState(false)

  const cartProducts = useSelector(state => state.cartProducts)

  useEffect(() => {
    dispatch(getCartProductThunk())
  }, [show,changeQuantity]);

  const changeQuantityCart = (id,newQuantity) => {
    const productQuantity = {
       quantity: newQuantity
    }
    console.log(productQuantity)
    if (newQuantity >= 1){
      axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, productQuantity, getConfig())
      .then(res => setChangeQuantity(!changeQuantity))
    }else{
      console.log('cantidad menor a 1')
    }
  }

  const deleteCart = (productId) => {
      axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${productId}`,getConfig())
      .then(() => setChangeQuantity(!changeQuantity))
    }

const purchaseCart = () => {
  axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases',{},getConfig())
  .then(() => setChangeQuantity(!changeQuantity))
  .catch((err) => console.log(err))
}

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {
              cartProducts.map(cartProduct => (
                <li key={cartProduct.id} className="py-4">
                  <div className="row">
                    <div className="col-4 image-cart" onClick={() => navigate(`/product/${cartProduct.product.id}`)} style={{ cursor: 'pointer' }}>
                      <img src={cartProduct.product?.images[0].url} alt="" />
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-12" onClick={() => navigate(`/product/${cartProduct.product.id}`)} style={{ cursor: 'pointer' }}>
                          {cartProduct.product?.title}
                        </div>
                        <div className="col-12 quantity">
                          <button onClick={() => changeQuantityCart(cartProduct.id, cartProduct.quantity - 1)}>-</button>
                          <input type="text" value={cartProduct.quantity} onChange={e => e.target.value} />
                          <button onClick={() => changeQuantityCart(cartProduct.id,cartProduct.quantity + 1)}>+</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <Button onClick={() => deleteCart(cartProduct.id)}>
                        <i className="fa-regular fa-trash-can"></i>
                      </Button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 offset-8">
                      <h6><span className="text-muted">Total: </span> ${cartProduct.product?.price * cartProduct.quantity}</h6>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
          <div><Button onClick={purchaseCart}>Purchace Cart</Button></div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartSidebar;