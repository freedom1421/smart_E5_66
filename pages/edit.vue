<template>
    <h1>EDIT  DATA ID = {{ id }}</h1>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="username"
        :counter="10"
        label="UserName"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="password"
        label="Password"
        required
      ></v-text-field>
  
      <v-select
        v-model="dep"
        :items="items"
        label="DEPARTMENT"
        required
      ></v-select>
      <v-file-input v-model="file" accept="image/*"> </v-file-input>
      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
      <v-btn
        color="warning"
        @click="doupdate"
      >
        Save
      </v-btn>
    </v-form>
    
  
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
           <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            สถานะการอัปเดต
          </v-card-title>
  
          <v-card-text>
            อัปเดตข้อมูลสำเร็จ
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="reweb"
            >
              ตกลง
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  
    <div class="text-center">
      <v-dialog
        v-model="dialog_error"
        width="500"
      >
           <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            สถานะการอัปเดต
          </v-card-title>
  
          <v-card-text>
            อัปเดตข้อมูลไม่สำเร็จ
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog_error = false"
            >
              ตกลง
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  
  </template>
  <script>
    export default {
      data: () => ({
    valid: true,
        id: '',
        username: '',
        password: '',   
        dep: null,
        img: '',
        dialog: false,
        dialog_error : false,
        items: [
          'IT',
          'computer',
          'electronic',
          'electircal power',
        ],
      }),
     async created() {
        console.log('id=', this.$route.query.id)
        this.id = this.$route.query.id
           const url = 'http://localhost:7001/listedit?id='+ this.id ;
           const res = await fetch(url);
           const data = await res.json()
           console.log('data=', data.datas.username)
           this.username =  data.datas.username
           this.password =  data.datas.password
           this.dep =  data.datas.dep
           this.img = data.datas.img

      },
      methods: {
        async doupdate () {
          console.log('save data')
          console.log(this.username)
          console.log(this.password)
          console.log(this.dep)
          console.log(this.img)
      
          //http://localhost/7001/insert?name=username&passwd=password&dep=dep
           const url = 'http://localhost:7001/update?username='+ this.username +'&password=' + this.password + '&dep='+ this.dep +'&img='+ this.img +'&id='+ this.id ;
           const res = await fetch(url);
           const data = await res.json()
           console.log(data.ok)
          //  this.username = ""
          //  this.password = ""
          //  this.dep = ""
  
           if(data.ok == 1){
            console.log('update success')
            this.dialog = true
           }else{
            console.log('update not success')
            this.dialog_error = true
           }
        },
         reset () {
          this.$refs.form.reset()
        },
        reweb(){
          this.$router.replace('/list')
          this.dialog = false
        }
       },
    }
  </script>