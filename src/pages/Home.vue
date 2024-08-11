<script setup lang="ts">
import CardList from '../components/CardList.vue'
import debounce from 'lodash.debounce';
import { useProductStore, type ProductType } from '@/stores/product';

const productStore = useProductStore();
const onChangeSelect = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if(target) {
    productStore.updateFilter('sortBy', target.value);
  }
}

const onChangeSearchInput = debounce((event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if(target) {
    productStore.updateFilter('searchQuery', target.value);
  }
}, 500)

</script>

<template>
     <div class="flex justify-between items-center flex-wrap">
      <h2 class="text-3xl font-bold my-10">Все кроссовки</h2>
      <div class="flex gap-4 flex-wrap">
          <select @change="onChangeSelect" class="w-full py-2 px-3 border rounded-md outline-none sm:w-auto" name="" id="">
            <option value="title">По названию</option>
            <option value="price">По цене(дешевые)</option>
            <option value="-price">По цене(дорогие)</option>
          </select>
          <div class="relative sm:w-auto w-full">
            <img class="absolute top-3 left-4" src="/search.svg" alt="">
            <input @input="onChangeSearchInput" class="w-full border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400" type="text" placeholder="Поиск...">
          </div>
      </div>
     </div>
    <div class="mt-10">
      <card-list 
        :items="productStore.products" 
        @add-to-favorite="productStore.addToFavorite" 
        @add-to-cart="productStore.toggleItemCart"/>
    </div>
</template>