import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
    isLoading: false,
    error: null,
    cart: {},
    orders: [],
    delivery: {
        address: "",
        receiver: "",
        numberOfPhone: "",
    },
};

const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        resetCart(state, action) {
            state.cart = {};
        },
        getProductsInCartSuccess(state, action) {
            state.isLoading = false;
            state.hasError = null;
            const { cart } = action.payload;
            state.cart = cart;
        },
        addProductsTocartSuccess(state, action) {
            state.isLoading = false;
            state.hasError = null;
            const { cart } = action.payload;
            state.cart = cart;
        },
        checkoutSuccess(state, action) {
            state.isLoading = false;
            state.hasError = null;

            const { order } = action.payload;
            console.log("order", order)
            state.orders = state.orders.push(order);
        },
        setDeliverySuccess(state, action) {
            const delivery = action.payload;
            state.delivery = { ...delivery, delivery }
        }
    }
});

export default slice.reducer;
export const { resetCart } = slice.actions;

export const getProductInCart = () => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.get("/cart");
        dispatch(slice.actions.getProductsInCartSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const addProductsToCart = ({ productId, quantity, cartId }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        if (!quantity) quantity = 1;
        const response = await apiService.post("/cart/add", { productId, quantity, cartId });
        dispatch(slice.actions.addProductsTocartSuccess(response.data));
        dispatch(getProductInCart());
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const setDelivery = ({ address, numberOfPhone, receiver }) => (dispatch) => {
    dispatch(slice.actions.setDeliverySuccess({ address, numberOfPhone, receiver }))
};

export const checkout = ({ cartProducts, delivery, totalPrice, user }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.post("/orders/add", { cartProducts, delivery, totalPrice, user });
        dispatch(slice.actions.checkoutSuccess(response.data));
        dispatch(resetCart());
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

