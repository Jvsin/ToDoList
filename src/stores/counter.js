import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  
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
  return { id, newName, list, newElement, editFlag, showDone, showUnDone, addElement, deleteElement, enableEdit, editElement,checkElement, 
      sortElements}
})
