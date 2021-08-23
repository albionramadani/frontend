import Vue from "vue";
import VueRouter from "vue-router";

import Pages from "../components/Pages";
import ProductList from "../components/ProductList";
import ShoppingCart from "../components/ShoppingCart";
import Checkout from "../components/Checkout.vue";
import thanks from "../components/Thanks.vue";

import Admin from "../components/admin/Admin";



Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes:[
        {path: "/categories/:category", component: ProductList },
        {path: "/cart", component: ShoppingCart },
        {path: "/checkout", component: Checkout },
        {path: "/thanks", component: thanks },
        {path: "/admin", component: Admin },

        {path: "/:slug?", component: Pages},
        {path: "*", redirect: "/"},
    ],
});