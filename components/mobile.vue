<template>
  <v-card>
    <v-layout style="background-color: #265073; min-height: 100vh;" align="center" justify="center">
      <v-main style="height:auto; width: auto;">
        <v-card color="grey-lighten-4" flat height="auto" rounded="0" justify="center">
          <v-toolbar density="compact"
            style="background-color: #ECF4D6; color: #265073; height: 70px; padding-top: 10px; ">
            <v-btn density="compact" icon="mdi-garage" size="x-large" @click="dosometing"></v-btn>
            <h2
              style="font-size: 20px;  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; ">
              Smart Farm</h2>
            
            <v-spacer></v-spacer>
            <h3
              style="margin-right: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 20px;">
              {{ currentTime }}</h3>
          </v-toolbar>
        </v-card> <!-- HEADDER===================================================================== -->
        <v-row
  style="text-align: start; align-items: start; justify-content: start; height: 250px; width: 300px; background-color: #ECF4D6; border-radius: 5%; margin-top:40px; padding: 20px 20px;">
  <v-row>
    <v-col>
      <a style="text-align: start; font-size: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #265073;">Air Humidity&ensp;</a>
      <a style="text-align: end; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 20px;">&ensp;{{ value1 }} RH</a>
      <v-progress-linear :height="20" :model-value="value1" color="#265073"></v-progress-linear>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <a style="text-align: start; font-size: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #265073;">Temperature&ensp;</a>
      <a style="text-align: end; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 20px;">&ensp;{{ value2 }} C</a>
      <v-progress-linear :height="20" :model-value="value2" color="#265073"></v-progress-linear>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <a style="text-align: start; font-size: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #265073;">pH Level&ensp;</a>
      <a style="text-align: end; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 20px;">&ensp;{{ value3 }} pH</a>
      <v-progress-linear :height="20" :model-value="value3" color="#265073"></v-progress-linear>
    </v-col>
  </v-row>
</v-row>




          <!-- -----------------------------------control------------------------------------------------------------- -->


          <v-row style="align-items: center; justify-content: center; top: 10px;">
            <v-col style="justify-items: center;">
              <v-row
                style="height: 350px; width: 300px; align-items: center; background-color: #ECF4D6; justify-content: center;  border-radius: 50px; margin: 30px  0px 0px 0px; padding: 10px;">
                <v-btn size="200" variant="tonal" :color="lightColor" class="rounded-circle">
                  <v-icon size="80" :icon="isLight2On"></v-icon>
                </v-btn>

                <v-col cols="auto">
                  <v-btn
                    style="height: 60px; width: 100px; background-color: #199d12; color: #ffffff; border-radius: 50px;"
                    @click="bntSensor1">OPEN</v-btn>
                </v-col>

                <v-col cols="auto">
                  <v-btn
                    style="height: 60px; width: 100px; background-color: #9d1212; color: #ffffff; border-radius: 50px;"
                    @click="bntSensor2">CLOSE</v-btn>
                </v-col>
              </v-row>
            </v-col>


            <v-col style="justify-items: center;">
              <v-row
                style="height: 350px; width: 300px; align-items: center; background-color: #ECF4D6; justify-content: center;  border-radius: 50px; margin: 30px  0px 0px 0px; padding: 10px;">
                <v-btn size="200" variant="tonal" :color="lightColor1" class="rounded-circle">
                  <v-icon size="80" :icon="isfan2On"></v-icon>
                </v-btn>

                <v-col cols="auto">
                  <v-btn
                    style="height: 60px; width: 100px; background-color: #199d12; color: #ffffff; border-radius: 50px;"
                    @click="bntSensor11">OPEN</v-btn>
                </v-col>

                <v-col cols="auto">
                  <v-btn
                    style="height: 60px; width: 100px; background-color: #9d1212; color: #ffffff; border-radius: 50px;"
                    @click="bntSensor21">CLOSE</v-btn>
                </v-col>
              </v-row>
            </v-col>

            <v-col style="justify-items: center;">
              <v-row
                style="height: 350px; width: 300px; align-items: center; background-color: #ECF4D6; justify-content: center;  border-radius: 50px; margin: 30px  0px 0px 0px; padding: 10px;">
                <v-btn size="200" variant="tonal" :color="lightColor2" class="rounded-circle">
                  <v-icon size="80" :icon="isfog2On"></v-icon>
                </v-btn>

                <v-col cols="auto">
                  <v-btn
                    style="height: 60px; width: 100px; background-color: #199d12; color: #ffffff; border-radius: 50px;"
                    @click="bntSensor111">OPEN</v-btn>
                </v-col>

                <v-col cols="auto">
                  <v-btn
                    style="height: 60px; width: 100px; background-color: #9d1212; color: #ffffff; border-radius: 50px;"
                    @click="bntSensor211">CLOSE</v-btn>
                </v-col>
              </v-row>
            </v-col>

          </v-row>
      </v-main>
    </v-layout>

  </v-card>
