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
const emit = defineEmits(['delete-task', 'enable-edit-task', 'edit-task','check-task'])
</script>

<template>
  <v-toolbar dense flat >
    <v-div>
      <v-checkbox :model-value="done" :label="text" style="color: green" @click="emit('check-task')" ></v-checkbox>
    </v-div>
    
    <v-card-text>
      <span>{{ task }}</span>
    </v-card-text>
    <v-btn v-show="!edit" @click="emit('enable-edit-task')">{{ $t('editButton')}}</v-btn>
    <v-btn v-show="edit" @click="emit('edit-task')">OK</v-btn>
    <v-btn @click="emit('delete-task')">X</v-btn>
  </v-toolbar>
</template>
