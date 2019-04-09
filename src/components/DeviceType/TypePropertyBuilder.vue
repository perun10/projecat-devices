<template>
  <v-container grid-list-md>
    <v-layout row wrap grid-list-md text-xs-center>
      <!-- ZA REKURZIJU -->
      <v-flex xs8>
        <!-- <recursive-component v-if="deviceTypes" :device="deviceTypes"></recursive-component> -->

        <!-- ZA FLAT -->
        <!-- <div v-for="(item, index) in deviceTypes.children" :key="index" class="property">
                   <p class="propertyHeader">"{{ item.name }}" properties</p>
                   <p class="propertyDescription">{{ item.description }}</p>
                   <div v-for="(item, index) in item.properties" :key="index">
                       <div class="propertyBody">
                           <p>{{ item.nameProperty }} <span v-if="item.required" class="required">*</span></p>
                           <input type="text">
                       </div>
                   </div>
        </div>-->
        <div v-for="(item, index) in deviceTypesProperties" :key="index" class="property">
          <div>
            <p class="propertyHeader">"{{ item.name }}" properties</p>
            <p class="propertyDescription">{{ item.description }}</p>

            {{item.properties}}
            <draggable
              :list="item.properties"
              class="list-group"
              draggable=".item"
              group="a"
              v-if="item.name===deviceTypeName"
            >
              <div
                class="list-group-item item"
                v-for="(element,index2) in item.properties"
                :key="index2"
              >
                <label>{{index2}}</label>
                <component name="Raonic" :is="element.name" :id="element.name+index2"/>
                <v-btn color="success" class="btn-save" @click="onSave(index2,element.name+index2)">X</v-btn>
              </div>
            </draggable>
            <!-- <div v-for="(item, index) in item.properties" :key="index">
                       <div class="propertyBody">
                           <p>{{ item.nameProperty }} <span v-if="item.required" class="required">*</span></p>
                           <input type="text">
                       </div>
            </div>-->
          </div>
        </div>
    
      </v-flex>

      <v-flex xs4 class="border">
        <!-- <p>Fields</p>
        <p>Drag & drop or click to add</p>
        <p>Text</p>
        <p>Text Area</p>-->
            {{myArray}} 
        <draggable id="first" data-source="juju" :value="myArray" group="a">
          <div
            class="list-group-item item"
            v-for="(element,index3) in myArray"
            :key="index3"
          >{{ element.name }}</div>
        </draggable>
        {{myDeviceTypeProperties}}
      </v-flex>
    </v-layout>
    <v-layout row wrap grid-list-md text-xs-center>
      <v-flex xs12 style="margin-top:15px;">
        <v-btn color="error" @click="cancel">Cancel</v-btn>
        <v-btn color="info" @click="goBack">Back</v-btn>
        <v-btn color="success" class="btn-save">Save</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RecursiveComponent from "./RecursiveComponent.vue";
import draggable from "vuedraggable";
// console.log('Name'+)
import Vue from 'vue'
export default {
  components: {
    RecursiveComponent,
    draggable
  },
  computed: {
    deviceTypeName() {
      return this.$store.getters.getdeviceTypeName;
    },
    deviceTypesProperties() {
      return this.$store.getters.deviceTypesProperties;
    },
    properties() {
      this.deviceTypesProperties.forEach(item => {
        if (item.properties === null) {
          item.properties.push("test");
          return item.properties;
        }
      });
      return item.properties;
    },
    selectedId() {
      return this.$store.getters.selectedDeviceTypeId;
    }
  },
  // beforeCreate() {
  //     this.$store.dispatch('getDeviceProperties')
  // },
  methods: {
      onSave(id,value){
    //    console.log(Vue.options.components['Raonic'])
          var temp = document.getElementById(value).value
          console.log(id+'-'+temp)

      },
    adding(){
        this.myArray.push({ id: 5, name: "input" })
    }
      ,
    cancel() {
      this.$router.push("/");
    },
    goBack() {
      this.$emit("clicked", "info");
    }
  }
 
//   watch:{
//       myArray(value){
//             // console.log(value)
//             // this.myArray.push({name:value.name,id:value.id++})
//             this.myDeviceTypeProperties = value
//       },
//       myDeviceTypeProperties(){
//           this.myArray.push({id: 1, name: "input" })
//       }
//  }
 ,
  data() {
    return {
      myDeviceTypeProperties:[],
      myArray: [
        { id: 1, name: "textarea" },
        { id: 2, name: "input" },
        { id: 3, name: "img" }
      ],
      myArray2: [
        { id: 11, name: "Television Screen" },
        { id: 12, name: "Footer size" },
        { id: 13, name: "Weight" }
      ],
      myArray3: [],
      test: "test"
    };
  }
};
</script>

<style scoped>
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
