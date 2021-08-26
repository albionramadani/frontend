import Vue from "vue";
import VueRouter from "vue-router";

import Pages from "../components/Pages";
import ProductList from "../components/ProductList";
import ShoppingCart from "../components/ShoppingCart";
import Checkout from "../components/Checkout.vue";
import thanks from "../components/Thanks.vue";

import Admin from "../components/admin/Admin";
import Products from "../components/admin/Products";
import ProductEditor from "../components/admin/ProductEditor";
import AdminPages from "../components/admin/Pages";
import PageEditor from "../components/admin/PageEditor";


Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/categories/:category", component: ProductList },
    { path: "/cart", component: ShoppingCart },
    { path: "/checkout", component: Checkout },
    { path: "/thanks", component: thanks },
    {
      path: "/admin",
      component: Admin,
      children: [
            {path: "products", component: Products},
            {path: "products/:op(add|edit)/:id(\\d+)?", component: ProductEditor},
            {path: "pages", component: AdminPages},
            {path: "pages/:op(add|edit)/:id(\\d+)?", component: PageEditor},

            {path: "*", redirect: "/admin/products"},
        ],
    },

    { path: "/:slug?", component: Pages },
    { path: "*", redirect: "/" },
  ],
});
