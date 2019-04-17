<template>
    <div>
      <DropDownTree
          :data-source="localDataSource"
          :data-text-field="['name']"
          :scheme-model-hasChildren="'children'"
          :scheme-model-children="'items'"
          v-model="comboBoxValue"          
          placeholder="Select parent type"      
          style="width: 300px;"
        ></DropDownTree>
   
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
  props: ["data"],
  components: {
    DropDownTree
  },
  data() {
    return {
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
  methods: {
    takeId(id) {
      console.log(id);
    },
    flatten(arr) {
      console.log(arr);
      var final = [];
      var self = this;
      arr.forEach(item => {
        final.push({ name: item.name, id: { id: item.id } });
        // console.log(item.name);
        if (typeof item.items !== "undefined") {
          final = final.concat(self.flatten(item.items));
          console.log(final)
        }
      });
      return final;
    }
  },
  computed: {
    flatted() {
      return this.flatten(this.localDataSource);
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
