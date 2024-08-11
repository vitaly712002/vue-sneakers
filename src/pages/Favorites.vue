<script setup lang="ts">
import InfoBlock from '@/components/InfoBlock.vue';
import CardList from '../components/CardList.vue'
import { useProductStore } from '@/stores/product';

const productStore = useProductStore();

</script>

<template>
  <h2 class="text-3xl font-bold my-10">Закладки</h2>
  <card-list 
    v-if="productStore.favorites.length"
    :items="productStore.favorites.map(obj => obj.item)" @add-to-favorite="productStore.addToFavorite"
    @add-to-cart="productStore.toggleItemCart"
    />
    <info-block
        v-else
        title="Закладки пустые"
        imageUrl="/package-icon.png"
      />
</template>