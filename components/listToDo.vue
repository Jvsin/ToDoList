<script setup>
import TodoItem from './singleTask.vue' 
import {useCounterStore} from '../src/stores/counter.js'
import { storeToRefs } from 'pinia';
//import { computed } from 'vue'

const store = useCounterStore()

// const {addElement, deleteElement, enableEdit, editElement, checkElement, sortElements} = store

const {list, newName, newElement, editFlag, showDone} = storeToRefs(store)

// const {showUnDone} = computed(()=> store.showUnDone)

</script>


<template>
  <main>
    <h1> Lista TODO:</h1>
    <p>Dodaj nowe zadanie: {{ message }}</p>
    <v-sheet  width="300">
      <v-form  @submit.prevent>
        <v-text-field  v-model="newElement" label="Nowy task" width="300" class="mx-auto"></v-text-field>
        <v-btn @click="store.addElement()">Dodaj</v-btn>
        <v-btn @click="store.sortElements()">Sortuj</v-btn><br>
      </v-form>

    </v-sheet>
      <div v-if="editFlag">
        <v-sheet width="300">
          <v-text-field  v-model="newName" label="Zmien nazwe" width="300" class="mx-auto"></v-text-field>
        </v-sheet>
        
      </div>      
      
      <ul>
        <li v-for = "element in store.showUnDone" :key = "element.id">
          <TodoItem
            :id = "element.id"
            :task = "element.task"
            :done = "element.done"
            :edit= "element.edit"
            @deleteTask ="store.deleteElement(element)"
            @enableEditTask ="store.enableEdit(element)"
            @editTask ="store.editElement(element,newName)"
            @checkTask="store.checkElement(element)"
          ></TodoItem>

        </li>
      </ul>
      <span>Taski do zrobienia:{{ list.filter(element => element.done === false).length }}</span><br>
      <v-btn label="Checkbox" @click="showDone = !showDone">
        {{ showDone ? 'Pokaz wszystko' : 'Schowaj ukonczone' }}
      </v-btn>
      
  </main>
</template>
