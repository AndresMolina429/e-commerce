import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addProductCartThunk } from "../store/slices/cartProducts.slice";
import { setProducts } from "../store/slices/products.slice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then(res => setProduct(res.data))
      setQuantity(1)
  }, [id]);

  useEffect(() => {
    if (product.categoryId !== undefined) {
      axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${product.categoryId}`)
        .then((res) => setRelatedProducts(res.data))
    }
  }, [product]);

  const [quantity, setQuantity] = useState(1);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const addProductCart = () => {
        const productCart = {
          quantity: quantity,
          productId: id
        }
        dispatch(addProductCartThunk(productCart))
  }
  
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="rute p-5 pb-0 text-left d-flex gap-2 align-items-center"><Link to={'/'} >Home</Link><div className="separator"></div> <h6 className="m-0">{product.title}</h6></div>
            </div>
          </div>
          <div className="row py-5">
            <div className="col-5">
              <Carousel className="p-5 m-5" style={{ width: '100%' }} activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item
                  className="imgs-carousel"
                >
                  <img
                    src={product.images?.[0].url}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item
                  className="imgs-carousel"
                >
                  <img
                    src={product.images?.[1].url}
                    alt="Second slide"
                  />

                  <Carousel.Caption>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item
                  className="imgs-carousel"
                >
                  <img
                    className="imgs-carousel"
                    src={product.images?.[2].url}
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
            <div className="col-5 offset-1">
              <div className="row">
                <h4 className="text-muted">{product.brand}</h4>
                <div className="title row p-3 py-0">
                  <h3>{product.title}</h3>
                </div>
              </div>
              <div className="description row">
                <p>{product.description}</p>
              </div>
              <div className="row">
                <div className="col-6">
                  <h4 className="text-muted">Price</h4>
                  <div className="title row p-3 py-0">
                    <h3>${product.price}</h3>
                  </div>
                </div>
                <div className="col-6">
                  <h4 className="text-muted">Quantity</h4>
                  <div className="quantity">
                    <button onClick={() => parseInt(quantity) >= 2 ? (setQuantity(parseInt(parseInt(quantity) - 1))) : 0}>-</button>
                    <input type="text" value={quantity} onChange={e => parseInt(e.target.value) >= 1 ? setQuantity(parseInt(e.target.value)) : setQuantity(0)} />
                    <button onClick={() => setQuantity(parseInt(parseInt(quantity) + 1))}>+</button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 add-to-cart">
                  <button onClick={() => addProductCart()}>Add to Cart
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      { relatedProducts.length > 0 ?
        <div className="row">
        <div className="col-md-12 py-4">
          <h1>Productos Relacionados</h1>
          <ul className="product-list">
            {relatedProducts.map((productRelated) => (
              productRelated.id != id && (
              <li className="col-md-4 p-5" key={productRelated.id} onClick={() => navigate(`/product/${productRelated.id}`)}>
                <div className="product-card">
                  <div className="image">
                    <img src={productRelated.images?.[0].url} alt="" className="over" />
                    <img src={productRelated.images?.[1].url} alt="" />
                  </div>
                  <div className="info">
                    <h5 className="text-muted m-0">{productRelated.brand}</h5>
                    <div className="px-2">
                      <strong>{productRelated.title}</strong>
                    </div>
                    <div className="row">
                      <div className="col-md-6 pt-3">
                        <h6 className="text-muted m-0">Price</h6>
                        <div className="px-2">
                          <strong>{productRelated.price}</strong>
                        </div>
                      </div>
                      <div className="col-md-6 text-center m-auto">
                        <button className="cart-button">
                          <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>)
            ))}
          </ul>
        </div>
      </div>: ''
      }
    </>
  );
};

export default ProductDetail;
