<template>
  <v-container grid-list-xs>
    <v-stepper :value="tabLocation">
      <v-stepper-header>
        <v-stepper-step :complete="tabLocation==='newProperties'" step="1">
          <small>Step 1</small>
          Device Type
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="tabLocation==='completed'" step="2">
          <small>Step 2</small>
          Properties
        </v-stepper-step>
      </v-stepper-header>


        <!-- STEP 1 -->
      <v-stepper-content step="newDevice">
        <TreeView :data="deviceTypes" :newDeviceType="false" :activChild="true" v-if="deviceTypes"/>
        <v-layout row wrap justify-center>
          <p v-if="message" style="color:red;">SELECTE DEVICE TYPE</p>
        </v-layout>
        <!-- <v-layout row wrap justify-space-around>
          <v-btn color="transparent" @click="close">Cancel</v-btn>
          <v-btn color="info" @click="next">Next</v-btn>
        </v-layout>-->
      </v-stepper-content>


        <!-- STEP 2 -->
      <v-stepper-content step="newProperties" v-if="tabLocation === 'newProperties'">
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
                        <v-form v-model="valid">
                          <v-text-field
                            v-model="name"
                            :rules="nameRules"
                            :counter="20"
                            label="Name"
                            required
                          ></v-text-field>

                          <v-textarea
                            box
                            name="input-7-4"
                            label="Description"
                            v-model="description"
                            :rules="descripRules"
                            required
                          ></v-textarea>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
                
                <v-expansion-panel class="p-3" :expand="true" v-if="!editDeviceMode">
                    <v-expansion-panel-content
                        v-for="(item, index) in devicetypeProperties"
                        :key="index"
                    >
                        <template v-slot:header>
                            <div>{{item.name}} properties</div>
                        </template>
                        <v-card>
                            <v-card-text v-if="item.properties.length">
                                <div v-for="(item1, index2) in item.properties" :key="index2">
                                    <div class="propertyBody">
                                        <p>
                                        {{ item1.nameProperty }}
                                        <span v-if="item1.required" class="required">*</span>
                                        </p>
                                        <component
                                        :is="item1.type"
                                        @change="take2(item.id,item1.nameProperty)"
                                        />
                                        <p style="color:red;" v-if="message&&item1.required">{{paragraph}}</p>
                                    </div>
                                </div>
                            </v-card-text>
                            <v-card-text v-else>
                                <h3>No properties</h3>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <!-- V-FOR EDIT DEVICE MODE-->
                <v-expansion-panel class="p-3" :expand="true" v-if="editDeviceMode && activeDeviceProperties">
                    <v-expansion-panel-content
                        v-for="(item, index) in activeDeviceProperties[0].deviceTypes"
                        :key="index"
                    >
                        <template v-slot:header>
                            <div>{{item.deviceTypeName}} properties</div>
                        </template>
                        <v-card>
                            <v-card-text v-if="item.propValues">
                                <div v-for="(item1, index2) in item.propValues" :key="index2">
                                    <div class="propertyBody">
                                        <p>
                                        {{ item1.propName }}
                                        <span v-if="item1.required" class="required">*</span>
                                        </p>

                                        <component
                                        v-if="item1.type === 'input'"
                                        :value="item1.value"
                                        :is="item1.type"
                                        @change="getValue(item.deviceTypeId, item1.propName)"
                                        />

                                        <component
                                        v-if="item1.type === 'textarea'"
                                        :is="item1.type"
                                        @change="getValue(item.deviceTypeId, item1.propName)"
                                        >{{item1.value}}</component>

                                        <p style="color:red;" v-if="message&&item1.required">{{paragraph}}</p>
                                    </div>
                                </div>
                            </v-card-text>
                            <!-- <v-card-text v-else>
                                <h3>No properties</h3>
                            </v-card-text> -->
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                
              </template>
              <v-layout row wrap></v-layout>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-center>
            <v-btn color="error" @click="close">Cancel</v-btn>
            <v-btn color="warning" @click="back">Back</v-btn>
            <v-btn color="info" @click="createNewDevice" v-if="!editDeviceMode">Save</v-btn>
            <v-btn color="info" @click="editDevice" v-if="editDeviceMode">Save</v-btn>
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
    beforeDestroy() {
        this.$store.commit("setTabLocation", "newDevice");
        this.$store.commit("setDeviceTypeId", null);
        this.$store.commit('setEditDeviceMode', false);
    },
    created() {
        if(this.tabLocation){
            this.tab = this.tabLocation
        }
        if(this.editDeviceMode) {
            this.name = this.activeDevice.name;
            this.description = this.activeDevice.description;
        }
    },
    watch: {
        activeDeviceProperties() {
            if(this.editDeviceMode) {
                if(this.activeDeviceProperties[0].deviceTypes.length !== 0 && !this.devicePropertiesSet) {
                    for(let i = 0; i < this.activeDeviceProperties[0].deviceTypes.length; i++) {
                        this.deviceProperties.push({
                            id: this.activeDeviceProperties[0].deviceTypes[i].deviceTypeId,
                            propValues: []
                        })
            
                        for(let j = 0; j < this.activeDeviceProperties[0].deviceTypes[i].propValues.length; j++) {
                            this.deviceProperties[i].propValues.push(
                                {
                                    propName: this.activeDeviceProperties[0].deviceTypes[i].propValues[j].propName,
                                    value:  this.activeDeviceProperties[0].deviceTypes[i].propValues[j].value
                                } 
                            )
                        }
                    }
                    this.devicePropertiesSet = true;
                }
            }
        }
    },
    methods: {
        getValue(id, name) {
            let checkIndex = this.deviceProperties.map(e => { return e.id }).indexOf(id);
            let checkIndex2 = this.deviceProperties[checkIndex].propValues.map(e=> {return e.propName}).indexOf(name);
            let newValue = event.target.value;
            this.deviceProperties[checkIndex].propValues[checkIndex2].value = newValue;
        },
        take2(id, name) {
            let checkIndex = this.newDevicesValues.map(e=> {return e.id}).indexOf(id)
            let newValue = event.target.value;
            if (checkIndex === -1) {
                let newObj = {
                    id: id,
                    propValues: [{ propName: name, value: newValue }]
                };
                this.newDevicesValues.push(newObj);
            } else {        
                this.newDevicesValues[checkIndex].propValues.push({ propName: name, value: newValue })
            }
        },
        take(index1, value, nameProp, index2) {
            let newValue = document.getElementById(value).value;
            this.newDevicesValues.push({ propName: nameProp, value: newValue });
        },
        async editDevice() {
            const data = {
                deviceName: this.name,
                description: this.description,
                id: this.activeDevice.id,
                deviceTypes: this.deviceProperties,
                deviceTypeId: this.selectedIdType
            };

            await this.axios.post("http://localhost:21021/api/services/app/DeviceService/CreateOrUpdateDevice", data)
                .then(() => {
                    this.$store.dispatch('getDevices');
            });
            this.$store.commit('setActiveDevice', []);
            this.$store.commit('setActiveDeviceProperties', []);
            this.$store.commit('setEditDeviceMode', false);
            this.devicePropertiesSet = false;
            this.$router.push("/devices");
        },
        createNewDevice() {
            var msg = "";
            var newDev = {};
            var newArr = [];
            this.newDevicesValues.forEach(item => {
                newArr.push({ propName: item.propName, value: item.value });
            });

            newDev = {
                deviceName: this.name,
                description: this.description,
                id: 0,
                deviceTypes: this.newDevicesValues,
                deviceTypeId: this.selectedIdType

            };

            this.axios
                .post(
                    "http://localhost:21021/api/services/app/DeviceService/CreateOrUpdateDevice",
                    newDev
                )
                .then(() => {
                    this.$router.push("/devices");
                });
        },
        next() {
            if (this.parentId) {
                this.message = false;
                this.$store.dispatch("getDeviceTypeProperties", this.parentId);
                this.tab = "newProperties";
            } else {
                this.message = true;
            }
        },
        close() {
            this.$router.push("/devices");
        },
        back() {
            this.$store.commit("setTabLocation", "newDevice");
        }
    },
    computed: {
        tabLocation() {
            return this.$store.getters.tabLocation;
        },
        deviceTypes() {
            return this.$store.getters.deviceTypes;
        },
        parentId() {
            return this.$store.getters.selectedIdType;
        },
        devicetypeProperties() {
            return this.$store.getters.newDeviceTypeProperties;
        },
        editDeviceMode() {
            return this.$store.getters.editDeviceMode;
        },
        activeDevice() {
            return this.$store.getters.activeDevice;
        },
        activeDeviceProperties() {
            return this.$store.getters.activeDeviceProperties;
        },
        selectedIdType() {
            return this.$store.getters.selectedIdType;
        }
    },
    data() {
        return {
            devicePropertiesSet: false,
            deviceProperties: [],
            valid: false,
            nameRules: [
                v => !!v || "Name is required",
                v => v.length <= 10 || "Name must be less than 10 characters"
            ],
            descripRules: [
                v => !!v || "Description is required",
                v => v.length >= 10 || "Description must be more than 10 characters"
            ],
            newDevicesValues: [],
            name: "",
            description: "",
            message: false,
            id: 0,
            tab: "newDevice",
            active: null,
            selectedValue: [],
            items2: ["MM", "RR"],
            test: "",
            paragraph: ""
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
