import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { getAuth } from 'firebase/auth'
import { db } from '../main'
import { collection, getDocs, query, where} from 'firebase/firestore'


export const useCounterStore = defineStore('counter', () => {

interface singleTask {
  id: number;
  task: string;
  done: boolean;
  edit: boolean
}

const list = ref<singleTask[]>([])

let id = 0;
let userID = ''
const newName = ref("")
//let list = ref([])
const newElement = ref('')
const editFlag = ref(false)
const showDone = ref(false)

const collectionUsers = collection(db, 'tasks')
const getTasksQuery = getDocs(query(collectionUsers, where('uid', '==', userID)))

const onSuccess = (docs) => {
  if (Array.isArray(docs)) {
    list.value = docs.map((item) => item.data())
  } else {
    console.error('Invalid data format:', docs)
  }
}

onMounted(() => {
  getDocs(collectionUsers)
  getTasksQuery
    .then((snapshot) => {
      const docs = snapshot.docs
      onSuccess(docs)
    })
    .catch((error) => {
      console.error('Error retrieving documents:', error)
    })
})


const currentUser = getAuth().currentUser
if(currentUser) {
  userID = currentUser.uid
  console.log("Current's user ID: " + userID)
}
else {
  console.log("No user currently logged in")
}

const showUnDone = computed (() => {
  return showDone.value
    ? list.value.filter((t) => !t.done) 
    : list.value
})

function addElement() {
  if(newElement.value.length > 3){
    console.log(newElement.value.length)
    let text = newElement.value;
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
