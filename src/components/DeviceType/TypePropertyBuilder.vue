<template>
  <div>
    <v-layout row wrap grid-list-xs text-xs-center>
      <!-- ZA REKURZIJU -->
      <v-flex xs8>
        <div
          v-for="(item, index) in deviceTypesProperties"
          :key="index"
          class="property"
          style="min-height:120px;"
        >
          <div>
            <p class="propertyHeader">"{{ item.name }}" properties</p>
            <draggable
              
              :list="item.properties"
              class="list-group"
              draggable=".item"
              group="a"
              v-if="item.name === deviceTypeName"
              @change="newModal(activeType)"
            >
              <div
                class="list-group-item item"
                v-for="(element,index2) in item.properties"
                :key="index2"
              >
              <v-layout row wrap justify-center>
               <v-flex xs6>
                   <p v-if="properties[index2]" class="text-xs-right">
                  {{ properties[index2].nameProperty }}
                  <span v-if="properties[index2].required" class="required">*</span> 
                </p> 
               </v-flex> 
               <v-flex xs6>
                   <a class="svgModal" @click="openModal(index2,element.type)">
                  <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 478.703 478.703"
                    style="enable-background:new 0 0 478.703 478.703;"
                    xml:space="preserve"
                  >
                    <path
                      d="M454.2,189.101l-33.6-5.7c-3.5-11.3-8-22.2-13.5-32.6l19.8-27.7c8.4-11.8,7.1-27.9-3.2-38.1l-29.8-29.8
			c-5.6-5.6-13-8.7-20.9-8.7c-6.2,0-12.1,1.9-17.1,5.5l-27.8,19.8c-10.8-5.7-22.1-10.4-33.8-13.9l-5.6-33.2
			c-2.4-14.3-14.7-24.7-29.2-24.7h-42.1c-14.5,0-26.8,10.4-29.2,24.7l-5.8,34c-11.2,3.5-22.1,8.1-32.5,13.7l-27.5-19.8
			c-5-3.6-11-5.5-17.2-5.5c-7.9,0-15.4,3.1-20.9,8.7l-29.9,29.8c-10.2,10.2-11.6,26.3-3.2,38.1l20,28.1
			c-5.5,10.5-9.9,21.4-13.3,32.7l-33.2,5.6c-14.3,2.4-24.7,14.7-24.7,29.2v42.1c0,14.5,10.4,26.8,24.7,29.2l34,5.8
			c3.5,11.2,8.1,22.1,13.7,32.5l-19.7,27.4c-8.4,11.8-7.1,27.9,3.2,38.1l29.8,29.8c5.6,5.6,13,8.7,20.9,8.7c6.2,0,12.1-1.9,17.1-5.5
			l28.1-20c10.1,5.3,20.7,9.6,31.6,13l5.6,33.6c2.4,14.3,14.7,24.7,29.2,24.7h42.2c14.5,0,26.8-10.4,29.2-24.7l5.7-33.6
			c11.3-3.5,22.2-8,32.6-13.5l27.7,19.8c5,3.6,11,5.5,17.2,5.5l0,0c7.9,0,15.3-3.1,20.9-8.7l29.8-29.8c10.2-10.2,11.6-26.3,3.2-38.1
			l-19.8-27.8c5.5-10.5,10.1-21.4,13.5-32.6l33.6-5.6c14.3-2.4,24.7-14.7,24.7-29.2v-42.1
			C478.9,203.801,468.5,191.501,454.2,189.101z M451.9,260.401c0,1.3-0.9,2.4-2.2,2.6l-42,7c-5.3,0.9-9.5,4.8-10.8,9.9
			c-3.8,14.7-9.6,28.8-17.4,41.9c-2.7,4.6-2.5,10.3,0.6,14.7l24.7,34.8c0.7,1,0.6,2.5-0.3,3.4l-29.8,29.8c-0.7,0.7-1.4,0.8-1.9,0.8
			c-0.6,0-1.1-0.2-1.5-0.5l-34.7-24.7c-4.3-3.1-10.1-3.3-14.7-0.6c-13.1,7.8-27.2,13.6-41.9,17.4c-5.2,1.3-9.1,5.6-9.9,10.8l-7.1,42
			c-0.2,1.3-1.3,2.2-2.6,2.2h-42.1c-1.3,0-2.4-0.9-2.6-2.2l-7-42c-0.9-5.3-4.8-9.5-9.9-10.8c-14.3-3.7-28.1-9.4-41-16.8
			c-2.1-1.2-4.5-1.8-6.8-1.8c-2.7,0-5.5,0.8-7.8,2.5l-35,24.9c-0.5,0.3-1,0.5-1.5,0.5c-0.4,0-1.2-0.1-1.9-0.8l-29.8-29.8
			c-0.9-0.9-1-2.3-0.3-3.4l24.6-34.5c3.1-4.4,3.3-10.2,0.6-14.8c-7.8-13-13.8-27.1-17.6-41.8c-1.4-5.1-5.6-9-10.8-9.9l-42.3-7.2
			c-1.3-0.2-2.2-1.3-2.2-2.6v-42.1c0-1.3,0.9-2.4,2.2-2.6l41.7-7c5.3-0.9,9.6-4.8,10.9-10c3.7-14.7,9.4-28.9,17.1-42
			c2.7-4.6,2.4-10.3-0.7-14.6l-24.9-35c-0.7-1-0.6-2.5,0.3-3.4l29.8-29.8c0.7-0.7,1.4-0.8,1.9-0.8c0.6,0,1.1,0.2,1.5,0.5l34.5,24.6
			c4.4,3.1,10.2,3.3,14.8,0.6c13-7.8,27.1-13.8,41.8-17.6c5.1-1.4,9-5.6,9.9-10.8l7.2-42.3c0.2-1.3,1.3-2.2,2.6-2.2h42.1
			c1.3,0,2.4,0.9,2.6,2.2l7,41.7c0.9,5.3,4.8,9.6,10,10.9c15.1,3.8,29.5,9.7,42.9,17.6c4.6,2.7,10.3,2.5,14.7-0.6l34.5-24.8
			c0.5-0.3,1-0.5,1.5-0.5c0.4,0,1.2,0.1,1.9,0.8l29.8,29.8c0.9,0.9,1,2.3,0.3,3.4l-24.7,34.7c-3.1,4.3-3.3,10.1-0.6,14.7
			c7.8,13.1,13.6,27.2,17.4,41.9c1.3,5.2,5.6,9.1,10.8,9.9l42,7.1c1.3,0.2,2.2,1.3,2.2,2.6v42.1H451.9z"
                    ></path>
                    <path
                      d="M239.4,136.001c-57,0-103.3,46.3-103.3,103.3s46.3,103.3,103.3,103.3s103.3-46.3,103.3-103.3S296.4,136.001,239.4,136.001
			z M239.4,315.601c-42.1,0-76.3-34.2-76.3-76.3s34.2-76.3,76.3-76.3s76.3,34.2,76.3,76.3S281.5,315.601,239.4,315.601z"
                    ></path>
                  </svg>
                </a>
               </v-flex>    
                 
              </v-layout>
              <v-layout row wrap>
                  <v-flex xs9>
                <component :is="element.type" :id="element.type+index2"/>
                      
                  </v-flex>
                  <v-flex xs3>
                       <a class="text-xs-right"
                  style="width:20px;font-size:20px;"
                  @click="deleteProperty(item.properties, index2)"
                >X</a>
                  </v-flex>
              </v-layout>
               
              

               
              </div>
            </draggable>
            <div v-if="item.name !== deviceTypeName">
              <div v-for="(itemProperty, index) in item.properties" :key="index">
                <div class="propertyBody">
                  <!-- <p v-if="properties[index]">{{ properties[index].nameProperty }} <span v-if="properties[index].required" class="required">*</span></p> -->
                  <p>
                    {{itemProperty.nameProperty}}
                    <span v-if="itemProperty.required" class="required">*</span>
                  </p>
                  <component :is="itemProperty.type" disabled/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-flex>

      <!-- modal -->

      <v-flex xs4 class="border">
        <draggable id="first" data-source="juju" :value="myArray" group="a">
          <div
            @mousedown="activeType = element.type"
            class="list-group-item item"
            v-for="(element,index3) in myArray"
            :key="index3"
          >
            <p>{{ element.name }}</p>
          </div>
        </draggable>
      </v-flex>

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
              <v-btn color="blue darken-1" flat @click="saveFieldProperties" v-if="nameProperty.length>=3">Save</v-btn>
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
  </div>
