<template>
  <div>
    <!-- <select v-for="item in flatted" :key="item.id">
    <option>{{item.name}}</option>
    </select>-->
    <DropDownTree :data-source="flatted" :data-text-field="['name']" @change="onChange" :placeholder="'Select device type parent...'"  style="width: 300px;"></DropDownTree>
    {{selectedDeviceTypeId}}
    <!-- 
    <BasicSelect v-for="(child, index) in data.children"
            :data="child"
    :key="index"/>-->
    <!-- <v-select :items="flatted" :item-value="flatted" :placeholder="flatted.name"></v-select> -->
    <!-- <select v-model="test">
<option v-for="flat in flatted" :key="flat.id" :value="flat.id">{{flat.name}}</option>
    </select>-->
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
      selectedDeviceTypeId: 0,
      test: "Racunar",
      localDataSource: new kendo.data.HierarchicalDataSource({
        data: this.data
      })
    };
  },
  methods: {
    takeId(id) {
      console.log(id);
    },
    flatten(items) {
      var final = [];
      var self = this;
      items.forEach(item => {
        final.push({ name: item.name, id: { id: item.id } });
        // console.log(item.name);
        if (typeof item.children !== "undefined") {
          final = final.concat(self.flatten(item.children));
        }
      });
      return final;
    },
    onChange: function(ev) {
      this.selectedDeviceTypeId = ev.sender._values[0].id.id;
      console.log(this.selectedDeviceTypeId);
    }
  },
  computed: {
    flatted() {
      return this.flatten(this.data);
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
