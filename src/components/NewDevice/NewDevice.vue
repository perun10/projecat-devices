<template>
  <v-container grid-list-xs>
    <v-stepper v-model="tab">
      <v-stepper-header>
        <v-stepper-step :complete="tab==='newProperties'" step="1">
          <small>Step 1</small>
          Device Type
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="tab==='completed'" step="2">
          <small>Step 2</small>
          Properties
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-content step="newDevice">
        <TreeView :data="deviceTypes" :newDeviceType="false"/>
        <v-layout row wrap justify-center>
          <p v-if="message" style="color:red;">SELECTE DEVICE TYPE</p>
        </v-layout>
        <v-layout row wrap justify-space-around>
          <v-btn color="transparent" @click="close">Cancel</v-btn>
          <v-btn color="info" @click="next">Next</v-btn>
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="newProperties">
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <template>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-card>
                      <v-card-text style="background-color:lightgrey;">
                        <h6>"Device" properties</h6>
                      </v-card-text>
                      <v-card-text>
                        <v-text-field label="Regular" placeholder="Placeholder" v-model="name"></v-text-field>

                        <v-textarea box name="input-7-4" label="Description" v-model="description"></v-textarea>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
                <v-expansion-panel class="p-3">
                  <v-expansion-panel-content
                    v-for="(item, index) in devicetypeProperties"
                    :key="index"
                  >
                    <template v-slot:header>
                      <div>{{item.name}} properties</div>
                    </template>
                    <v-card>
                      <v-card-text v-if="item.properties.length">
                        <!-- <p class="propertyDescription">{{ item.description }}</p> -->
                        <div v-for="(item, index2) in item.properties" :key="index2">
                          <div class="propertyBody">
                            <p>
                              {{ item.nameProperty }}
                              <span v-if="item.required" class="required">*</span>
                            </p>
                            <!-- {{index}} :
                                 {{item}} 
                            {{index2}}               --> 
                            <!-- <component :is="item.type" :id="index+item.type+index2" @blur="take(index,index+item.type+index2,item.nameProperty,index2)"/>  -->
                           <component :is="item.type" @change="take2(item.nameProperty)"/>
                           <p style="color:red;" v-if="message&&item.required">{{paragraph}}</p>
                          </div>
                      
                        </div>
                      </v-card-text>
                      <v-card-text v-else>
                        <h3>No properties</h3>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </template>
              <v-layout row wrap></v-layout>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-center>
            <v-btn color="error" @click="close">Cancel</v-btn>
            <v-btn color="warning" @click="tab='newDevice'">Back</v-btn>
            <v-btn color="info" @click="createNewDevice">Save</v-btn>
            <!-- {{newDevicesValues}} -->
          </v-layout>
        </v-container>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import TreeView from "@/components/shared/TreeView.vue";
export default {
  components: {
    TreeView
  },
  beforeCreate() {
    if (!this.$store.getters.deviceTypes) {
      this.$store.dispatch("getDeviceTypes");
    }
  }, 
  methods: {  
    take2(name){
      console.log(name)
      let newValue = event.target.value;
      if(newValue){
        this.newDevicesValues.push({propName:name,value:newValue})
      }

    },
    take(index1 , value , nameProp , index2){
      console.log(value)
      let newValue = document.getElementById(value).value
      // console.log(index1,newValue,index2)
      this.newDevicesValues.push({propName:nameProp,value: newValue})
    },
    createNewDevice() {
      var msg = ''
      // console.log(this.name + "-" + this.description);
      // console.log(this.newDevicesValues) --- devicetypeProperties
      if(this.newDevicesValues){
     var newDev = {}
      // this.message = false
        this.newDevicesValues.forEach(item =>{
          msg = item.propName
      
      newDev = {
         deviceName : this.name,
         description: this.description,
         id:0,
         deviceTypes:[
           {id:this.parentId,
            propValues:[
              {propName : item.propName,
                value:item.value
              }
            ]
           }
         ]
      }
        })
        console.log(newDev)
        this.axios.post("http://localhost:21021/api/services/app/DeviceService/CreateOrUpdateDevice",newDev).
        then(()=>{
          this.$router.push('/devices')
        })
      }else{
        this.message = true
        this.paragraph = 'Value needed' 
      }
       
    },
    next() {
      if (this.parentId) {
        this.message = false;
        this.$store.dispatch("getDeviceTypeProperties", this.parentId)
        this.tab = "newProperties";
      } else {
        this.message = true;
      }
    },
    close() {
      this.$router.push("/devices");
    }
  },
  computed: {
    deviceTypes() {
      return this.$store.getters.deviceTypes;
    },
    parentId() {
      return this.$store.getters.selectedIdType;
    },
    devicetypeProperties() {
      return this.$store.getters.newDeviceTypeProperties;
    }
  },
  data() {
    return {
      newDevicesValues:[],
      newDevice: [
        {
          deviceName: "HP Laptop",
          description: "laptop",
          id: 0,
          deviceTypes: [
            {
              id: 83,
              propValues: [
                {
                  propName: "Velicina 2",
                  value: "value 2"
                },
                {
                  propName: "Velicina 1",
                  value: "value 1"
                }
              ]
            },
            {
              id: 84,
              propValues: [
                {
                  propName: "Velicina 2",
                  value: "value 2222"
                },
                {
                  propName: "Velicina 1",
                  value: "value 1111"
                }
              ]
            }
          ]
        }
      ],
      name: "",
      description: "",
      message: false,
      id: 0,
      tab: "newDevice",
      active: null,
      selectedValue: [],
      items2: ["MM", "RR"],
      test: "",
      paragraph:''
    };
  }
};
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
  border: 1px solid #4a86e8;
  margin-right: 40px;
}
.btn-save {
  background-color: #4a86e8;
  color: white;
}
</style>
