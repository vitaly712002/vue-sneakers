<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import { useProductStore } from './stores/product';

const drawerOpen = ref<boolean>(false);

const closeDrawer = () => {
  drawerOpen.value = false;
}

const openDrawer = () => {
  drawerOpen.value = true;
}

export type CartProvideData = {
  closeDrawer: () => void,
  openDrawer: () => void
}


provide<CartProvideData>('cart', {
  closeDrawer,
  openDrawer
});

const productStore = useProductStore();
onMounted(async () => {
  await productStore.getProducts();
  await productStore.getFavorites();
});
</script>

<template>
  <div
    class="
      p-5 
      sm:p-10
      w-4/5
      m-auto
      bg-white
      min-h-full
      rounded-xl
      shadow-xl
      mt-14">
    <Header :total-price="productStore.totalPrice" @open-drawer="openDrawer"/>
    <Drawer
      v-if="drawerOpen"
    />
    <router-view>

    </router-view>
  </div>
</template>

<style scoped lang="scss"></style>
