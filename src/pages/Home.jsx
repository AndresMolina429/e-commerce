import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  filterProductsCategoryThunk,
  filterProductsThunk,
  getProductsThunk,
} from "../store/slices/products.slice";

const Home = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [productSearch, setProductSearch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories/")
      .then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="row">
      <aside className="filters col-md-3 col-xl-3 py-5">
        <Accordion defaultActiveKey="0" className="w-100">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Categories

            </Accordion.Header>
            <Accordion.Body>
              <Button onClick={() => dispatch(getProductsThunk())}>Delete Filter</Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => dispatch(filterProductsCategoryThunk(category.id))}
                >
                  {category.name}
                </Button>
              ))}

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </aside>
      <section className="main-container col-md-9 col-xl-9">
        <div className="search-box row">
          <Form className="justify-content-center row py-5 mx-auto">
            <Form.Group className="px-0 col-md-6" controlId="search-input">
              <Form.Control type="text" placeholder="Search your products" value={productSearch} onChange={(e) => setProductSearch(e.target.value)}/>
            </Form.Group>
            <Form.Group className="px-0 col-md-1 aling-left" controlId="search-input">
              <Button className="w-100" variant="outline-primary" onClick={() => dispatch(filterProductsThunk(productSearch))}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </Form.Group>
          </Form>
        </div>
        <div className="row">
          <div className="col-md-12 py-4">
            <ul className="product-list">
              {productsList.map((product) => (
                <li className="col-md-4 p-5" key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="product-card">
                    <div className="image">
                      <img src={product.images?.[0].url} alt="" className="over" />
                      <img src={product.images?.[1].url} alt="" />
                    </div>
                    <div className="info">
                      <h5 className="text-muted m-0">{product.brand}</h5>
                      <div className="px-2">
                        <strong>{product.title}</strong>
                      </div>
                      <div className="row">
                        <div className="col-md-6 pt-3">
                          <h6 className="text-muted m-0">Price</h6>
                          <div className="px-2">
                            <strong>{product.price}</strong>
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
