import Axios from "axios";

const loginUrl ="https://localhost:44369/api/auth";

export default{
    namespaced: true,
    state:{
        authenticated: false
    },
    
    mutations:{
      setAuthenticated(state){
          state.authenticated = true;
      }
    },
    actions:{
      async authenticate(context, credentials){
          let response = await Axios.post(loginUrl, credentials);
          if(response.data.succses == true){
              context.commit("setAuthenticated");
          }
      },
      
    },
};