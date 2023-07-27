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
        @click="deletest(st.id)"
      >
        mdi-delete
      </v-icon>
    </td>
     </tr>
     
     <div class="text-center">
  <v-dialog
    v-model="dialog_del"
    width="500"
  >
       <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        สถานะการลบ
      </v-card-title>

      <v-card-text>
         คุณต้องการลบข้อมูลหรือไม่
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          text
          @click="dialog_su(id)"
        >
          ตกลง
        </v-btn>
        <v-btn
          color="green"
          text
          @click="dialog_del = false"
        >
          ยกเลิก
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>

<div class="text-center">
  <v-dialog
    v-model="dialog_sut"
    width="500"
  >
       <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        สถานะการลบ
      </v-card-title>

      <v-card-text>
         ลบข้อมูลเสร็จสิ้น
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green"
          text
          @click="deleteItem(id)"
        >
          ตกลง
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</table>
  </div>
  
</template>
<script>
import { StringDecoder } from 'string_decoder'

export default {
 data() {
  this.onShow;  
  return {
    name: "",
    age: 50,
    dialog_del: false,
    dialog_sut: false,
    student: []
    
  }
 }, 
 methods: {
   editItem(id){
   console.log('id',id)
   this.$router.replace('/edit?id='+ id)

  },
  async deleteItem(id){
   console.log('id',id)
   const url = 'http://localhost:7001/delete?id='+ id ;
    const res = await fetch(url);
    const data = await res.json()
    this.onShow()
    this.dialog_sut = false
    
  },
  async onShow(){
    const url = 'http://localhost:7001/list';
    const res = await fetch(url);
    const data = await res.json()
    this.student = data.datas
    console.log('data=>',data.datas)
  },
  async deletest(id){
    this.dialog_del = true
    this.id = id
  },
  async dialog_su(id){
    this.dialog_del = false
    this.dialog_sut = true
  },
 },
}
</script>