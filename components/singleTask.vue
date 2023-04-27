<script setup>
defineProps({
  id: {
    type: Number,
    default: 0
  },
  task:{
    type: String,
    default: ""
  },
  done: {
    type: Boolean,
    default: false
  } ,
  edit:{
    type: Boolean,
    default: false
  } 
})
const emit = defineEmits(['deleteTask', 'enableEditTask', 'editTask','checkTask'])
</script>

<template>
    <input type="checkbox" @click="emit('checkTask')">
    <span>{{ task }}</span>
    <button v-show="!edit" @click="emit('enableEditTask')">Edytuj</button>
    <button v-show="edit" @click="emit('editTask')">OK</button>
    <button @click="emit('deleteTask')">X</button>
</template>
