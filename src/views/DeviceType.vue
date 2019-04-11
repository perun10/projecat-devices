<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 mb-5>
        <button type="button" class="btn btn-primary" @click="pushToNewDeviceType">New device type</button>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout :justify-space-between="true">
          <h3>Name</h3>
          <h3>Description</h3>
        </v-layout>
        <v-treeview
          :items="deviceTypes"
          v-model="value"
          :open-all="true"
          item-children='items'
          style="border:1px solid black;"
          class="border"
          v-if="deviceTypes"
        >
          <template v-slot:append="{item , active}" class="text-center">
            <p class="mr-3 mt-3">{{item.description}}</p>
            <button type="button" class="btn btn-link" @click="onDelete(item.id)">Delete</button>
            <button type="button" class="btn btn-link">Edit</button>
          </template>
        </v-treeview>
      </v-flex>
      <v-flex></v-flex>
    </v-layout>
  </v-container>
</template>
<style>
.v-treeview-node__root {
  border: 1px solid grey;
}
</style>

<script>
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
      ],
      arryData:[

        
    {
      "id": 1,
      "name": "RACUNAR 1",
      "parentid": null,
      "description": "RACUNAR PARENT 1",      
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
  beforeCreate() {
    this.$store.dispatch("getDeviceTypes");
    // this.$store.dispatch('getDevices')
  },
  created() {
    console.log(this.deviceTypes);
  },
  methods: {
    pushToNewDeviceType() {
      this.$router.push("/new-device-type");
    },
    pushToNewDevice() {
      this.$router.push("/device");
    },
    onDelete(id) {
      this.$store.dispatch("deleteDeviceType", { id: id });
    }
  },
  computed: {
    deviceTypes() {
      return this.$store.getters.deviceTypes;
    }
  }
};
</script>
