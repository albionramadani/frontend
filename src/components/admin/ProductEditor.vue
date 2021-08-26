<template>
  <div>
    <h2 class="text-center p-2">
      {{ editMode ? "Edit Product" : "AddProduct" }}
    </h2>

    <div class="form-group">
      <label for="">Name</label>
      <input type="text" class="form-control" v-model="product.name" />
    </div>

    <div class="form-group">
      <label for="">Description</label>
      <textarea class="form-control" v-model="product.description"></textarea>
    </div>
    <div class="form-group">
      <label for="">Price</label>
      <input type="text" class="form-control" v-model="product.price" />
    </div>
    <div class="form-group">
      <label for="">Image</label>
      <input type="file" class="form-control" @change="onFileSelected" />
      <p v-if="editMode" class="mt-3">
        Current Image:
        <img :src="productImages + product.image" width="100" />
      </p>
    </div>
    <div class="form-group">
      <label for="">Category</label>
      <select class="form-control" @change="onChange">
        <option :value="null">Choose a category</option>
        <option
          v-for="(c, i) in categories"
          :key="i"
          :value="c.id"
          :selected="c.id == product.category"
        >
          {{ c.name }}
        </option>
      </select>
    </div>
    <div class="text-center">
      <router-link to="/admin/products" class="btn btn-secondary mb-1"
        >Cancel</router-link
      >
      <button class="btn btn-primary mx-1" @click="handleProduct">
        {{ editMode ? "Edit " : "Add" }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
// import ProductPagination from "../ProductPagination";

export default {
  data() {
    return {
      product: {
        name: null,
        description: null,
        price: null,
        image: null,
        category: null,
      },
    };
  },
  computed: {
    ...mapState(["categories", "productImages"]),

    editMode() {
      return this.$route.params["op"] == "edit";
    },
  },
  methods: {
    ...mapMutations(["setCurrentPage"]),
    ...mapActions(["addProduct", "editProduct"]),
    onFileSelected(e) {
      this.product.image = e.target.files[0];
    },
    onChange(e) {
      this.product.category = e.target.value;
    },
    async handleProduct() {
      const product = new FormData();
      product.append("Name", this.product.name);
      product.append("Description", this.product.description);
      product.append("Price", this.product.price);
      product.append("ImageUpload", this.product.image);
      product.append(
        "CategoryId",
        this.product.category.id || this.product.category
      );
      if (this.editMode) {
        product.append("Id", this.product.id);
        product.append("Image", this.product.image.name);

        await this.editProduct(product);
      } else {
        await this.addProduct(product);
      }
      this.setCurrentPage(1);
      this.$router.push("/admin/products");
    },
  },

  created() {
    if (this.editMode) {
      Object.assign(
        this.product,
        this.$store.getters.productById(this.$route.params["id"])
      );
    }
  },
};
</script>