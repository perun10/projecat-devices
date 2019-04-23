<template>
    <div>
      <label for="dropdown" style="display:block;">Parent device type <span style="color:red;">*</span></label>
      <DropDownTree
          :data-source="localDataSource"
          :data-text-field="['name']"
          :scheme-model-hasChildren="'children'"
          :scheme-model-children="'items'"   
          :placeholder="value"
          v-model="comboBoxValue"                
          style="width:100%;"
        ></DropDownTree>
     <!-- {{model}} -->
    </div>
</template>

<script>
import "@progress/kendo-ui";
import "@progress/kendo-theme-default/dist/all.css";
import {
  DropDownTree,
  DropDownTreeInstaller
} from "@progress/kendo-dropdowntree-vue-wrapper";
export default {
  name: "BasicSelect",
  props: ['data','model'],
  components: {
    DropDownTree
  },
  data() {
    return {             
        value:"Device type",
        localDataSource: new kendo.data.HierarchicalDataSource({
        data : this.data
      }),
      comboBoxValue:'',
      selectedDeviceTypeId: 0,
      test: "children",    
      arryData:[

        
    {
      "id": 1,
      "name": "RACUNAR 1",
      "parentid": null,
      "description": "RACUNAR PARENT 0",      
      "items": [
        {
          "id": 2,
          "name": "LAPTOP",
          "parentid": 1,
          "description": "Basic Laptop",
         
        }

      ]
        },
        {
          "id": 3,
      "name": "Namjestaj 1",
      "parentid": null,
      "description": "RACUNAR PARENT 0",      
      "items":[
        {
          "id": 5,
          "name": "LAPTOP 3 ",
          "parentid": 3,
          "description": "Basic Laptop",
        }
      ]
        }
      ]
      
    };
  },
  mounted(){
    if(this.editMode){
     // console.log(this.flatted)
     var element = 0;
      const arr = this.flatted
      this.value = this.model // placeholder
      this.placeholder = this.model
      // arr.forEach(dat => {    
      //     if(dat.name === this.model){
      //       element = dat;
      //       return
      //     }
      // });
      //   console.log(element)
      //   this.comboBoxValue = element.name
      //   let arrt = []
  //       arrt.push(element)
  // this.localDataSource.remove(element)
    }
  },
  methods: {
    
    takeId(id) {
     // console.log(id);
    },
    flatten(arr) {
     // console.log(arr);
      var final = [];
      var self = this;
      arr.forEach(item => {
        final.push({ name: item.name, id: { id: item.id } });
        // console.log(item.name);
        if (typeof item.items !== "undefined") {
          final = final.concat(self.flatten(item.items));
        //  console.log(final)
        }
      });
      return final;
    },
        onDataBound: function (ev) {
            console.log("Event :: data");
        }
  },
  computed: {
    flatted() {
      return this.flatten(this.data);
    },
    editMode() {
            return this.$store.getters.editMode;
        }
  },
  watch: {
    test(value) {
      console.log(value);
    },
    comboBoxValue(value){
      if(value){
     this.$store.commit('setSelectedDeviceTypeId',value.id)
    }else{      
      this.$store.commit('setSelectedDeviceTypeId',null)
    }
  }
  }
};
</script>

<style>
option ::after {
  content: " ";
}
</style>
