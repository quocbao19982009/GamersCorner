import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { listProducts } from "../actions/productActions";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import { Link, useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const keyword = useParams().keyword;

  const pageNumber = useParams().pageNumber || 1;

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta></Meta>
      {!keyword ? (
        <ProductCarousel></ProductCarousel>
      ) : (
        <Link to="/">Go Back</Link>
      )}
      <h2 className="py-3">LASTEST PRODUCT</h2>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {!error && (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          ></Paginate>
        </>
      )}
    </>
  );
};

export default HomeScreen;

// Fetching data using Fetch()
// useEffect(() => {
//   const fetchProduct = async function () {
//     try {
//       const respone = await fetch("/api/product/");
//       // This has to change poxy in package.json so it will look into localhost:5000 instead of 3000
//       if (!respone.ok) {
//         throw new Error("Request Fail");
//       }
//       const data = await respone.json();

//       setProducts(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   fetchProduct();
// }, []);
