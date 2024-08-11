<script setup lang="ts">
interface Props {
    imageUrl: string,
    title: string,
    description?: string
}
defineProps<Props>();
</script>

<template>
    <div class="flex flex-col items-center text-center w-72 mx-auto">
        <img height="80px" width="80px" :src="imageUrl" alt="Info image">
        <h2 class="mt-4 mb-2 text-2xl font-medium">{{ title }}</h2>
        <p class="text-gray-400">{{ description }}</p>
    </div>
</template>