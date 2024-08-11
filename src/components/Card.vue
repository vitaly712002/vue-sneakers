
<script setup lang="ts">

interface Props {
  id: number,
  imageUrl: string
  title: string
  price: number
  isFavorite?: boolean
  isAdded?: boolean
  onClickAdd: () => void
  onClickFavorite: () => void
}

const props = defineProps<Props>()

</script>

<template>
     <div class="
      flex
      flex-col
      bg-white
      relative
      border
      borsder-slate-100
      rounded-3xl
      p-8
      hover:-translate-y-2
      hover:shadow-xl
      cursor-pointer
      transition"
     >
      <img @click="onClickFavorite" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" class="absolute top-4 left-4" alt="Like 1">
      <img :src="imageUrl" alt="Sneaker">
      <div class="mt-auto">
        <p class="mt-2">
        {{ title }}
        </p>
        <div class="flex justify-between mt-5">
          <div class="flex flex-col">
            <span class="text-slate-400">Цена:</span>
            <b>{{ price }} руб.</b>
          </div>
          <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : 'checked.svg'" alt="plus">
        </div> 
      </div>
    
    </div>
</template>