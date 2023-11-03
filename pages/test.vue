<template>
  <v-card >
    <v-layout style="background-image: url('https://img.freepik.com/free-vector/bokeh-defocused-background_23-2148497833.jpg?w=2000'); background-size: cover;">
      <v-navigation-drawer style="background-color: #f16d6d; color: #ffffff;"
          expand-on-hover
          rail
      >
        <v-list style="background-color: #199d12;">
          <v-list-item
            prepend-avatar="../public/photos/1692152297324-548.jpg"
            title="ระบบการจัดการอุณหภูมิ"
            subtitle="D50565@ccollege.ac.th"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home" title="My Project"  value=" "></v-list-item>
          <!-- <v-list-item prepend-icon="mdi-account-multiple" title="My Team" value="team"></v-list-item> -->
        </v-list>
      </v-navigation-drawer>

    <v-main style="height:auto; width: auto;">

    <v-card color="grey-lighten-4" flat height="auto" rounded="0" justify="center">
    <v-toolbar density="compact" style="background-color: #ea8b8b; color: #5f5c5c;">
    <v-toolbar-title>Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    </v-card>

<v-row>
  <v-col>
        <v-row style="height: 350px; width: 350px; align-items: center; background-color: #ffffff; justify-content: center;  border-radius: 50px; margin:20px  0px 40px 50px; padding: 10px;">
                    <v-btn size="250" variant="tonal" :color="lightColor" class="rounded-circle">
                    <v-icon size="60" :icon="isLight2On"></v-icon>
                    </v-btn>
                    
                    <v-col cols="auto">
                    <v-btn style="height: 50px; width: 110px; background-color: #199d12; color: #ffffff; border-radius: 50px;" @click="bntSensor1">OPEN</v-btn>
                    </v-col>

                    <v-col cols="auto">
                    <v-btn style="height: 50px; width: 110px; background-color: #9d1212; color: #ffffff; border-radius: 50px;" @click="bntSensor2">CLOSE</v-btn>
                    </v-col>
          </v-row>
  </v-col>
  
  <v-col>
          <v-row style="height: 350px; width: 930px; align-items: top; background-color: #ffffff; justify-content: center;  border-radius: 50px; margin:20px  50px 40px 0px; padding: 10px;">
            <v-col style="align-items: center; margin: 10px;"> <a style="text-align: center; font-size:30px; margin: 40px; font-family: fantasy;">air humidity</a> 
                <v-progress-circular
                :rotate="-90"
                :size="200"
                :width="50"
                :model-value="value"
                color="primary"
                style="margin: 20px 20px 20px 20px; font-family: fantasy; font-size:20px;"
                >
                {{ value }} RH
                </v-progress-circular>
            </v-col>
            
            
            <v-col style="align-items: center; margin: 10px;"> <a style="text-align: center; font-size:30px; margin: 40px; font-family: fantasy;">temperature</a>
                <v-progress-circular
                :rotate="-90"
                :size="200"
                :width="50"
                :model-value="value"
                color="primary"
                style="margin: 20px 20px 20px 20px; font-family: fantasy; font-size:20px;"
                >
                {{ value2 }} C
                </v-progress-circular>
            </v-col>
            
            <v-col style="align-items: center; margin: 10px;"> <a style="text-align: center; font-size:30px; margin: 63px; font-family: fantasy;">distance</a>
                <v-progress-circular
                :rotate="-90"
                :size="200"
                :width="50"
                :model-value="value3"
                color="primary"
                style="margin: 20px 20px 20px 20px; font-family: fantasy; font-size:20px;"
                >
                {{ value3 }} cm
                </v-progress-circular>
            </v-col>
          </v-row>
  </v-col>
</v-row>
          
<v-row style="height: 250px; width: auto; align-items: center; background-color: #ffffff; justify-content: left;  border-radius: 50px; margin: 0px  50px 40px 50px; padding: 30px;">
  <a style="font-family: fantasy; font-size:20px;">air humidity &nbsp;&nbsp;&nbsp;{{ value }} RH</a>
  <v-progress-linear style="height: 12px; width: 1300px; background-color: #199d12; color: #9d1212;" :model-value="value"></v-progress-linear>
  <a style="font-family: fantasy; font-size:20px;">temperature &nbsp;&nbsp;&nbsp;{{ value2 }} C</a>
  <v-progress-linear style="height: 12px; width: 1300px;  background-color: #199d12; color: #9d1212;" :model-value="value2"></v-progress-linear>
  <a style="font-family: fantasy; font-size:20px;">distance &nbsp;&nbsp;&nbsp;{{ value3 }} CM</a>
  <v-progress-linear style="height: 12px; width: 1300px;  background-color: #199d12; color: #9d1212;" :model-value="value3"></v-progress-linear>
</v-row>
        
        
        
    
    </v-main>
    </v-layout>
  </v-card>
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
      this.client.subscribe("jtemp1");
      this.client.subscribe("jtemp2");
      this.client.subscribe("patt11");
      this.client.subscribe("patt21");
      this.client.subscribe("1On");
      this.client.subscribe("2Off");
      this.client.subscribe("cm1");
      
    });
    this.client.on("message", (topic, message) => {
      if (topic === "jtemp1") {
        //console.log("connect_message/temp1=>");
        // message is Buffer
        //  console.log("GOT:", message.toString());
        this.value = message.toString();
        // console.log("data=", this.value);
        // client.end()
      }
      if (topic === "jtemp2") {
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
      if (topic === "cm1") {
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