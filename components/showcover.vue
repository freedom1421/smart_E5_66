<template>
<!-- HEADDER===================================================================== -->
    <v-card>
        <v-layout style="background-color: #265073; min-height: 100vh;">
            <v-main style="height:auto; width: auto;">
                <v-card color="grey-lighten-4" flat height="auto" rounded="0" justify="center">
                    <v-toolbar density="compact"
                        style="background-color: #ECF4D6; color: #265073; height: 70px; padding-top: 10px;">
                        <h2
                            style="font-size: 30px; margin-left: 80px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; ">
                            Show Report</h2>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </v-card>
<!-- HEADDER===================================================================== -->
                <div style="--v-layout-left: 0px; ">
                    <v-data-table :headers="headers" :items="desserts" 
                        class="elevation-1" style=" padding-left: 60px;">
                    </v-data-table>
                </div>
            </v-main>
        </v-layout>
    </v-card>
</template>


<script>
export default {
    setup() {
        const checkTokenExists = () => {
            const token = localStorage.getItem('token');
            if (token) {
                console.log('มี token อยู่ใน localStorage');
            } else {
                console.log('ไม่มี token ใน localStorage');
                navigateTo('/login')
            }
        };

        onMounted(() => {
            checkTokenExists();
        });
    },
    data: () => ({

        dialog: false,
        dialogDelete: false,
        headers: [
            { title: 'Date', key: 'Date' },
            { title: 'Time', key: 'Time' },
            { title: 'temperature', key: 'Temp' },
            { title: 'humidity', key: 'Humidity' },
            { title: 'pH Value', key: 'PH_value' },
        ],
        desserts: [],
        

    }),

    created() {
        this.showdata()
    },

    methods: {
        async back() {
            navigateTo("/")
        },
        async showdata() {
            const url = 'http://localhost:7001/listcover';
            const res = await fetch(url);
            const data = await res.json()
            this.desserts = data.datas
            console.log('data=>', data.datas)
        },
    },
}
</script>   