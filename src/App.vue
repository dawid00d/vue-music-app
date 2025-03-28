<template>
  <div class="h-screen w-screen overflow-hidden">
    <div class="flex h-screen w-full">
      <Navigation />
      <div class="flex-1 overflow-auto bg-gray-50">
        <div class="p-8">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
