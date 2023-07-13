<template>
    <div>
      <h1>Hello {{ name }}</h1>
      <h1>Hello {{ upperName }}</h1>
      <input type="text" :value="name">
      <div>one-way<input type="text" :value="name"></div>
      <div>two-way<input type="text" v-model="name"></div>
      <div><button @click="onSave">SAVE</button></div>
    </div>
  </template>
  <script>
  export default {
   data() {
    return {
      name: "alongkorn",
      age: 50,
    }
   }, 
   computed: {
    upperName(){
      return this.name.toUpperCase()
    }
   },
   methods: {
  async onSave(){
    console.log(this.name)
    const url = 'http://localhost:7001/lists';
    const res = await fetch(url);
    const data = await res.json()
    console.log('data=>',data)
  }
 },
  }
  </script>