<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* Estilo Global - Black Reaper Mode */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  /* Substitua o link abaixo por uma URL de imagem do Kaneki Black Reaper */
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), 
                    url('https://wallpaperaccess.com/full/8963422.png'); 
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* A imagem não corre quando você rola a página */
  background-color: #000;
}

#app {
  min-height: 100vh;
}
</style>