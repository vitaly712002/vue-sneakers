<script setup lang="ts">
import type { OrderType } from '@/stores/product';
import CartItem from './CartItem.vue';

const props = defineProps<OrderType>();
console.log(props);
</script>

<template>
    <div class="gap-5 flex flex-col flex-1" v-auto-animate>
        <h3 class="text-xl font-bold my-10">
        Заказ № {{ id }}
        </h3>
        <cart-item
        v-for="item in cart"
        :key="item.id"
        :title="item.title"
        :id="item.id"
        :price="item.price"
        :imageUrl="item.imageUrl"
        :hideRemoveBtn="true"
        />
    </div>
    <div class="my-5">
        Итоговая сумма: <b>{{ totalPrice }} руб.</b>
    </div>
    <hr>
</template>