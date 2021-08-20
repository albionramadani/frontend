<template>
    <div class="row mt-3">

        <div class="col">
            <CategoryList/>
        </div>

        <div class="col-9">
           {{pageContent}}
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import CategoryList from "./CategoryList.vue";
export default {
  components: {
      CategoryList
  },
  computed:{
          ...mapState(["pages"]),
        pageContent(){
              let slug =this.$route.params.slug ? this.$route.params.slug : "home" ;
              let page = this.pages.find(page => page.slug == slug);
              
              if(page){
                  return page.content;
              }

              return "";
        }
    },
};
</script>