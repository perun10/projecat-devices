<template>
    <div>
        <v-layout row wrap grid-list-xs text-xs-center>
            <v-flex xs8>
                 
                <v-expansion-panel class="p-3" :expand="true">
                  <v-expansion-panel-content
                    v-for="(item, index) in deviceTypesProperties"
                    :key="index"
                  >
                    <template v-slot:header>
                      <div>{{item.name}} properties</div>
                    </template>
                    <v-card>
                      <v-card-text v-if="item.properties.length">
                        <!-- <p class="propertyDescription">{{ item.description }}</p> -->
                        <div v-for="(item1, index2) in item.properties" :key="index2">
                          <div class="propertyBody">
                            <p>
                              {{ item1.nameProperty }}
                              <span v-if="item1.required" class="required">*</span>
                            </p>
                            <!-- {{item}}  -->
                            <!-- {{index}} :
                            {{index2}}-->
                            <!-- <component :is="item.type" :id="index+item.type+index2" @blur="take(index,index+item.type+index2,item.nameProperty,index2)"/>  -->
                             <p>{{ item.nameProperty }} <span v-if="item.required" class="required">*</span></p>
                                <component :is="item1.type" type="text" disabled class="disabledField"></component>
                          </div>
                        </div>
                      </v-card-text>
                      <v-card-text v-else>
                        <h3>No properties</h3>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                 <div class="property newDevice">
                    <p class="propertyHeader">"{{ activeDeviceType.name }}" properties</p>
                    <draggable
                        class="list-group"
                        :list="properties"
                        :options="{group:{ name:'a', pull:'clone'}, sort: false }"
                        draggable=".item"
                        @change="newModal(activeType)">
                            <div
                                class="list-group-item item"
                                v-for="(element, index) in properties"
                                :key="index">
                                <v-layout row wrap justify-space-around>
                                    <p class="pl-5">{{ element.nameProperty }} <span v-if="element.required" class="required">*</span></p>
                                    <a @click="openModal(element.localID, element.type)">
                                        <img class="svgLinkBtn" src="@/assets/settings.svg" alt="">
                                    </a>
                                    
                                </v-layout>
                                <v-layout row wrap justify-space-between="">
                                    <component :is="element.type" disabled class="disabledField"/> 
                                    
                                    <a color="red"  @click="deleteProperty(element.localID)">X</a>
                                    
                                </v-layout>
                            </div>
                    </draggable>
                </div>

               
            </v-flex>

            <!-- dragable 2 -->
            <v-flex xs4 class="border">
                <draggable id="first" data-source="juju" :value="myArray"
                     :options="{group:{ name:'a', pull:'clone'}, sort: false}">
                    <div @mousedown="activeType = element.type"
                        class="list-group-item item"
                        v-for="(element,index) in myArray"
                        :key="index"
                    >
                        <p>{{ element.name }}</p>
                    </div>
                </draggable>
            </v-flex>
           
            <!-- modal -->
            <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="392px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Field Properties</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field label="Label*" v-model="nameProperty" required>{{ nameProperty }}</v-text-field>
                                        <!-- <small id="labelError">This label is already in use. Pick another one.</small> -->
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-checkbox v-model="checkbox" :label="`Mandatory field`"></v-checkbox>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="closeDialog">Cancel</v-btn>
                            <v-btn color="blue darken-1" flat :disabled="!nameProperty" @click="saveFieldProperties">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </v-layout>
        <v-layout row wrap grid-list-md text-xs-center>
            <v-flex xs12 style="margin-top:15px;">
                <v-btn color="error" @click="cancel">Cancel</v-btn>
                <v-btn color="info" @click="goBack">Back</v-btn>
                <v-btn color="success" class="btn-save" @click="onSave">Save</v-btn>
            </v-flex>
        </v-layout>
         <Alert :snackbar="snackbar" :y="y" :x="x" :timeout="timeout" :text="text"/>
    </div>
</template>

<script>
import Alert from "@/components/shared/Alert.vue"
import RecursiveComponent from "./RecursiveComponent.vue";
import draggable from "vuedraggable";
import Vue from 'vue';

