<template>
    <div>
      <DropDownTree
          :data-source="data"
          :data-text-field="['name']"
          :scheme-model-hasChildren="'children'"
          :scheme-model-children="'items'"
          @change="onChange"
          :placeholder="placeholder"
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
  props: ["data", "placeholder"],
  components: {
    DropDownTree
  },
  data() {
    return {
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
      // console.log(this.localDataSource.data()[0]._childrenOptions[0].name)
      // console.log(this.data)
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
    },
    onChange: function(ev) {
      this.selectedDeviceTypeId = ev.sender._values[0].id;
      console.log(this.selectedDeviceTypeId)
      this.$store.commit("setSelectedDeviceTypeId", this.selectedDeviceTypeId);
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
    }
  }
};
</script>

<style>
option ::after {
  content: " ";
}
</style>
