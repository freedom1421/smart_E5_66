<template>
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
      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
      <v-btn
        color="warning"
        @click="doSave"
      >
        Save
      </v-btn>
    </v-form>
  </template>
  <script>
    export default {
      data: () => ({
        valid: true,
        username: '',
        password: '',   
        dep: null,
        items: [
          'IT',
          'computer',
          'electronic',
          'electircal power',
        ],
      }),
  
      methods: {
        async doSave () {
          console.log('save data')
          console.log(this.username)
          console.log(this.password)
          console.log(this.dep)
        //   let username = this.username
        //   let password = this.password
        //   let dep = this.dep
          //http://localhost/7001/insert?name=username&passwd=password&dep=dep
            const url = 'http://localhost:7001/insert?name='+this.username+'&password='+this.password+'&dep='+this.dep;
            const res = await fetch(url);
            const data = await res.json()
            console.log(data.ok)
            if(data.ok == 1){
                console.log('save succes')
            }
        },
        reset () {
          this.$refs.form.reset()
        },
       },
    }
  </script>