<script setup>
import {computed, ref } from 'vue'
import TodoItem from './singleTask.vue' 

let id = 0;
let newName = ""
let list = ref([])
let newElement = ref('')
let editFlag = ref(false)
let showDone = ref(false)

const showUnDone = computed (() => {
  return showDone.value
    ? list.value.filter((t) => !t.done) 
    : list.value
})

function addElement() {
    var text = newElement.value;
    text = text.toUpperCase();
    list.value.push({id: id++, task: text, done: false, edit: false, update: true});
    newElement.value = ''
}  

function deleteElement(todo) {
    if(todo.edit === true) {
      editFlag.value = false
    }
    list.value = list.value.filter((t) => t !==todo)
}

function enableEdit(element) {
  if(editFlag.value !== true) {
    element.edit = true;
    element.update = false;
    editFlag.value = true;
    newName = element.task;
  }
}

function editElement(element,text){
  text = text.toUpperCase();
  element.task = text;
  element.edit = false;
  element.update = true;
  this.editFlag = false;
  newName = "";
}

function checkElement(element) {
    element.done = !element.done;
}

function sortElements(){
    let array = this.list;
    array = array.sort((a,b) =>  { 
    if (a.task < b.task)
      return -1;
    if (a.task > b.task)
      return 1;
    return 0;
    })
      return array;
}
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
