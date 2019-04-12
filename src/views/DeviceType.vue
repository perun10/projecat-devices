<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 mb-5>
        <button type="button" class="btn btn-primary" @click="pushToNewDeviceType">New device type</button>
      </v-flex>
    </v-layout>
    <treeview :data="deviceTypes"/>

  </v-container>
</template>
<style>
.v-treeview{
  border: 1px solid grey;
  /* border-bottom: none; */
}
.v-treeview-node{
    /* margin-left: 0; */

}
</style>

<script>

import treeview from '@/components/shared/TreeView.vue'
export default {
  components:{
    treeview,
  
  },
  data() {
    return {
       
      active: "",
      itemKey: [],
      value: [],
      header: [
        {
          text: "Name",
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: "Type",
          align: "center",
          sortable: true,
          value: "type"
        },
        {
          text: "Description",
          align: "right",
          sortable: false,
          value: "description"
        }
      ]
    };
  },
  beforeCreate() {
    this.$store.dispatch("getDeviceTypes");
    // this.$store.dispatch('getDevices')
  },
  created() {
    // console.log(this.deviceTypes);
  },
  methods: {
    pushToNewDeviceType() {
      this.$router.push("/new-device-type");
    }
  },
  computed: {
    deviceTypes() {
      return this.$store.getters.deviceTypes;
    }
  }
};
</script>
