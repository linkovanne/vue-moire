import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default new Vuex.Store({
  state: {
    userAccessKey: null,
    productList: [],
    cartProducts: [],
    cartProductsData: [],
    pagination: null,
    total: 0,
    colors: [],
  },
  mutations: {
    updateUserAccessKey(state, userAccessKey) {
      state.userAccessKey = userAccessKey;
    },
    updateProductList(state, productData) {
      state.productList = productData.items;
      state.total = productData.pagination.total;
    },
    updateColors(state, colors) {
      state.colors = colors;
    },
    addCartProductData(state, items) {
      state.cartProductsData = items;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));
    },
  },
  getters: {
    productListInfo(state) {
      return state.productList;
    },
    cartDetailedProducts(state) {
      return state.cartProductsData;
    },
    cartTotalQuantity(state, gettres) {
      return gettres.cartDetailedProducts.reduce((acc, item) => (item.quantity) + acc, 0) || 0;
    },
    cartTotalPrice(state, gettres) {
      // eslint-disable-next-line max-len
      return gettres.cartDetailedProducts.reduce((acc, item) => (item.price * item.quantity) + acc, 0);
    },
    totalInfo(state) {
      return state.total;
    },
    filterColorIds(state) {
      return state.colors;
    },
  },
  actions: {
    // @todo use async await
    getCartData(context) {
      return axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((res) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', res.data.user.accessKey);
            context.commit('updateUserAccessKey', res.data.user.accessKey);
          }

          context.commit('addCartProductData', res.data.items);
          context.commit('syncCartProducts');
        });
    },
    addProductToCart(context, {
      productId,
      quantity,
      sizeId,
      colorId,
    }) {
      // eslint-disable-next-line no-promise-executor-return
      return (new Promise((resolve) => setTimeout(resolve, 200)))
        .then(() => axios
          .post(`${API_BASE_URL}/api/baskets/products`, {
            productId,
            quantity,
            sizeId,
            colorId,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((res) => {
            context.commit('addCartProductData', res.data.items);
            context.commit('syncCartProducts');
          }));
    },
    getProductList(context, params) {
      return axios
        .get(`${API_BASE_URL}/api/products`, {
          params: JSON.parse(params),
        })
        .then((response) => context.commit('updateProductList', response.data));
    },
    getColors(context) {
      return axios
        .get(`${API_BASE_URL}/api/colors`)
        .then((response) => context.commit('updateColors', response.data));
    },
  },
});
