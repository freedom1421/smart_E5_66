<template>
      
    <div>
      <h1>Student List</h1>
      <div><button @click="onSave">list</button></div>
  <table border="1">
    <tr>
      <th>username</th>
      <th>password</th> 
      <th>dep</th>
    </tr>
    <tr v-for="st in student" :key="st.user_id" >
      <td>{{ st.username }}</td>
      <td>{{ st.password }}</td>
      <td>{{  st.dep }}</td>
    </tr>
  </table>
    </div>
  
  </template>
  <script>
  export default {
   data() {
   }, 
   computed: {
    upperName(){
      return this.name.toUpperCase()
    }
   },
   methods: {
    async onSave(){
      console.log(this.name)
      const url = 'http://localhost:7001/list';
      const res = await fetch(url);
      const data = await res.json()
      this.student = data.datas
      console.log('data=>',data.datas.firstname)
    }
   },
  }
  </script>