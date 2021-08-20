import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

const baseUrl = "https://localhost:44369/api";

const pagesUrl = `${baseUrl}/pages`;
const categoriesUrl = `${baseUrl}/categories`;
const productsUrl = `${baseUrl}/products`;
const productImagesUrl = "https://localhost:44369/media/products/";
export default new Vuex.Store({
  strict: true,
  state: {
    pages: [],
    categories: [],
    products: [],
    productImages:productImagesUrl,
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
      if (category != "All") {
        url = `${productsUrl}/${category}`;
      } else {
        url = `${productsUrl}`;
      }
      context.commit("setProducts", (await Axios.get(url)).data);

    },
  },
});
