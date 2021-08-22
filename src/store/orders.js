import Axios from "axios";

const ordersUrl ="https://localhost:44369/api/orders"

export default{
    namespaced: true,
    state:{
        orders: []
    },
    
    mutations:{
      
    },
    actions:{
      async storeOrderAction(context, order){
          return (await Axios.post(ordersUrl,order)).data.id
      }
    },
};