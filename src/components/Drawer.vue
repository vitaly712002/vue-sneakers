<script setup lang="ts">
import DrawerHead from './DrawerHead.vue';
import CartItemList from './CartItemList.vue';
import InfoBlock from './InfoBlock.vue'
import { computed, ref } from 'vue';
import { useProductStore } from '@/stores/product';
const productStore = useProductStore();

const disabledButton = computed(() => {
  return productStore.isCreatingOrder ? true : !productStore.totalPrice ? true : false;
})

</script>
<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black/40 z-10">
    <div class="bg-white sm:w-96 w-full h-full fixed right-0 top-0 z-20 p-8">
      <drawer-head/>
     <div v-if="productStore.totalPrice">
      <cart-item-list />
      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2 my-6">
          <span>
            Итого:
          </span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ productStore.totalPrice }} ₽</b>
        </div>
        <div class="flex gap-2">
          <span>
            Налог 5%:
          </span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ productStore.vatPrice }} ₽</b>
        </div>
        
        <button
        @click="productStore.createOrder"
        :disabled="disabledButton"
        class="
          bg-lime-500 w-full
          rounded-xl
          py-3
          mt-4
          text-white
          translate-x-0
          hover:bg-lime-600
          active:bg-lime-700
          disabled:bg-gray-300
          cursor-pointer">
          Оформить заказ
        </button>
      </div>
     </div>
     <div v-else class="h-full flex items-center">
      <info-block
        v-if="!productStore.lastCreatedOrderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
        imageUrl="/package-icon.png"
      />
      <info-block
        v-else
        title="Заказ оформлен"
        :description="`Ваш заказ ${productStore.lastCreatedOrderId} оформлен и скоро будет передан в доставку`"
        imageUrl="/order-success-icon.png"
      />
     </div>
    </div>
  </div>
</template>
