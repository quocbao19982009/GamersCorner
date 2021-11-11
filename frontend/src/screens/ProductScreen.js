import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./ProductScreen.module.css";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { useParams, useHistory } from "react-router-dom";
import {
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Button,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";
// import products from "../products";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productId = useParams().id;

  const history = useHistory();

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);

  const { loading, product, error } = productDetail;
  console.log("reviews", product.reviews);
  console.log("name", product.name);

  const reviewProduct = useSelector((state) => state.reviewProduct);

  const { success: successReview, error: errorReview } = reviewProduct;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    if (successReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successReview]);

  // const cart = useSelector((state) => state.cart);

  // cart.itemsPrice = cart.cartItems.reduce((acc, cur) => {
  //   return acc + cur.price * cur.qty;
  // }, 0);

  // cart.shippingPrice = cart.itemsPrice > 100 ? 0 : cart.itemsPrice * 0.5;
  // cart.taxPrice = Number((cart.itemsPrice * 0.15).toFixed(2));
  // cart.totalPrice = Number(
  //   cart.itemsPrice + cart.taxPrice + cart.shippingPrice
  // ).toFixed(2);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };
  // const product = products.find((p) => p._id === productId);
  // console.log(product);
  // console.log(productId);

  return (
    <>
      <Link className="btn btn-light mb-3" to="/">
        Go Back
      </Link>
      {loading && <Loader></Loader>}
      {error && <Message variant="danger">{error}</Message>}
      {!loading && !error && (
        <>
          <Meta title={product.name}></Meta>
          <Row>
            <Col md={6}>
              <Image
                className={`img-fluid ${classes.image}`}
                src={product.image}
                alt={product.name}
              ></Image>
            </Col>
            <Col md={6} lg={3} className={classes.colDescription}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem className={classes.rating}>
                  <Rating
                    value={product.rating}
                    text={` ${product.numReviews} Reviews`}
                  ></Rating>
                </ListGroupItem>
                <ListGroupItem className={classes.price}>
                  $ {product.price}
                </ListGroupItem>
                <ListGroupItem className={classes.description}>
                  {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3} className={classes.info}>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Quanity:</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                        {
                          /* Array(num) => Create an Array with num children */
                          // [...Array(num).key()] => Crate an Array with [0,1,2...num]
                        }
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}

              <ListGroupItem>
                <Button
                  onClick={addToCartHandler}
                  style={{ width: "100%" }}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock > 0 ? false : true}
                >
                  {" "}
                  Add to Cart
                </Button>
              </ListGroupItem>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews && product.reviews.length === 0 && (
                <Message>No Review</Message>
              )}
              <ListGroup>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroupItem key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating}></Rating>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroupItem>
                  ))}
                <ListGroupItem>
                  <h2>Write Customer Reivew</h2>
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId="rating">
                        <Form.Select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value={0}>Select...</option>
                          <option value={1}>1 - Poor</option>
                          <option value={2}>2 - Fair</option>
                          <option value={3}>3 - Good</option>
                          <option value={4}>4 - Very Good</option>
                          <option value={5}>5 - Excelent</option>
                        </Form.Select>
                      </FormGroup>
                      <FormGroup controlId="comment">
                        <FormLabel>Comment</FormLabel>
                        <FormControl
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                        ></FormControl>
                      </FormGroup>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="none">
                      {" "}
                      <Link to="/login">Login to write Reivew</Link>
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
