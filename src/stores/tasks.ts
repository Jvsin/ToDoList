import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getAuth } from 'firebase/auth'
import { db } from '../main'
//import { collection, getDocs, where, query, setDoc, updateDoc} from 'firebase/firestore'
import {
  collection,
  addDoc,
  doc,
  where,
  query,
  updateDoc,
  deleteDoc,
  getDocs
} from 'firebase/firestore'

export interface singleTask {
  id: number
  task: string
  done: boolean
  edit: boolean
  docId: string
}

export const useCounterStore = defineStore('counter', () => {
  const list = ref<singleTask[]>([])

  let id = 0
  let userID = getAuth().currentUser?.uid
  const newName = ref('')
  const newElement = ref('')
  const editFlag = ref(false)
  const showDone = ref(false)

  const currentUser = getAuth().currentUser
  if (currentUser) {
    userID = currentUser.uid
    console.log("Current's user ID: " + userID)
  } else {
    console.log('No user currently logged in')
  }

  const TaskCollectionRef = collection(db, 'tasks')
  const queryCollection = query(TaskCollectionRef, where('userId', '==', userID))
  const tasksQuery = getDocs(queryCollection)

  const onSuccess = (docs) => {
    if (Array.isArray(docs)) {
      list.value = docs.map((item) => item.data())
    } else {
      console.error('Invalid data format:', docs)
    }
  }

  tasksQuery
    .then((snapshot) => {
      const docs = snapshot.docs
      onSuccess(docs)
    })
    .catch((error) => {
      console.error('Error retrieving documents:', error)
    })

  const showUnDone = computed(() => {
    return showDone.value ? list.value.filter((t) => !t.done) : list.value
  })

  async function addElement() {
    if (newElement.value.length < 4) {
      return
    }
    let text = newElement.value
    text = text.toUpperCase()

    const newTask: singleTask = {
      id: id,
      task: text,
      done: false,
      edit: false,
      docId: ''
    }

    const data = {
      id: id,
      task: text,
      done: false,
      userId: userID,
      docId: ''
    }

    const docRef = await addDoc(TaskCollectionRef, data)
    newTask.docId = docRef.id
    const taskRef = doc(db, 'tasks', newTask.docId)

    await updateDoc(taskRef, {
      docId: docRef.id
    })

    list.value.push(newTask)
    newElement.value = ''
    id++
  }

  async function deleteElement(todo) {
    if (todo.edit === true) {
      editFlag.value = false
    }
    await deleteDoc(doc(db, 'tasks', todo.docId))
    list.value = list.value.filter((t) => t !== todo)
  }

  function enableEdit(element) {
    if (editFlag.value !== true) {
      element.edit = true
      //element.update = false;
      editFlag.value = true
      newName.value = ''
      //index = list.value.indexOf(element)
    }
  }

  async function editElement(element, text) {
    text = newName.value
    text = text.toUpperCase()
    element.task = text
    element.edit = false

    const taskRef = doc(db, 'tasks', element.docId)
    await updateDoc(taskRef, {
      task: text
    })
    newName.value = ''
    editFlag.value = false
  }

  async function checkElement(element) {
    element.done = !element.done
    const taskRef = doc(db, 'tasks', element.userId)
    await updateDoc(taskRef, {
      done: element.done
    })
  }

  function sortElements() {
    let array = list.value
    array = array.sort((a, b) => {
      if (a.task < b.task) return -1
      if (a.task > b.task) return 1
      return 0
    })
    return array
  }
  return {
    id,
    newName,
    list,
    newElement,
    editFlag,
    showDone,
    showUnDone,
    addElement,
    deleteElement,
    enableEdit,
    editElement,
    checkElement,
    sortElements
  }
})
