<script>
import { ref } from 'vue';


let id = 0;
let nowaNazwa = "";
export default {
  data() {
    return {
      lista: ref([]),
      nowyElement: ref(''),
      edycja: ref(false),
      schowajUkonczone: ref(false)
    }
  },

  computed: {
    pokazNieUkonczone() {
      return this.schowajUkonczone
        ? this.lista.filter((element)=> !element.done) : this.lista
    }
  },

  methods: {
    dodajElement() {
      var text = this.nowyElement;
      text = text.toUpperCase();
      this.lista.push({id: id++, task: text, done: false, edit: false, update: true});
      this.nowyElement = ''
      console.log(this.lista);
    },
    usunElement(todo) {
      this.lista = this.lista.filter((t) => t !== todo)
    },
    wlaczEdycjeElementu(element) {
      element.edit = true;
      element.update = false;
      this.edycja = true;
      this.value = element.task;
    },
    edytujElement(element,text){
      
      text = text.toUpperCase();
      element.task = text;
      element.edit = false;
      element.update = true;
      this.edycja = false;
      this.update = "";
    },
    odznaczElement(element) {
      element.done = !element.done;
    },
    sortujElementy(){
      let array = this.lista;
      array = array.sort((a,b) =>  { 
        if (a.task < b.task)
          return -1;
        if (a.task > b.task)
          return 1;
        return 0;
      })
      return array;
    }
  }
}
</script>

<script setup>
    import TodoItem from "./singleTask.vue"
</script>


<template>
  <main>
    <h1> LISTA TODO:</h1>
    <p>Dodaj nowe zadanie: {{ message }}</p>

    <input type="text" v-model="nowyElement">
      <button @click="dodajElement()">Dodaj</button>
      <button @click="sortujElementy()">Sortuj</button><br>
      
      
      <div v-if="edycja">
        <input v-model="nowaNazwa" type="text">
      </div>      
      
      <ul>
        <li v-for = "element in pokazNieUkonczone" :key = "element.id">
          <TodoItem
            :id = "element.id"
            :task = "element.task"
            :done = "element.done"
            :edit= "element.edit"
            @usunTaska ="usunElement(element)"
            @wlaczEdycjeTaska ="wlaczEdycjeElementu(element)"
            @edytujTaska ="edytujElement(element,nowaNazwa)"
            @odznaczTaska="odznaczElement(element)"
          ></TodoItem>

        </li>
      </ul>
      <span>Taski do zrobienia:{{ this.lista.filter(element => element.done === false).length }}</span><br>
      <button @click="schowajUkonczone = !schowajUkonczone">
        {{ schowajUkonczone ? 'Pokaz wszystko' : 'Schowaj ukonczone' }}
      </button>
      
  </main>
</template>
