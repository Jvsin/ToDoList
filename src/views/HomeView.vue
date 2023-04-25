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
      this.lista.push({id: id++, task: this.nowyElement});
      this.nowyElement = '';
    },
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
        <li v-for = "element in lista" :key = "element.id">{{ element.task }}
    
        </li>
      </ul>
  </main>
</template>
