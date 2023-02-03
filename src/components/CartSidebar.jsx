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

  const cartProducts = useSelector(state => state.cartProducts)
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getCartProductThunk())
  }, [show]);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>

            {
              cartProducts.map(cartProduct => (
                <li key={cartProduct.id} onClick={() => navigate(`/product/${cartProduct.product.id}`)} style={{ cursor: 'pointer' }} className="py-4">
                  <div className="row">
                    <div className="col-4 image-cart">
                      <img src={cartProduct.product.images[0].url} alt="" />
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-12">
                          {cartProduct.product.title}
                        </div>
                        <div className="col-12 quantity">
                          <button>-</button>
                          <input type="text" value={quantity} onChange={e => parseInt(e.target.value) >= 1 ? setQuantity(parseInt(e.target.value)) : setQuantity(0)} />
                          <button>+</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <Button>
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartSidebar;