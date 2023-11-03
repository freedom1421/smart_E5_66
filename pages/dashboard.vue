<template >
  
  
  <div >
  
    
    <v-app>
    <!-- Navbar -->
    <v-app-bar app color="#F1EFEF" >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title >Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Add your navigation links here -->
      <v-btn text to="/home">Home</v-btn>
      <v-btn text to="/about">About</v-btn>
      <v-btn text to="/contact">Contact</v-btn>
    </v-app-bar>

    <!-- Sidebar (optional) -->
    <v-navigation-drawer app v-model="drawer" color="#F1EFEF">
  <!-- Sidebar content goes here -->
  <v-list style="color: white;">
    <v-list-item link to="/home">
      <v-list-item-icon>
        <v-icon>mdi-home</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Home</v-list-item-title>
    </v-list-item>
    <v-list-item link to="/about">
      <v-list-item-icon>
        <v-icon>mdi-information</v-icon>
      </v-list-item-icon>
      <v-list-item-title>About</v-list-item-title>
    </v-list-item>
    <v-list-item link to="/contact">
      <v-list-item-icon>
        <v-icon>mdi-email</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Contact</v-list-item-title>
    </v-list-item>
  </v-list>


      
    </v-navigation-drawer>
   
    
    
    <v-main >
      
      <router-view>
        <v-layout style="background-image: url('https://w.wallha.com/ws/5/j5gX2JuF.jpg'); 
        background-size: cover;">
        
    <!-- Your content goes here -->
        <v-container  >
         
      <div style="height: 300px; width: 300px; background-color: white ; 
      display: flex; 
      flex-direction: column; 
      justify-content:  center;
      text-align: center;
      
      border-radius: 50px;">
      
      <v-spacer> </v-spacer>
      <v-spacer></v-spacer>
      <v-row align="center" justify="center" >
      <v-btn
        size="200"
        display="flex"
        variant="tonal"
        :color="lightColor"
        class="rounded-circle"
      >
        <v-icon size="40" :icon="isLight2On"></v-icon>
      </v-btn>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <v-btn color="primary"  @click="bntSensor1">OPEN</v-btn>
        </v-col>
  
        <v-col cols="auto">
          <v-btn color="success" @click="bntSensor2">CLOSE</v-btn>
        </v-col>
      </v-row>
    </div>
    
    <div style="height: 500px; 
    align-items: right;
    width: 1000px;
    background-color:white  ; 
    border-radius: 20px;">
      <div class="text-center"> 
        
        <v-progress-circular 
          
          :rotate="-90"
          :size="200"
          :width="30"
          :model-value="value"
          color="primary"
        >ความชื้น
          {{ value }}
          %
        </v-progress-circular>
        &nbsp;
        &nbsp;
        <v-progress-circular
          
          :rotate="90"
          :size="200"
          :width="30"
          :model-value="value2"
          
          color="red"
          
        >
        อุณหภูมิ
          {{ value2 }}
          C
        </v-progress-circular>
        &nbsp;
        &nbsp;
        <v-progress-circular
          :rotate="90"
          :size="200"
          :width="30"
          :model-value="value3"
          color="DarkGreen"
        >วัดระยะ
          {{ value3 }}
          CM
        </v-progress-circular>
      </div>
      <div>
        
  
        <br />
        <li>humidity</li>
        <v-progress-linear v-model="value" color="blue-grey" height="25">
          
            <strong>{{ Math.ceil(value) }}cm</strong>
          
        </v-progress-linear>
  
        <br />
        <li>Temperature</li>
        <v-progress-linear v-model="value2" color="yellow" height="25">
          
          <strong>{{ value2 }}c</strong>
        </v-progress-linear>
  
        <br />
        <li>Distance</li>
        <v-progress-linear v-model="value2" color="red" height="25">
          
          <strong>{{ value3 }}cm</strong>
        </v-progress-linear>
        
        
        
      </div>
    </div>
 
    </v-container>
  </v-layout>
      </router-view>
    </v-main>
  </v-app>

</div>


</template>
<script>


//var mqtt = require("mqtt");
// import * as mqtt from "dist/mqtt/mqtt.min";
// Rest of your file goes h
//import * as mqtt from "mqtt";

export default {
  
  
  setup() {
    useHead({
      script: ["/dist/mqtt/mqtt.min.js"],
    });
  },
  data() {
    
    return {
      drawer: false,
        rail: true,
      value: 29,
      value2: 30,
      value3: 0,
      isLight2On: "mdi-lightbulb-off-outline",
      lightColor: "grey-darken-4",
      sensor1Value: "0",
      sensor2Value: "0",
    };
  },
  beforeMount() {
    this.client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");
    this.client.on("connect", () => {
      console.log("on client connect");
      this.client.subscribe("temp1");
      this.client.subscribe("temp2");
      this.client.subscribe("patt1");
      this.client.subscribe("patt2");
      this.client.subscribe("1On");
      this.client.subscribe("2Off");
      this.client.subscribe("cm");
      
    });
    this.client.on("message", (topic, message) => {
      if (topic === "temp1") {
        //console.log("connect_message/temp1=>");
        // message is Buffer
        //  console.log("GOT:", message.toString());
        this.value = message.toString();
        // console.log("data=", this.value);
        // client.end()
      }
      if (topic === "temp2") {
        // console.log("connect_message/temp1=>");
        // message is Buffer
        // console.log("GOT:", message.toString());
        this.value2 = message.toString();
        //   console.log("data=", this.value);
        // client.end()
      }
      if (topic === "1On") {
        this.sensor1Value = message.toString();
        console.log("sensor1Data=", this.sensor1Value);
        this.isLight2On = "mdi-lightbulb-on-outline";
        this.lightColor = "amber-darken-4";
        // client.end()
      }
      if (topic === "2Off") {
        this.sensor2Value = message.toString();
        console.log("sensor2Data=", this.sensor2Value);
        this.isLight2On = "mdi-lightbulb-off-outline";
        this.lightColor = "grey-darken-4";
        // client.end()
      }
      if (topic === "cm") {
        //  console.log("connect_message/cm=>");
        // message is Buffer
        // console.log("GOT:", message.toString());
        this.value3 = message.toString();
        //console.log("data=", this.value);
        // client.end()
      }
      
    });
  },
  
  
  methods: {
    bntSensor1() {
      this.client.publish("patt1", "1");
      console.log("sensor1");
    },
    bntSensor2() {
      this.client.publish("patt2", "0");
      console.log("sensor2");
    },
  },
};
</script>