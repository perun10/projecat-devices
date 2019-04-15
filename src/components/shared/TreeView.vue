<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout row wrap justify-space-between pl-5 pr-5>
        <h3>Name</h3>
        <h3>Description</h3>
      </v-layout>
      <!--  activatable :open-on-click="true"
       DA BI UZELI ID NA KLIK MORA SE SKLONINITI OPEN ON CLICK
      -->
      <v-treeview
      
        :items="data"
        :active.sync="value"
        :open-all="true"
        item-children="items"
        item-key="id"
        :hoverable="true"
        v-if="data"
      >
        <template v-slot:append="{item , active}">
          <p class="mr-3 mt-3">{{item.description}}</p>
          <div v-if="newDeviceType">
            <button type="button" class="btn btn-link" @click="onDelete(item)">Delete</button>
            <button type="button" class="btn btn-link" @click="onEdit(item)">Edit</button>
          </div>
          <div v-else>
            <button
              type="button"
              class="btn btn-link"
              @click="takeParent(item.id)"
            >Select device type</button>
          </div>
        </template>
      </v-treeview>
      <prompt :visible="dialogVisible" :activeDevType="activeDevType" @close="onClose"></prompt>
    </v-flex>
    <!-- <v-layout row wrap justify-space-around>
      <v-flex xs12>
          <v-btn color="error">Cancel</v-btn>
         <v-btn color="primary" @click="take1(value[0])">Next</v-btn>
      </v-flex>
    </v-layout>-->
  </v-layout>
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
      test: ""
    };
  },
  methods: {
    takeParent(id) {
      this.$store.commit("setDeviceTypeId", id);
    },
    onDelete(item) {
      this.dialogVisible = true;
      this.activeDevType = item;
    },
    onClose() {
      this.dialogVisible = false;
      this.activeDevType = null;
    },
    onEdit(item) {
      console.log(item);
      this.$store.commit("setActiveDeviceType", item);
      this.$store.commit("setEditMode", true);
      // console.log(this.$store.getters.activeDeviceType, "act");
      this.$router.push("/new-device-type");
    },
    take1(id) {
      console.log(id);
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
