<script setup lang="ts">
import InfoBlock from '@/components/InfoBlock.vue';
import OrderList from '@/components/OrderList.vue';
import { useProductStore } from '@/stores/product';
import { onMounted } from 'vue';

const productStore = useProductStore();
onMounted(() => {
    productStore.getOrders();
})
</script>

<template>
   <h2 class="text-3xl font-bold my-10">Профиль</h2>
   <div v-if="productStore.orders.length">
    <order-list 
        v-for="order in productStore.orders.reverse()"
            :key="order.id"
            :cart="order.cart"
            :id="order.id"
            :totalPrice="order.totalPrice"
        />
   </div>
    <info-block
        v-else
        title="Заказов нету"
        imageUrl="/package-icon.png"
      />
</template>