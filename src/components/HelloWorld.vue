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
        <v-treeview :items="devices" :selectable='true' v-model="value" :open-all="true" item-children='items'></v-treeview>
        <p v-if="value">{{value}}</p>
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
        devices:[{
          id:1,
          name:'Proba',
          description:'Opis',
          properties:[{propertyName:'cpu',required:true,type:'Text'}],
          propetyId:null,
          items:[{
            id:2,
            name:'Proba 1',
            description:'Opis',
            properties:[{propertyName:'ram',required:true,type:'Text'}],
            propetyId:1,
            items:[
              {
              id:3,
              name:'Proba 1.1',
              description:'Opis',
              properties:[{propertyName:'display',required:true,type:'Text'}],
              propetyId:2,
            },
              {
              id:4,
              name:'Proba 1.2',
              description:'Opis',
              properties:[{propertyName:'tastatura',required:true,type:'Text'}],
              propetyId:2,
            }
            ]
          },
          {
            id:5,
            name:'Proba 2',
            description:'Opis',
            properties:[{propertyName:'mis',required:true,type:'Text'}],
            propetyId:1,

          }
          
          
          ]
        }]
      }
    }
  }
</script>

<style>

</style>
