<template>
  <v-container v-if="devices">
    <v-layout row wrap>
      <v-flex xs12 mb-5>
        <button type="button" class="btn btn-primary" @click="pushToNewDevice">New device</button>
      </v-flex>
    </v-layout>
    <v-data-table :headers="header" :items="devices" class="elevation-1" >
      <template v-slot:items="props">
        <template v-for="it in props.item.data.result">
          <tr :key="it.index">
            <td class="text-left">{{it.name}}</td>
            <td class="text-center">{{it.deviceTypeName}}</td>
            <td class="text-right">{{it.description}}</td>
          </tr>
        </template>
      </template>
    </v-data-table>
  </v-container>
</template>
          <script>
import {store} from '@/store/store'
export default {

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
  beforeRouteEnter(to,from,next) {
    store.dispatch("getDevices");
    next();
  },
  computed: {
    devices() {
      let arr = [];
      // return this.$store.getters.devices
      arr.push(this.$store.getters.devices);
      // console.log(arr)
      return arr;
    }
  },
  methods: {
    pushToNewDevice() {
      this.$router.push("/device");
    }
  }
};
</script>
<style></style>