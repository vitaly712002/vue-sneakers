<script setup lang="ts">
import type { ProductType } from '@/stores/product';
import Card from './Card.vue'

interface Props {
     items: ProductType[]
}
defineProps<Props>();

const emit = defineEmits(['addToFavorite', 'addToCart']);

</script>

<template>
     <div class="gap-5 grid sm:grid-cols-2 xl:grid-cols-3" v-auto-animate>
          <Card  
               v-for="item in items"
               :key="item.id"
               :price="item.price"
               :isAdded="item.isAdded"
               :isFavorite="item.isFavorite"
               :title="item.title"
               :imageUrl="item.imageUrl"
               :onClickFavorite="() => emit('addToFavorite', item.id)"
               :onClickAdd ="() => emit('addToCart', item.id)" />
    </div>
</template>