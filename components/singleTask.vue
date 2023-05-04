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
  <v-toolbar dense flat >
    <v-div>
      <v-checkbox :model-value="done" :label="text" style="color: green" @click="emit('checkTask')" ></v-checkbox>
    </v-div>
    
    <v-card-text>
      <span>{{ task }}</span>
    </v-card-text>
    <v-btn v-show="!edit" @click="emit('enableEditTask')">Edytuj</v-btn>
    <v-btn v-show="edit" @click="emit('editTask')">OK</v-btn>
    <v-btn @click="emit('deleteTask')">X</v-btn>
  </v-toolbar>
</template>
