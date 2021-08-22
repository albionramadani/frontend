import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import CartModule  from "./cart";

import OrdersModule from "./orders";

Vue.use(Vuex);

const baseUrl = "https://localhost:44369/api";

const pagesUrl = `${baseUrl}/pages`;
const categoriesUrl = `${baseUrl}/categories`;
const productsUrl = `${baseUrl}/products`;
const productImagesUrl = "https://localhost:44369/media/products/";
export default new Vuex.Store({
  strict: true,
  modules: {
      cart: CartModule,
      orders: OrdersModule,
  },
  state: {
    pages: [],
    categories: [],
    products: [],
    productImages: productImagesUrl,
    currentPage: 1,
    pageCount: 0,
    pageSize: 4,
    currentCategory: "all",
  },
  mutations: {
    setPages(state, pages) {
      state.pages = pages;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setPageCount(state, count) {
      state.pageCount = Math.ceil(Number(count) / state.pageSize);
    },
    setCurrentCategory(state, category) {
      state.currentCategory = category;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
  },
  actions: {
    async setPagesAction(context) {
      context.commit("setPages", (await Axios.get(pagesUrl)).data);
    },
    async setCategoriesAction(context) {
      context.commit("setCategories", (await Axios.get(categoriesUrl)).data);
    },
    async setProductsByCategoryAction(context, category) {
      let url;
      let productCountUrl;
      if (category != "all") {
        url = `${productsUrl}/${category}?p=${context.state.currentPage}`;
        productCountUrl = `${productsUrl}/count/${category}`;
      } else {
        url = `${productsUrl}`;
        productCountUrl = `${productsUrl}/count/all`;
      }

      let productCount = (await Axios.get(productCountUrl)).data;

      context.commit("setPageCount", productCount);
      context.commit("setProducts", (await Axios.get(url)).data);
    },

    //-------Page-ing -----------//
    async setProductsByCategoryPaginationAction(context, page) {
        let url;
        if (context.state.currentCategory !== "all") {
            url = `${productsUrl}/${context.state.currentCategory}?p=${page}`;
        } else {
            url = `${productsUrl}?p=${page}`;
        }

        context.commit("setProducts", (await Axios.get(url)).data);
    },
  },
});
