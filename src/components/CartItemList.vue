<script setup lang="ts">
import { useProductStore } from '@/stores/product';
import CartItem from './CartItem.vue';

const productStore = useProductStore();

</script>

<template>
    <div class="gap-5 flex flex-col flex-1" v-auto-animate>
        <cart-item 
        v-for="item in productStore.cart"
        :key="item.id"
        :title="item.title"
        :id="item.id"
        :price="item.price"
        :imageUrl="item.imageUrl"
        @on-click-remove="() => productStore.removeFromCart(item.id)"
        />
    </div>
</template>