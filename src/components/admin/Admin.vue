<template>
    <div class="row p-3">
        <div class="col-1 bg-secondary p-2">
            <router-link to="/admin/products" class="btn btn-block btn-primary"
                >Products</router-link
            >
            <router-link to="/admin/pages" class="btn btn-block btn-primary"
                >Pages</router-link
            >
            <router-link to="/admin/orders" class="btn btn-block btn-primary"
                >Orders</router-link
            >
        </div>

        <div class="col">
            <router-view />
        </div>
    </div>
</template>
