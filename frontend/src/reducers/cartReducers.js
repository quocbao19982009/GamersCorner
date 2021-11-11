import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET,
} from "../constants/cartConstants";

export const cartReducers = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // Item that are being added
      const existItem = state.cartItems.find((x) => x.product === item.product);
      // Here in cartItems.product is the product Id
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
          // .map( nếu x.product === existItem.product (tồn tại) thì trả lại Item If not thì trả lại cái cũ)
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      const removeItemId = action.payload;

      const newOrder = state.cartItems.filter(
        (x) => x.product !== removeItemId
      );

      return {
        ...state,
        cartItems: newOrder,
      };
    case CART_RESET:
      return { cartItems: [], shippingAddress: {} };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
