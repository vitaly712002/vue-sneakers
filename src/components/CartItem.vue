<script setup lang="ts">
import { computed } from 'vue';



interface Props {
  id: number,
  imageUrl: string
  title: string
  price: number
  isFavorite?: boolean
  isAdded?: boolean
  hideRemoveBtn?: boolean
}
const emit = defineEmits(['onClickRemove']);
defineProps<Props>();
</script>
<template>
    <div class="flex items-center border border-slate-100 p-4 rounded-xl gap-4">
        <img class="w-16 h-16" :src="imageUrl" :alt="title">
        <div class="flex flex-col flex-1">
            <p>{{ title }}</p>
            <div class="flex justify-between mt-2">
                <b class="flex-1">{{ price }} руб.</b>
                <img v-if="!hideRemoveBtn" @click="emit('onClickRemove')" class="opacity-40 hover:opacity-100 cursor-pointer transition" src="/close.svg" alt="">
            </div>
        </div>
    </div>
</template>