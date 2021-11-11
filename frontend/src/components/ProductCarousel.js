import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import classes from "./ProductCarousel.module.css";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const topProduct = useSelector((state) => state.topProduct);
  const { products, error, loading } = topProduct;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return (
    <>
      {loading && <Loader></Loader>}
      {error && <Message variant="danger">{error}</Message>}
      {!loading && !error && (
        <Carousel pause="hover" className={`bg-secondary ${classes.carousel}`}>
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                  className="d-block"
                ></Image>
                <Carousel.Caption className="carousel-caption">
                  <h2>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarousel;
