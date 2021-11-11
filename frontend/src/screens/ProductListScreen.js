import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { useHistory, useParams } from "react-router";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = () => {
  const pageNumber = useParams().pageNumber || 1;
  const dispatch = useDispatch();
  const history = useHistory();
  const productList = useSelector((state) => state.productList);
  const { products, error, loading, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const createProductData = useSelector((state) => state.createProduct);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = createProductData;

  const deteleProductData = useSelector((state) => state.deteleProduct);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = deteleProductData;

  console.log(deteleProductData);
  let isLogin;
  if (!userInfo) {
    isLogin = false;
  } else {
    isLogin = true;
  }
  useEffect(() => {
    dispatch({
      type: PRODUCT_CREATE_RESET,
    });

    if (successCreate) {
      history.push(`/admin/product/${createProductData.product._id}/edit`);
    }

    if (isLogin && userInfo.isAdmin) {
      dispatch(listProducts("", pageNumber));
    } else {
      history.push("/login");
    }
  }, [
    dispatch,
    userInfo,
    history,
    isLogin,
    successDelete,
    successCreate,
    pageNumber,
    createProductData.product._id,
  ]);

  const deleteHandler = (id) => {
    console.log(deteleProductData);
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {!loading && !error && (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATERGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>$ {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true}></Paginate>
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
