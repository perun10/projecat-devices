<template>
 <v-container v-if="devices">
   <v-layout row wrap>
     <v-flex xs12 mb-5>
       <button type="button" class="btn btn-primary" @click="pushToNewDevice">New device</button>
     </v-flex>
   </v-layout>
   <v-data-table :headers="header" :items="devices" class="elevation-1" item-key="name">
     <template v-slot:items="props">
       <template v-for="it in props.item.data.result">
         <tr :key="it.index">
           <td class="text-left">{{it.name}}</td>
           <td class="text-center">{{it.deviceTypeName}}</td>
           <td class="text-right">{{it.description}}</td>
           <!-- <td class="text-right" @click="onEdit(it)">Edit</td> -->
           <td class="text-right td-button" @click="onDelete(it)">Delete</td>
         </tr>
       </template>
     </template>
   </v-data-table>
   <prompt :visible="dialogVisible" :activeDevice="activeDevice" @close="onClose" :mode="mode"></prompt>
 </v-container>
</template>

<script>
import Prompt from "@/components/shared/Prompt";
import {store} from '@/store/store'

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
     mode: ''
   };
 },
 beforeRouteEnter(to,from,next) {
  store.dispatch("getDevices");  
   next();
 },
 created(){
  //  this.myDevs = this.devices
 },
 computed: {
   devices() {
     let arr = [];
     // return this.$store.getters.devices
     arr.push(this.$store.getters.devices);
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