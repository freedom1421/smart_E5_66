<template>
    <v-card>
        <v-layout style="background-color: #265073; min-height: 100vh;">
            <v-main>
                <v-card color="grey-lighten-4" flat height="auto" rounded="0" justify="center">
                    <v-toolbar dense style="background-color: #ECF4D6; color: #265073;">
                        <v-btn icon @click="dosomething">
                            <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
                        </v-btn>
                        <h2 class="title" style="font-size: 20px;">Show Report</h2>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </v-card>
                <div style="--v-layout-left: 0px; ">
                    <v-data-table :headers="headers" :items="desserts" class="elevation-1">
                    </v-data-table>
                </div>
            </v-main>
        </v-layout>
    </v-card>
</template>
  
<script>
export default {
    
    data: () => ({
        headers: [
            { title: 'Time', key: 'Time' },
            { title: 'temp', key: 'Temperature' },
            { title: 'humi', key: 'Humidity' },
            { title: 'pH', key: 'pH_value' },
        ],
        desserts: [],
    }),
    created() {
        this.showdata();
    },
    methods: {
        dosomething() {
            this.$router.push('/test')
        },
        async showdata() {
            const url = '/api/listcover';  
            const res = await fetch(url);
            const data = await res.json()
            this.desserts = data.datas.reverse();
            console.log('data=>', data.datas)
        },
    },
}
</script>   