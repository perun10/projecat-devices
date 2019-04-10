<template>
    <v-container grid-list-md>
        <v-layout row wrap grid-list-md text-xs-center>
            <!-- ZA REKURZIJU -->
            <v-flex xs8>             
                <div v-for="(item, index) in deviceTypesProperties" :key="index" class="property">
                    <div>
                      <p>{{item.id}}</p>
                        <p class="propertyHeader">"{{ item.name }}" properties</p>
                        <p class="propertyDescription">{{ item.description }}</p>
                        
                        <draggable
                            :list="item.properties"
                            class="list-group"
                            draggable=".item"
                            group="a"
                            v-if="item.name === deviceTypeName">
                            <div
                                class="list-group-item item"
                                v-for="(element,index2) in item.properties"
                                :key="index2"
                            >
                                 <p v-if="properties[index2]">{{ properties[index2].nameProperty }} <span v-if="properties[index2].required" class="required">*</span></p>
                                <component :is="element.type" :id="element.type+index2"/>                                
                                <v-btn color="success" class="btn-save" @click="openModal(index2,element.type,item.id)">X</v-btn>
                                <v-btn color="red" class="btn-save" @click="deleteProperty(item.properties,index2)">X</v-btn>
                            </div>
                        </draggable>
                         <div v-for="(itemProperty, index) in item.properties" :key="index"  v-if="item.name !== deviceTypeName">
                            <div class="propertyBody">
                                <!-- <p v-if="properties[index]">{{ properties[index].nameProperty }} <span v-if="properties[index].required" class="required">*</span></p> -->
                               <p>{{itemProperty.nameProperty}} <span v-if="itemProperty.required" class="required">*</span></p> 
                               <component :is="itemProperty.type"/>
                            </div> 
                        </div>
                    </div>
                </div>
            </v-flex>
                <!-- modal -->
                <template>
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
                                    <v-btn color="blue darken-1" flat @click="saveFieldProperties">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-layout>
                </template>
            <v-flex xs4 class="border">
                <draggable id="first" data-source="juju" :value="myArray" group="a">
                    <div
                        class="list-group-item item"
                        v-for="(element,index3) in myArray"
                        :key="index3"
                    >{{ element.name }}
                    </div>
                </draggable>
            </v-flex>
        </v-layout>
        <v-layout row wrap grid-list-md text-xs-center>
            <v-flex xs12 style="margin-top:15px;">
                <v-btn color="error" @click="cancel">Cancel</v-btn>
                <v-btn color="info" @click="goBack">Back</v-btn>
                <v-btn color="success" class="btn-save" @click="onSave">Save</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import RecursiveComponent from "./RecursiveComponent.vue";
import draggable from "vuedraggable";
import Vue from 'vue';

export default {
    components: {
        RecursiveComponent,
        draggable
    },
    data() {
        return {
            myDeviceTypeProperties: [],
            myArray: [
                { id: 1, name: "Text Area" , type:'textarea'},
                { id: 2, name: "Input field",type:'input' }
            ],
            dialog: false,
            checkbox: false,
            nameProperty: '',
            fieldId: null,
            properties: [],
            filterId:null,
            type:'',
            activeItemId:'',
        };
    },
    computed: {
        deviceTypeName() {
            return this.$store.getters.getdeviceTypeName;
        },
        deviceTypesProperties() {
            return this.$store.getters.newDeviceTypeProperties;
        }
        // ,
        // propertiesComputed() {
        //     this.newDeviceTypeProperties.forEach(item => {
        //         if (item.properties === null) {
        //         item.properties.push("test");
        //         return item.properties;
        //         }
        //     });
        //     return item.properties;
        // }
        ,
        selectedId() {
            return this.$store.getters.selectedDeviceTypeId;
        }
    },
    methods: {
        openModal(id,type,itemID){
            const check = this.properties.filter(property => property.id === id);
            if(check.length !== 0) {
                this.editMode = true;
                this.nameProperty = check[0].nameProperty;
                this.checkbox = check[0].required;
                this.fieldId = check[0].id;
            }
            this.activeItemId = itemID
            this.type = type
            this.fieldId = id;
            this.dialog = true;
        },
        saveFieldProperties() {
            if(this.editMode) {
                this.properties[this.fieldId] = {
                    nameProperty: this.nameProperty,
                    required: this.checkbox,
                    type: this.type,
                    id: this.fieldId
                }
                return this.closeDialog();
            } 
            const properties = {
                nameProperty: this.nameProperty,
                required: this.checkbox,
                type: this.type,
                id: this.fieldId
            };
            this.properties.push(properties);
            
            this.closeDialog();
            
        },
        // brise samo iz arraya
        deleteProperty(arr , id) {
            this.properties.splice(id, 1);
            arr.splice(id, 1);
        
        },
        closeDialog() {
           this.nameProperty = '';
            this.checkbox = false;
            this.fieldId = null;
            this.editMode = false;
            this.dialog = false;
        },
        cancel() {
            this.$router.push("/");
        },
        goBack() {
            this.$emit("clicked", "info");
        },
        onSave() {
            const data = {
                properties: this.properties,
                // da se sredi, sacuvati id koji dobijemo na NEXT
                id: this.activeItemId
            }
            this.axios.put('http://localhost:21021/api/services/app/DeviceTypeService/UpdateDeviceTypeProperties', data)
                .then(response => console.log(response));
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
#first{
  position:fixed;
  width:300px;
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
</style>
