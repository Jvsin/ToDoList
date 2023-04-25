<script>

let id = 0
export default {
  data() {
    return {
      lista: [],
      nowyElement: ''
    }
  },
  methods: {
    dodajElement() {
      this.lista.push({id: id++, task: this.nowyElement, done: false});
      this.nowyElement = '';
    },
    usunElement(todo) {
      this.lista = this.lista.filter((t) => t !== todo)
    }
  }
}
</script>

<template>
  <main>
    <h1> LISTA TODO:</h1>
    <p>Dodaj nowe zadanie: {{ message }}</p>

    <input type="text" v-model="nowyElement">
      <button @click="dodajElement">Dodaj</button>
      <ul>
        <li v-for = "element in lista" :key = "element.id">
        
        <input type="checkbox" v-model="element.done">
        <span :class="{ done: element.done }">{{ element.task }}</span>
      
        <button @click="$event => usunElement(element)">X</button>
        </li>
      </ul>
  </main>
</template>
