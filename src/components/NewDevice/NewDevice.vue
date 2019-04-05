<template>
     
    <v-tabs v-model="active" color="grey" dark slider-color="yellow" :centered="true">
    <v-tab>Step 1 | Device Type</v-tab>
    <v-tab>Step 2 | Properties</v-tab>
    <v-tab-item>
    <h1 class="text-center">New device</h1>

      <v-container>       
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout :justify-space-between="true">
              <h3>Name</h3>
              <h3>Description</h3>
            </v-layout>
            <v-treeview
              :items="items"
              :selectable="true"
              v-model="selectedValue"
              :value="selectedValue"
              :open-all="true"
              style="border:1px solid black;"
              class="border"
            >
              <template v-slot:append="{item , active}" class="text-center">
                <p class="mr-3 mt-3">{{item.description}}</p>
                <!-- <button type="button" class="btn btn-link" v-if="item.id!=1">Delete</button> -->
                <!-- <button type="button" class="btn btn-link">Edit</button> -->
              </template>
            </v-treeview>
            {{selectedValue}}
            <v-layout row wrap :justify-space-around="true">
             
                <button type="button" class="btn btn-light" @click="close">Cancel</button>
                <button type="button" class="btn btn-primary" @click="next">Next</button>
             
            </v-layout>
          </v-flex>
          <v-flex></v-flex>
        </v-layout>
        
      </v-container>
    </v-tab-item>
    <v-tab-item v-if="selectedValue!=0">
          <h1 class="text-center mt-3">New device</h1>
    
      <v-container>
        <v-layout row wrap> 
          <v-flex xs12>
            <template>
              
                <v-expansion-panel class="p-3">
    <v-expansion-panel-content 
      v-for="(item, index) in items2" :key="index">
      <template v-slot:header>
        <div>{{item.name}} properties</div>                  
      </template>
      <v-card>
        <v-card-text>
           <p class="propertyDescription">{{ item.description }}</p>
                   <div v-for="(item, index) in item.properties" :key="index">
                       <div class="propertyBody">
                           <p>{{ item.nameProperty }} <span v-if="item.required" class="required">*</span></p>
                           <input type="text">
                       </div>
                   </div>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>          
            </template>
          </v-flex>
        </v-layout>
      </v-container>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  methods: {
      next () {
        if(this.selectedValue!=0){
        const active = parseInt(this.active)
        this.active = (active < 2 ? active + 1 : 0)
        }else{
          alert('PICK DEVICE TYPE')
        }
      },
      close(){
        this.$router.push('/')
      }
    },
data(){
  return {
    active:null,
    selectedValue:[],
    items: [
        {
          id: 1,
          name: "RACUNAR",
          parentid: null,
          description: "RACUNAR PARENT 0",
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
          children: [
            {
              id: 2,
              name: "LAPTOP",
              parentid: 1,
              description: "Basic Laptop",
              properties: [
                {
                  nameProperty: "touchpad",
                  required: false,
                  type: "Text"
                }
              ],
              children: [
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
                  children: [
                    {
                      id: 4,
                      name: "Air Book",
                      parentid: 3,
                      description: "Microsoft Air Book",
                      properties: [
                        {
                          nameProperty: "size",
                          required: true,
                          type: "input"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 7,
                  name: "Standard Laptop",
                  parentid: 2,
                  description: "Standardni laptop",
                  properties: [
                    {
                      nameProperty: "price",
                      required: true,
                      type: "Text"
                    }
                  ]
                }
              ]
            },
            {
              id: 5,
              name: "Desktop",
              parentid: 1,
              description: "Home desktop PC",
              properties: [
                {
                  nameProperty: "Case",
                  required: true,
                  type: "Label"
                }
              ]
            },
            {
              id: 6,
              name: "Server",
              parentid: 1,
              description: "Server Firewall",
              properties: [
                {
                  nameProperty: "Housing",
                  required: true,
                  type: "Label"
                }
              ]
            }
          ]
        }
      ],
      items2:[
    {
      id:1,
      name:"RACUNAR",
      parentid:null,
      description:"OPIS",
      properties:[
        {nameProperty:"cpu",required:true,type:"Text"},
        {nameProperty:"ram",required:false,type:"Text"}
      ]
    },
    {
      id:2,
      name:"LAPTOP",
      parentid:1,
      description:"OPIS",
      properties:[{nameProperty:"touchpad",required:false,type:"Text"}]
    },
    {
      id:3,
      name:"ULTRA - LAPTOP",
      parentid:2,
      description:"ULTRA LAGAN",
      properties:[
        {nameProperty:"weight",required:true,type:"Text"},
        {nameProperty:"boja",required:true,type:"zelena"}
      ]
    },
    {
      id:4,
      name:"Ultra Book",
      properties:[{nameProperty:"tezina",required:true,type:"Text"}]
    }
   ]
  }
}
}
</script>

<style scoped>
input {
       border: 1px solid #404040;
       margin-bottom: 15px;
       width: 319px;
       height: 32px;
       padding-left: 6px;
   }

   .property {
       max-width: 747px;
       margin: 0 auto;
       border: 1px solid #404040;
       margin-bottom: 25px;
   }

   .propertyHeader {
       height: 40px;
       background-color: #efefef;
       font-weight: 700;
       padding-left: 25px;
       vertical-align: middle;
       line-height: 40px;
       border-bottom: 1px solid #404040;
   }

   .propertyBody {
       margin-left: 25px;
       display: inline-block;
   }

   .required {
       color: red;
   }

   .propertyDescription {
       margin-left: 25px;
   }

   button {
       width: 141px;
       height: 34px;
       border: 1px solid #4A86E8;
       margin-right: 40px;
   }
.btn-save {
       background-color: #4a86e8;
       color: white;
   }
</style>
