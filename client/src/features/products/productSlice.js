import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
// import { PRODUCTS_PER_PAGE } from "../../app/config";

const initialState = {
    isLoading: false,
    error: null,
    productsById: {},
    currentPageProducts: [],
};

const slice = createSlice({
    name: "product",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },

        hasError(state, action) {
            state.isLoading = false;
            state.error = null;
        },
        resetProducts(state, action) {
            state.postsById = {};
            state.currentPageProducts = [];
        },
        getProductsSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const { products, count, totalPage } = action.payload;
            products.forEach(product => {
                state.productsById[product._id] = product;
            })
            state.currentPageProducts = products.map(product => product._id);
            state.totalProducts = count;
            state.totalPage = totalPage;
        },
        getProductDetailSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            state.productsById = action.payload;
            state.currentPageProducts = [];
        },
    }
});

export default slice.reducer;
export const { resetProducts } = slice.actions;

export const getProducts = ({ categories, name, page, limit }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const params = { page, limit };
        if (name) params.name = name;
        if (categories) params.categories = categories;
        const response = await apiService.get(`/products`, {
            params,
        });
        dispatch(slice.actions.getProductsSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const getProductDetail = (id) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.get(`/products/${id}`);
        dispatch(slice.actions.getProductDetailSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
}

