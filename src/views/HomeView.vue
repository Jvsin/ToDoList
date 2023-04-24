<script setup>

</script>

<template>
  <main>
    <h1> LISTA TODO:</h1>
    <p>Dodaj nowe zadanie: {{ message }}</p>
    <input v-model="message" placeholder="zadanie" />
    
  </main>
</template>
