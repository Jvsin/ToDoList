<script setup>
defineProps({
  id: Number,
  task: String,
  done: Boolean,
  edit: Boolean
})
const emit = defineEmits(['usunTaska', 'wlaczEdycjeTaska', 'edytujTaska','odznaczTaska'])
</script>

<template>
    <input type="checkbox" @click="emit('odznaczTaska')">
    <span>{{ task }}</span>
    <button v-show="!edit" @click="emit('wlaczEdycjeTaska')">Edytuj</button>
    <button v-show="edit" @click="emit('edytujTaska')">OK</button>
    <button @click="emit('usunTaska')">X</button>
</template>
