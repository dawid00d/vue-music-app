<template>
    <div role="status" class="max-w-sm animate-pulse">
        <div class="h-2.5 bg-gray-200 dark:bg-gray-700 w-48 mb-4" :class="className"></div>
        <span class="sr-only">Loading...</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    className?: string
}>()
</script>