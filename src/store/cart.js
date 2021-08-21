export default{
    namespaced: true,
    state:{
        cart: []
    },
    getters:{
        itemCount: (state) => state.cart.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0),
        totalPrice: (state) => state.cart.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.product.price,
            0
            ),
    },
};