</template>

<script>
import RecursiveComponent from "./RecursiveComponent.vue";
import draggable from "vuedraggable";
import Vue from "vue";

export default {
  components: {
    RecursiveComponent,
    draggable
  },
  data() {
    return {
      myDeviceTypeProperties: [],
      myArray: [
        {
          id: 1,
          name: "Text Area",
          type: "textarea"
        },
        {
          id: 2,
          name: "Input field",
          type: "input"
        }
      ],
      dialog: false,
      checkbox: false,
      nameProperty: "",
      fieldId: null,
      properties: [],
      filterId: null,
      type: "",
      activeType: "",
      labelError: false
    };
  },
  computed: {
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
      return this.$store.getters.newDeviceTypeProperties[
        this.deviceTypesProperties.length - 1
      ].properties;
    },
    activeDeviceTypeID() {
      return this.$store.getters.activeDeviceTypeID;
    }
  },

  methods: {
    openModal(id, type) {
      const check = this.properties.filter(property => property.id === id);
      if (check.length !== 0) {
        this.editMode = true;
        this.nameProperty = check[0].nameProperty;
        this.checkbox = check[0].required;
        this.fieldId = check[0].id;
      }
      this.type = type;
      this.fieldId = id;
      this.dialog = true;
    },
    newModal(type) {
      const id = this.properties.length;
      this.type = type;
      this.fieldId = id;
      this.dialog = true;
    },
    saveFieldProperties() {
      if (this.editMode) {
        this.properties[this.fieldId] = {
          nameProperty: this.nameProperty,
          required: this.checkbox,
          type: this.type,
          id: this.fieldId
        };
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
    deleteProperty(arr, id) {
      this.properties.splice(id, 1);
      this.properties.forEach((property, i) => {
        property.id = i;
      });
      arr.splice(id, 1);
    },
    closeDialog() {
      if (this.nameProperty === "") {
        this.deviceTypePropertyField.splice(this.properties.length, 1);
      }
      this.nameProperty = "";
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
        id: this.activeDeviceTypeID
      };
      this.axios
        .post(
          "http://localhost:21021/api/services/app/DeviceTypeService/CreateOrUpdateProperties",
          data
        )
        .then(
            // response => console.log(response)
            );
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.svgModal svg {
  fill: #4a86e8;
  height: 20px;
  max-width: 20px;
}
#first {
  position: fixed;
  width: 200px;
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
textarea{
    border:1px solid black;
    width: 250px;
}
</style>
