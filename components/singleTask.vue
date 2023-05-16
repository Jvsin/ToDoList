<script setup>
//import { ref } from 'vue'
import { useCounterStore } from '../src/stores/tasks'
defineProps({
  task: {
    type: String,
    default: ''
  },

  done: {
    type: Boolean
  },

  edit: {
    type: Boolean
  }
})

// eslint-disable-next-line vue/require-emit-validator
const emit = defineEmits(['delete-task', 'enable-edit-task', 'editTask', 'check-task'])

const store = useCounterStore()
//const newName = ref('')

function emitEditingTask() {
  emit('editTask', store.newName.value)
  store.newName = ''
}
</script>

<template>
  <v-toolbar dense flat>
    <v-div>
      <v-checkbox :model-value="done" style="color: green" @click="emit('check-task')"></v-checkbox>
    </v-div>

    <v-card-text v-show="!edit">
      <span>{{ task }}</span>
    </v-card-text>

    <v-text-field v-show="edit" v-model="store.newName" :placeholder="$t('placeHolderChange')">
    </v-text-field>

    <v-btn v-show="!edit" @click="emit('enable-edit-task')">
      <v-icon color="blue" icon="fa:fas fa-edit"> </v-icon
    ></v-btn>

    <v-btn v-show="edit" @click="emitEditingTask">OK</v-btn>

    <v-btn color="red" @click="emit('delete-task')"> X </v-btn>
  </v-toolbar>
</template>
