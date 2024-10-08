<template>
  <div class="app">
    <Sidebar />
    <div class="main">
      <Header />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
}

.main {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.content {
  padding: 20px;
  flex-grow: 1;
}
</style>