export default {
    components: {
        Alert,
        RecursiveComponent,
        draggable
    },
    data() {
        return {
        snackbar: false,
        y: 'bottom',
        x: 'left',
        mode: '',
        timeout: 6000,
        text: 'Hello, I\'m a snackbar',
            myDeviceTypeProperties: [],
            myArray: [
                {
                    id: 404,
                    name: "Text Area",
                    type:'textarea',

                },
                {
                    id: 404,
                    name: "Input field",
                    type:'input'
                }
            ],
            dialog: false,
            checkbox: false,
            nameProperty: '',
            fieldId: null,
            properties: [],
            filterId:null,
            type:'',
            activeType: '',
            labelError: false,
            edit: false,
            save: false
        };
    },
    computed: {
        activeDeviceType() {
            return this.$store.getters.activeDeviceType;
        },
        deviceTypeName() {
            return this.$store.getters.getdeviceTypeName;
        },
        deviceTypesProperties() {
            return this.$store.getters.newDeviceTypeProperties;
        },
        selectedId() {
            return this.$store.getters.selectedDeviceTypeId;
        },
        deviceTypePropertyField() {
            return this.$store.getters.newDeviceTypeProperties[this.deviceTypesProperties.length - 1].properties;
        },
        activeDeviceTypeID() {
            return this.$store.getters.activeDeviceTypeID;
        },
        editMode() {
            return this.$store.getters.editMode;
        },
        numberOfProperties() {
            return this.properties.length;
        }

    },
    beforeDestroy(){
                  this.$store.commit('setNewDeviceTypeProperties',null)
                        this.$store.commit('setSelectedDeviceTypeId',null)


    },
    created() {
        if(this.editMode) {
            this.properties = this.deviceTypePropertyField;
            this.properties.forEach((property, i) => {             
                property.localID = i;
            });
        }
    },
    methods: {
        openModal(id, type){
            const check = this.properties.filter(property => property.localID === id);
            if(check.length !== 0) {
                this.edit = true;
                this.nameProperty = check[0].nameProperty;
                this.checkbox = check[0].required;
                this.fieldId = check[0].localID;
            } else {
                this.fieldId = this.properties.length;
            }
                this.type = type;
                this.dialog = true;
        },
        newModal(type){
            const localID = this.properties.length - 1;
            this.type = type;
            this.fieldId = localID;
            this.dialog = true;
        },
        saveFieldProperties() {
            if(this.edit) {
                this.properties[this.fieldId] = {
                    nameProperty: this.nameProperty,
                    required: this.checkbox,
                    type: this.type,
                    id: this.properties[this.fieldId].id,
                    localID: this.fieldId,
                    
                }
                return this.closeDialog();
            } 
            const properties = {
                nameProperty: this.nameProperty,
                required: this.checkbox,
                type: this.type,
                id: 0,
                localID: this.fieldId,
                deviceTypeId :this.activeDeviceType.id
               
            };
            this.properties.push(properties);
            let index = this.properties.findIndex(property => property.id === 404)
            this.properties.splice(index, 1);
            this.save = true;
            this.closeDialog();
        },
        deleteProperty(localID) {
            this.properties.splice(localID, 1);
            this.properties.forEach((property, i) => {
                property.localID = i;
            });
        },
        closeDialog() {
            if(this.nameProperty === '') {
                if(this.edit) {
                    this.nameProperty = '';
                    this.checkbox = false;
                    this.fieldId = null;
                    this.edit = false;
                    return this.dialog = false;
                } 
                let index = this.properties.findIndex(property => property.id === 404)
                this.properties.splice(index, 1);
            } else if(this.nameProperty && !this.edit && !this.save) {
                let index = this.properties.findIndex(property => property.id === 404)
                this.properties.splice(index, 1);
            }
            this.nameProperty = '';
            this.checkbox = false;
            this.fieldId = null;
            this.edit = false;
            this.save = false;
            this.dialog = false;
        },
        cancel() {
    this.$store.commit('setNewDeviceTypeProperties',null)
          this.$store.commit('setSelectedDeviceTypeId',null)
       this.$store.commit('setActiveDeviceType', null);

             this.$router.push('/')
        //   if(!this.editMode){
        //   // console.log(this.activeDeviceType.id)
        //  // this.$store.dispatch('deleteDeviceType',{id:this.activeDeviceType.id})
        //     //this.$router.push("/");
        //   }else{
        //    // this.$router.push("/");

        //   }
        },
        goBack() {
          //  this.$store.commit('setEditMode', true);
          this.$store.commit('setNewDeviceTypeProperties',null)
                this.$store.commit('setSelectedDeviceTypeId',null)

            this.$emit("clicked", "info");
        },
        onSave() {
            let idPar = 0
            let devicetypeid = 0
            if(this.editMode){
                idPar = this.selectedId
                console.log(idPar)
                devicetypeid = this.activeDeviceType.id
            }else {
                idPar = this.activeDeviceType.parentId
            }
            console.log(this.properties)
                //   console.log(this.activeDeviceType.id)

            this.properties.forEach(property => delete property.localID);
            const data = {
                name:this.activeDeviceType.name,
                description:this.activeDeviceType.description,
                parentId:idPar,
                properties: this.properties,
               id: devicetypeid
            };
            console.log(data)
            this.$store.dispatch('createNewDeviceType',data).then(()=>{
                this.$store.commit('setLoader', true);
                this.text = "New device type created"
                this.snackbar = true
                setTimeout(() => {
                    this.$router.push('/')
                    
                }, 500)
                this.$store.dispatch('getDeviceTypes')
                          this.$store.commit('setNewDeviceTypeProperties',null)
                this.$store.commit('setSelectedDeviceTypeId',null)
            })
            this.$store.commit('setLoader',false)
           
        }
    }
};
</script>

<style scoped>
#first{
  position:fixed;
  width:200px;
}
    button {
        width: 141px;
        height: 34px;
        color: #4a86e8;
        border: 1px solid #4a86e8;
        margin: auto 40px auto 0;
    }

    .btn-save {
        background-color: #4a86e8;
        color: white;
    }

    .buttons {
        height: 77px;
    }

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

    #labelError {
        color: rgb(189, 52, 52);
        font-size: 14px;
    }

    .newDevice {
        min-height: 120px;
    }

    .disabledField {      
        border: 1px solid black;
        background-color:lightgray;
    }
    .svgLinkBtn{
        width: 30px;
    }
</style>
