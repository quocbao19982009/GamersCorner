import React, { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link, useHistory } from "react-router-dom";
import { createOrder } from "../actions/orderAction";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  // Calculated Prices
  cart.itemsPrice = Number(
    cartItems.reduce((acc, cur) => {
      return acc + cur.price * cur.qty;
    }, 0)
  );

  cart.shippingPrice = Number(
    cart.itemsPrice > 100 ? 0 : (cart.itemsPrice * 0.2).toFixed(2)
  );

  cart.taxPrice = Number((cart.itemsPrice * 0.15).toFixed(2));

  const totalPrice = Number(
    cart.itemsPrice + cart.taxPrice + cart.shippingPrice
  ).toFixed(2);

  cart.totalPrice = Number(totalPrice);

  const orderCreate = useSelector((state) => state.orderCreate);

  const { error, order, success } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
    } else {
      return;
    }
  }, [history, success, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );

    if (success) {
      history.push(`/orders/${order._id}`);
    }
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method:</h2>
              <strong>method: </strong>
              {paymentMethod}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {cartItems.length === 0 && <Message>Your Cart is Empty</Message>}
              {cartItems.length !== 0 && (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Items Price</Col>
                  <Col>$ {cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    {cart.itemsPrice > 100
                      ? "Free"
                      : `$ ${cart.shippingPrice.toFixed(2)}`}
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>

              {error && (
                <ListGroupItem>
                  <Message variant="danger">{error}</Message>
                </ListGroupItem>
              )}

              <ListGroupItem className="d-grid">
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  {" "}
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
