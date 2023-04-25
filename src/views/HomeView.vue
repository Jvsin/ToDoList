<script>

let id = 0
export default {
  data() {
    return {
      lista: [],
      nowyElement: '',
      schowajUkonczone: false
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
    },
    usunElement(todo) {
      this.lista = this.lista.filter((t) => t !== todo)
    },
    wlaczEdycjeElementu(element) {
      element.edit = true;
      element.update = false;
    },
    edytujElement(element,text){
      element.edit = false;
      text = text.toUpperCase();
      element.task = text;
      element.update = true;
      this.update = "";
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

<template>
  <main>
    <h1> LISTA TODO:</h1>
    <p>Dodaj nowe zadanie: {{ message }}</p>

    <input type="text" v-model="nowyElement">
      <button @click="dodajElement()">Dodaj</button>
      <button @click="sortujElementy">Sortuj</button><br>
      <span>Taski do zrobienia:{{ this.lista.filter(element => element.done === false).length }}</span>

      <ul>
        <li v-for = "element in pokazNieUkonczone" :key = "element.id">
        
        <input type="checkbox" v-model="element.done">
        <span :class="{ done: element.done }" v-show="element.update">{{ element.task }}</span>
        
        <input v-show="element.edit" type ="text" v-model="update"> 

        <button v-show="element.update" @click="$event => wlaczEdycjeElementu(element)">Edytuj</button>
        <button v-show="element.edit" @click="$event => edytujElement(element,update)">OK</button>
        <button @click="$event => usunElement(element)">X</button>
        
        </li>
      </ul>

      <button @click="schowajUkonczone = !schowajUkonczone">
        {{ schowajUkonczone ? 'Pokaz wszystko' : 'Schowaj ukonczone' }}
      </button>
      
  </main>
</template>
