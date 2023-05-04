<script setup>
import TodoItem from './singleTask.vue' 
import {useCounterStore} from '../src/stores/counter.js'
import { storeToRefs } from 'pinia';
//import { computed } from 'vue'
import { ref } from 'vue'

const store = useCounterStore()

// const {addElement, deleteElement, enableEdit, editElement, checkElement, sortElements} = store

const {list, newName, newElement, editFlag, showDone} = storeToRefs(store)

// const {showUnDone} = computed(()=> store.showUnDone)


// przeniesc do counter.js
const rules = ref([
  value => {
    if(value.length > 3 || value.length === 0) return true
    return 'Zadanie musi miec wiecej niz 3 znaki'
  }
])

</script>


<template>
  <main>
    <h1> Lista TODO:</h1>
    <p>Dodaj nowe zadanie: {{ message }}</p>
    <v-sheet  width="300">
      <v-form  @submit.prevent>
        <v-text-field  v-model="newElement" label="Nowy task" :rules="rules" width="300" class="mx-auto"></v-text-field>
        <v-btn @click="store.addElement()">Dodaj</v-btn>
        <v-btn @click="store.sortElements()">Sortuj</v-btn><br>
      </v-form>

    </v-sheet>
      <div v-if="editFlag">
        <v-sheet width="300">
          <v-text-field  v-model="newName" label="Zmien nazwe" width="300" class="mx-auto"></v-text-field>
        </v-sheet>
        
      </div>      
      
      
        <li v-for = "element in store.showUnDone" :key = "element.id">
          <div class="element">
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
          </div>
          

        </li>
      
      <span>Taski do zrobienia:{{ " " + list.filter(element => element.done === false).length }}</span><br>
      <!-- <v-checkbox :label="showDone" style="color: green" @click="showDone = !showDone">
        {{ showDone ? 'Pokaz wszystko' : 'Schowaj ukonczone' }}
      </v-checkbox> -->
      <v-btn style="color: red" @click="showDone = !showDone">
        {{ showDone ? 'Pokaz wszystko' : 'Schowaj ukonczone' }}
      </v-btn>


  </main>
</template>

<style scoped>
  .element {
    max-width: 800px;
    margin: 0;
  }

</style>
