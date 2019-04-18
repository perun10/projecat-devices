<template>
 <v-container v-if="devices">
   <v-layout row wrap>
     <v-flex xs12 mb-5>
       <button type="button" class="btn btn-primary" @click="pushToNewDevice">New device</button>
     </v-flex>
   </v-layout>
   {{devices}}
   <v-data-table :headers="header" :items="devices" class="elevation-1" item-key="name" v-if="devices">
     <template v-slot:items="props">
    
      
         <tr>
           <td class="text-left">{{props.item.name}}</td>
           <td class="text-center">{{props.item.deviceTypeName}}</td>
           <td class="text-right">{{props.item.description}}</td>
           <!-- <td class="text-right" @click="onEdit(it)">Edit</td> -->
           <td class="text-right td-button btn-link" @click="onDelete(props.item)">Delete</td>
         </tr>
     
    
     </template>
   </v-data-table>
   <prompt :visible="dialogVisible" :activeDevice="activeDevice" @close="onClose" :mode="mode"></prompt>
 </v-container>
</template>

<script>
import Prompt from "@/components/shared/Prompt";
import {store} from '@/store/store'
import { setTimeout } from 'timers';

export default {
   components: {
       Prompt
   },
 data() {
   return {
     
     myDevs:[],
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
       ,
       {
         text: "Options",
         align: "right",
         sortable: false,
         value: "Options"
       }
     ],
     activeDevice: [],
     dialogVisible: false,
     mode: '',
     data:[
    {
      "id":1,
      "name":"RACUNAR",
      "parentid":null,
      "description":"OPIS",
      "items":[
        {"nameProperty":"cpu","required":true,"type":"Text"},
        {"nameProperty":"ram","required":false,"type":"Text"}
      ]
    },
    {
      "id":2,
      "name":"LAPTOP",
      "parentid":1,
      "description":"OPIS",
      "items":[{"nameProperty":"touchpad","required":false,"type":"Text"}]
    },
    {
      "id":3,
      "name":"ULTRA - LAPTOP",
      "parentid":2,
      "description":"ULTRA LAGAN",
      "items":[
        {"nameProperty":"weight","required":true,"type":"Text"},
        {"nameProperty":"boja","required":true,"type":"zelena"}
      ]
    },
    {
      "id":4,
      "name":"Ultra Book",
      "items":[{"nameProperty":"tezina","required":true,"type":"Text"}]
    }
   ]
  
   };
 },
 beforeRouteEnter(to,from,next) {
   store.commit('setLoader',true)
  store.dispatch("getDevices");
  setTimeout(()=>{
   next();
  },500)  
   
 },
 mounted(){
    this.$store.commit('setLoader',false)
 },
 computed: {
   devices() {
     let arr = [];
     // return this.$store.getters.devices
     arr = this.$store.getters.devices.data.result;
     // console.log(arr)
     return arr;
   }
 },
 methods: {
   pushToNewDevice() {
     this.$router.push("/new-device");
   },
   onDelete(item) {
       this.mode = 'deleteDevice'
       this.dialogVisible = true;
       console.log(this.dialogVisible)
       this.activeDevice = item;
   },
   onClose() {
       this.mode = ''
       this.dialogVisible = false;
       this.activeDevice = null;
   },
 }
};
</script>
<style scoped>
   .td-button:hover {
       cursor: pointer;
   }
</style>