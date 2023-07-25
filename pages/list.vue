<template>
    <div>
      <h1>Student List</h1>
      <div><button @click="onShow">List</button></div>
  <table border="1">
    <tr>
      <th>id</th>
      <th>Username</th>
      <th>Password</th> 
      <th>dep</th>
      <th>Action</th>
    </tr>
    <tr v-for="st in student" :key="st.id" >
      <td>{{ st.id }}</td>
      <td>{{ st.username }}</td>
      <td>{{ st.password }}</td>
      <td>{{  st.dep }}</td>
      <td>  
        <v-icon
          size="small"
          class="me-2"
          @click="editItem(st.id)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="deleteItem(st.id)"
        >
          mdi-delete
        </v-icon>
      </td>
       </tr>
  </table>
    </div>
  
  </template>
  <script>
  export default {
   data() {
    return {
      name: "alongkorn",
      age: 50,
      student: []
    }
   }, 
   methods: {
     editItem(id){
     console.log('id',id)
     this.$router.replace('/edit?id='+ id)
  
    },
    async onShow(){
      const url = 'http://localhost:7001/list';
      const res = await fetch(url);
      const data = await res.json()
      this.student = data.datas
      console.log('data=>',data.datas)
    }
   },
  }
  </script>