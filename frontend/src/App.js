import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
  return (
    <>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="/register">
            <RegisterScreen></RegisterScreen>
          </Route>
          <Route path="/product/:id">
            <ProductScreen></ProductScreen>
          </Route>
          <Route path="/cart/:id?">
            {/* /cart/:id? => Question marks is for optional */}
            <CartScreen></CartScreen>
          </Route>
          <Route path="/profile">
            <ProfileScreen></ProfileScreen>
          </Route>
          <Route path="/shipping">
            <ShippingScreen></ShippingScreen>
          </Route>
          <Route path="/payment">
            <PaymentScreen></PaymentScreen>
          </Route>
          <Route path="/placeorder">
            <PlaceOrderScreen></PlaceOrderScreen>
          </Route>
          <Route path="/orders/:id">
            <OrderScreen></OrderScreen>
          </Route>
          <Route path="/admin/userlist">
            <UserListScreen></UserListScreen>
          </Route>
          <Route path="/admin/user/:id/edit">
            <UserEditScreen></UserEditScreen>
          </Route>
          <Route path="/admin/productlist/" exact>
            <ProductListScreen></ProductListScreen>
          </Route>
          <Route path="/admin/productlist/:pageNumber" exact>
            <ProductListScreen></ProductListScreen>
          </Route>
          <Route path="/admin/product/:id/edit">
            <ProductEditScreen></ProductEditScreen>
          </Route>
          <Route path="/admin/orderlist/">
            <OrderListScreen></OrderListScreen>
          </Route>
          <Route path="/search/:keyword" exact>
            <HomeScreen></HomeScreen>
          </Route>
          <Route path="/page/:pageNumber" exact>
            <HomeScreen></HomeScreen>
          </Route>
          <Route path="/search/:keyword/page/:pageNumber" exact>
            <HomeScreen></HomeScreen>
          </Route>
          <Route path="/" exact>
            <HomeScreen></HomeScreen>
          </Route>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
