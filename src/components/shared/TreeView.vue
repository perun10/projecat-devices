<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap justify-space-between pl-5 pr-5>
          <h3>Name</h3>
          <h3>Description</h3>
        </v-layout>
        <!--  activatable :open-on-click="true"
       DA BI UZELI ID NA KLIK MORA SE SKLONINITI OPEN ON CLICK
        -->
        <!-- {{value}} -->
        <v-treeview
          :items="data"
          :open-all="true"
          item-children="items"
          item-key="id"
          :hoverable="true"
          v-if="newDeviceType"
        >
          <template v-slot:append="{item , active}">
            <p class="mr-3 mt-3">{{item.description}}</p>
            <div v-if="newDeviceType">
              <button type="button" class="btn btn-link" @click="onDelete(item)">Delete</button>
              <button type="button" class="btn btn-link" @click="onEdit(item)">Edit</button>
            </div>
          </template>
        </v-treeview>
        <v-treeview
          activatable
          :items="data"
          :active.sync="value"
          :open-all="true"
          item-children="items"
          item-key="id"
          :hoverable="true"
          v-else
        >
          <template v-slot:append="{item , active}">
            <p class="mr-3 mt-3">{{item.description}}</p>
           
          </template>
        </v-treeview>
      <prompt :visible="dialogVisible" :activeDevType="activeDevType" :mode="mode" @close="onClose"></prompt>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center v-if="!newDeviceType">
      <v-btn color="error" @click="pushtoDevices">Cancel</v-btn>
      <v-btn color="primary" @click="onNext(value[0])">Next</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import Prompt from "@/components/shared/Prompt";

export default {
  components: {
    Prompt
  },
  props: {
    data: {
      type: Array
    },
    newDeviceType: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      activeDevType: [],
      value: [],
      mode: ""

    };
  },
  methods: {
    takeParent(id) {
      this.$store.commit("setDeviceTypeId", id);
    },
    onDelete(item) {
      this.mode = 'deleteDeviceType'
      this.dialogVisible = true;
      this.activeDevType = item;
    },
    onClose() {
      this.mode = ''
      this.dialogVisible = false;
      this.activeDevType = null;
    },
    onEdit(item) {
      // console.log(item);
      this.$store.commit("setActiveDeviceType", item);
      this.$store.commit("setEditMode", true);
      // console.log(this.$store.getters.activeDeviceType, "act");
      this.$router.push("/new-device-type");
    },
    onNext(id) {
      console.log(id);
      this.$store.dispatch("getDeviceTypeProperties", id);
      this.$store.commit("setTabLocation", "newProperties");
      this.$store.commit("setDeviceTypeId", id);
      //  newProperties new tab location
    },
    pushtoDevices() {
      this.$router.push("/devices");
    }
  }
};
</script>

<style>
/* .v-treeview-node{
  border-bottom: 1px solid black;
}
.v-treeview-node__children{
  border-top:1px solid black;
  border-bottom: 1px solid black;
}
.v-treeview-node :last-child{
  border-bottom: none;
} */
</style>
