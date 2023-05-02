<script setup>
import TodoItem from './singleTask.vue' 
import {useCounterStore} from '../src/stores/counter.js'
import { storeToRefs } from 'pinia';
import { computed } from 'vue'

const store = useCounterStore()

const {addElement, deleteElement,enableEdit, editElement, checkElement, sortElements} = store

const {list, newName, newElement, editFlag, showDone} = storeToRefs(store)

const {showUnDone} = computed(()=> store.showUnDone)

</script>


<template>
  <main>
    <h1> Lista TODO:</h1>
    <p>Dodaj nowe zadanie: {{ message }}</p>

    <input type="text" v-model="newElement">
      <button @click="addElement()">Dodaj</button>
      <button @click="sortElements()">Sortuj</button><br>
      
      
      <div v-if="editFlag">
        <input v-model="newName" type="text">
      </div>      
      
      <ul>
        <li v-for = "element in showUnDone" :key = "element.id">
          <TodoItem
            :id = "element.id"
            :task = "element.task"
            :done = "element.done"
            :edit= "element.edit"
            @deleteTask ="deleteElement(element)"
            @enableEditTask ="enableEdit(element)"
            @editTask ="editElement(element,newName)"
            @checkTask="checkElement(element)"
          ></TodoItem>

        </li>
      </ul>
      <span>Taski do zrobienia:{{ list.filter(element => element.done === false).length }}</span><br>
      <button @click="showDone = !showDone">
        {{ showDone ? 'Pokaz wszystko' : 'Schowaj ukonczone' }}
      </button>
      
  </main>
</template>
