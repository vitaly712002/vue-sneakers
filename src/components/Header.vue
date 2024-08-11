<script setup lang="ts">
const emit = defineEmits(['openDrawer']);

interface Props {
  totalPrice: number
}

defineProps<Props>();
</script>
<template>
    <header class="flex justify-between border-b border-slate-100 py-8 flex-wrap gap-5">
      <router-link to="/">
        <div class="flex items-center gap-4">
            <img class="w-10" src="/logo.png" alt="Logo">
            <div>
              <h2 class="text-xl font-bold uppercase">Vue sneakers</h2>
              <p class="text-slate-400">Магазин лучших кроссовок</p>
            </div>
        </div>
      </router-link>

      <ul class="flex items-center gap-10 flex-wrap">
        <li @click="() => emit('openDrawer')" class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/cart.svg" alt="Card">
          <b>{{ totalPrice }} руб.</b>
        </li>
       <router-link 
       to="favorites"
       >
       <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/heart.svg" alt="Card">
          <span>Закладки</span>
        </li>
      </router-link>
      <router-link to="/profile">
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/profile.svg" alt="Card">
          <span>Профиль</span>
        </li>
      </router-link>
      </ul>
    </header>
</template>