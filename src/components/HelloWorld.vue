<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a href="https://community.vuetifyjs.com" target="_blank">Discord Community</a>
        </p>
        <v-treeview :items="devices"  v-model="value" :open-all="true" item-children='items'></v-treeview>
        <p v-if="value">{{value}}</p>wwww
      </v-flex>
      <v-flex>        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data(){
      return{
        value:[],
        devices:[
        {
          id: 1,
          name: "RACUNAR",
          parentid: null,
          description: "OPIS",
          properties: [
            {
              nameProperty: "cpu",
              required: true,
              type: "Text"
            },
            {
              nameProperty: "ram",
              required: false,
              type: "Text"
            }
          ],
          items: [{
          id: 2,
          name: "LAPTOP",
          parentid: 1,
          description: "OPIS",
          properties: [
            {
              nameProperty: "touchpad",
              required: false,
              type: "Text"
            }],
          items: [
            {
              id: 3,
              name: "ULTRA - LAPTOP",
              parentid: 2,
              description: "ULTRA LAGAN",
              properties: [
                {
                  nameProperty: "weight",
                  required: true,
                  type: "Text"
                }
              ],
            items: [{
              id:4,
              name:"Mob"
            }]
            },
            {
              id:7,
              name:"Standard Laptop",
              parentid:2,
              description:"Standardni laptop",
              properties:[{
                nameProperty:"price",
                required:true,
                type:'Text'
              }]
            }
          ]
        },
        {
          id:5,
          name: "Desktop"
        }
        ,
        {
          id:6,
          name: "Server"
        }
          ]
        }
      ]
      }
    }
  }
</script>

<style>

</style>
