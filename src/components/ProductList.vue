<template>
    <div class="row mt-3">
            <CategoryList />

        <div class="col-9">
            <div class= "row">
                <div class="col-4 mt-3" v-for="(p, i) in products" :key="i">
                    <p>
                          <img :src="productImages+p.image" class="img-fluid" />
                    </p>
                    <h3>
                        {{ p.name }}
                    </h3>
                    <p>
                        {{ p.description }}
                    </p>
                    <p>
                        {{ p.price | currency }}
                    </p>
                    <p>
                        <button class="btn btn-primary">Add to Cart</button>
                    </p>
                </div>
            </div>
           
        </div>
    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";

import CategoryList from "./CategoryList";

export default {
    components: {
        CategoryList
    },
    computed:{
            ...mapState(["products","productImages"]),
        },
        methods:{
            ...mapActions(["setProductsByCategoryAction"])
        },
        created(){
             let category = this.$route.params.category;
            this.setProductsByCategoryAction(category);
        },
        beforeRouteUpdate(to, from, next ){
            this.setProductsByCategoryAction(to.params.category);
            next();
        }
    };
</script>