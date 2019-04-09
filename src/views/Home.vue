<template>
  <v-tabs v-model="active" color="grey" dark slider-color="yellow" :centered="true">
    <v-tab>Device Types</v-tab>
    <v-tab>Devices</v-tab>
    <v-tab-item>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 mb-5>
            <button
              type="button"
              class="btn btn-primary"
              @click="pushToNewDeviceType"
            >New device type</button>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout :justify-space-between="true">
              <h3>Name</h3>
              <h3>Description</h3>
            </v-layout>
            <v-treeview
              :items="myData"
              v-model="value"
              :open-all="true"
              style="border:1px solid black;"
              class="border"
            v-if="deviceTypes">
              <template v-slot:append="{item , active}" class="text-center">
                <p class="mr-3 mt-3">{{item.description}}</p>
                <button type="button" class="btn btn-link" v-if="item.id!=1">Delete</button>
                <button type="button" class="btn btn-link">Edit</button>
              </template>
            </v-treeview>
          </v-flex>
          <v-flex></v-flex>
        </v-layout>
      </v-container>
    </v-tab-item>
    <v-tab-item>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 mb-5>
            <button type="button" class="btn btn-primary" @click="pushToNewDevice">New device</button>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
        
              <v-data-table :headers="header" :items="devices" class="elevation-1" v-if="devices">
                <template v-slot:items="props">
                  <td>{{props.item.name}}</td>
                  <td class="text-center">{{props.item.deviceType}}</td>
                  <td class="text-right">{{props.item.description}}</td>
             
                </template>
              </v-data-table>
              <!-- <div v-for="data in deviceTypes" >
                <p>{{data}}</p>
              </div> -->
          
          </v-flex>
        </v-layout>
      </v-container>
    </v-tab-item>
  </v-tabs>
</template>
<style>
.v-treeview-node__root {
  border: 1px solid grey;
}
</style>

<script>
export default {
  data() {
    return {
      active: "",
      itemKey: [],
      value: [],
      header: [
        {
          text: "Name",
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: "Type",
          align: "center",
          sortable: true,
          value: "type"
        },
        {
          text: "Description",
          align: "right",
          sortable: false,
          value: "description"
        }
      ]
    }
  },
  beforeCreate() {
  this.$store.dispatch('getDeviceProperties')
  // this.$store.dispatch('getDevices')
    },
    mounted(){
      console.log(this.deviceTypes)
    },
  methods: {
    pushToNewDeviceType() {
      this.$router.push("/device-type");
    },
    pushToNewDevice() {
      this.$router.push("/device");
    },
       
    }  ,
    computed:{
      deviceTypes() {
            return this.$store.getters.deviceTypes;
        },
        myData(){
          let arr = []
          arr.push(this.deviceTypes)
          return arr
        },
        devices(){
          return this.$store.getters.devices
        }
    }  
  }
</script>
