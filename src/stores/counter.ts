import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {

interface singleTask {
  id: Number;
  task: String;
  done: Boolean;
  edit: Boolean
}

const list = ref<singleTask[]>([])

let id = 0;
let newName = ref("")
//let list = ref([])
let newElement = ref('')
let editFlag = ref(false)
let showDone = ref(false)


const showUnDone = computed (() => {
  return showDone.value
    ? list.value.filter((t) => !t.done) 
    : list.value
})

function addElement() {
  if(newElement.value.length > 3){
    console.log(newElement.value.length)
    var text = newElement.value;
    text = text.toUpperCase();
    list.value.push({id: id++, task: text, done: false, edit: false});
    newElement.value = ''
  }
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
    newName.value = "";
  }
}

function editElement(element,text){
  text = text.toUpperCase();
    element.task = text;
    element.edit = false;
    element.update = true;
    editFlag.value = false;
    newName.value = "";
}

function checkElement(element) {
    element.done = !element.done;
}

function sortElements(){
    let array = list.value;
    array = array.sort((a,b) =>  { 
    if (a.task < b.task)
      return -1;
    if (a.task > b.task)
      return 1;
    return 0;
    })
      return array;
}
  return { id, newName, list, newElement, editFlag, showDone, showUnDone, addElement, deleteElement, enableEdit, editElement ,checkElement, 
      sortElements}
})
