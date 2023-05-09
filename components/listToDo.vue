<script setup>
import TodoItem from './singleTask.vue' 
import {useCounterStore} from '../src/stores/counter'
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
    <h1> {{ $t('siteDescription') }}</h1>
    
    <v-sheet  width="300">
      <v-form  @submit.prevent>
        <v-text-field  v-model="newElement" :placeholder='$t("placeHolderAdd")' :rules="rules" width="300" class="mx-auto"></v-text-field>
        
        <v-btn @click="store.addElement()">{{ $t('addButton') }}</v-btn>

        <v-btn @click="store.sortElements()">{{ $t('sortButton') }}</v-btn>
        
        <br>

      </v-form>

    </v-sheet>
      
    <div v-if="editFlag">
        <v-sheet width="300">
          <v-text-field  v-model="newName" :placeholder='$t("placeHolderChange")' width="300" class="mx-auto"></v-text-field>
        </v-sheet>
        
      </div>      
      
      
        <li v-for = "element in store.showUnDone" :key = "element.id">
          <div class="element">
            <TodoItem 
            :id = "element.id"
            :task = "element.task"
            :done = "element.done"
            :edit= "element.edit"
            @delete-task ="store.deleteElement(element)"
            @enable-edit-task ="store.enableEdit(element)"
            @edit-task ="store.editElement(element, newName)"
            @check-task="store.checkElement(element)"
          ></TodoItem>
          </div>
          

        </li>
      
      <span>{{ $t('taskCounter') }} {{ ` ${list.filter(element => element.done === false).length}` }}
      </span>
      
      <br>
      
      <v-btn style="color: red" @click="showDone = !showDone">
        {{ showDone ? $t("showTasks") : $t("unShowTasks") }}  
      </v-btn>


  </main>
</template>

<style scoped>
  .element {
    max-width: 800px;
    margin: 0;
  }
</style>