</template>



<script>

export default {
  mounted() {
    this.getCurrentTime();
    this.intervalId = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
    this.setupInterval();
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  setup() {
    useHead({
      script: ["/dist/mqtt/mqtt.min.js"],
    });
  },

  data() {
    return {
      value1: 30,
      value2: 26.02,
      value3: 7.18,
      isLight2On: "mdi-engine-off",
      isfan2On: "mdi-fan-off",
      isfog2On: "mdi-cloud-off",
      lightColor: "grey-darken-4",
      lightColor1: "grey-darken-4",
      lightColor2: "grey-darken-4",
      sensor1Value: "0",
      sensor2Value: "0",
      sensor21Value: "0",
      sensor11Value: "0",

      currentTime: "loading"
    };
  },

  beforeMount() {
    this.client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
    this.client.on("connect", () => {
      console.log("on client connect");
      this.client.subscribe("pum1");
      this.client.subscribe("pum2");
      this.client.subscribe("fan1");
      this.client.subscribe("fan2");
      this.client.subscribe("fog1");
      this.client.subscribe("fog2");
      this.client.subscribe("jtemp1");
      this.client.subscribe("jtemp2");
      this.client.subscribe("jPH1");
    });
    this.client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
    console.log("connect_message/beforeMount=> ");
    console.log("on client connect");
    this.client.on("connect", () => {
      console.log("on client connect");
      this.client.subscribe("jtemp1");
      this.client.subscribe("jtemp2");
      this.client.subscribe("jPH1");

    });
    this.client.on("message", (topic, message) => {
      if (topic === "jtemp1") {
        //console.log("connect_message/temp1=>");
        // message is Buffer
        //  console.log("GOT:", message.toString());
        this.value1 = message.toString();
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
      if (topic === "jPH1") {
        //  console.log("connect_message/cm=>");
        // message is Buffer
        // console.log("GOT:", message.toString());
        this.value3 = message.toString();
        //console.log("data=", this.value);
        // client.end()
      }

    });
    this.client.on("message", (topic, message) => {
      if (topic === "pum1") {
        this.sensor1Value = message.toString();
        console.log("sensor1Data=", this.sensor1Value);
        this.isLight2On = "mdi-engine";
        this.lightColor = "amber-darken-4";
      }
      if (topic === "pum2") {
        this.sensor2Value = message.toString();
        console.log("sensor2Data=", this.sensor2Value);
        this.isLight2On = "mdi-engine-off";
        this.lightColor = "grey-darken-4";
      }
      if (topic === "fan1") {
        this.sensor11Value = message.toString();
        console.log("sensor11Data=", this.sensor11Value);
        this.isfan2On = "mdi-fan";
        this.lightColor1 = "amber-darken-4";
      }
      if (topic === "fan2") {
        this.sensor21Value = message.toString();
        console.log("sensor21Data=", this.sensor21Value);
        this.isfan2On = "mdi-fan-off";
        this.lightColor1 = "grey-darken-4";
      }
      if (topic === "fog1") {
        this.sensor111Value = message.toString();
        console.log("sensor11Data=", this.sensor111Value);
        this.isfog2On = "mdi-cloud";
        this.lightColor2 = "amber-darken-4";
      }
      if (topic === "fog2") {
        this.sensor211Value = message.toString();
        console.log("sensor21Data=", this.sensor211Value);
        this.isfog2On = "mdi-cloud-off";
        this.lightColor2 = "grey-darken-4";
      }

    });
  },


  methods: {
    getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear().toString();
      this.year = year;
      this.month = month;
      this.day = day;
      this.h25 = hours;
      this.h24 = minutes;
      this.h23 = seconds;
      this.currentTime = `${hours}:${minutes}:${seconds}`;
    },
    bntSensor1() {
      this.client.publish("pum1", "1");
      console.log("sensor ON");
    },
    
    bntSensor2() {
      this.client.publish("pum2", "0");
      console.log("sensor OFF");
    },
    bntSensor11() {
      this.client.publish("fan1", "1");
      console.log("sensor ON");
    },
    bntSensor21() {
      this.client.publish("fan2", "0");
      console.log("sensor OFF");
    },
    bntSensor111() {
      this.client.publish("fog1", "1");
      console.log("sensor ON");
    },
    bntSensor211() {
      this.client.publish("fog2", "0");
      console.log("sensor OFF");
    },
    setupInterval() {
      this.intervalId = setInterval(() => {
        this.doSave();
      }, 60000);
    },
    clearInterval() {
      clearInterval(this.intervalId);
    },
    dosometing(){
      navigateTo('/showmobile');
    },
  },
}
</script>
  