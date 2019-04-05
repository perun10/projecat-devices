<template>
  <v-tabs v-model="active" color="grey" dark slider-color="yellow" :centered="true">
    <v-tab>Device Types</v-tab>
    <v-tab>Devices</v-tab>
    <v-tab-item>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 mb-5>
            <button
              type="button"
              class="btn btn-primary"
              @click="pushToNewDeviceType"
            >New device type</button>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout :justify-space-between="true">
              <h3>Name</h3>
              <h3>Description</h3>
            </v-layout>
            <v-treeview
              :items="items"
              v-model="value"
              :open-all="true"
              style="border:1px solid black;"
              class="border"
            >
              <template v-slot:append="{item , active}" class="text-center">
                <p class="mr-3 mt-3">{{item.description}}</p>
                <button type="button" class="btn btn-link" v-if="item.id!=1">Delete</button>
                <button type="button" class="btn btn-link">Edit</button>
              </template>
            </v-treeview>
          </v-flex>
          <v-flex></v-flex>
        </v-layout>
      </v-container>
    </v-tab-item>
    <v-tab-item>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 mb-5>
            <button type="button" class="btn btn-primary" @click="pushToNewDevice">New device</button>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <template>
              <v-data-table :headers="header" :items="devices" class="elevation-1">
                <template v-slot:items="props">
                  <td>{{props.item.name}}</td>
                  <td class="text-xs-center">{{props.item.deviceType}}</td>
                  <td class="text-xs-right">{{props.item.description}}</td>
                </template>
              </v-data-table>
            </template>
          </v-flex>
        </v-layout>
      </v-container>
    </v-tab-item>
  </v-tabs>
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
      devices: [
        {
          id: 1,
          name: "Device 1",
          deviceType: "Racunar",
          description: "Ovo je device 1"
        },
        {
          id: 2,
          name: "Device 2",
          deviceType: "Laptop",
          description: "Ovo je device 2"
        },
        {
          id: 3,
          name: "Device 3",
          deviceType: "Standard Laptop",
          description: "Ovo je device 3"
        },
        {
          id: 4,
          name: "Device 4",
          deviceType: "Desktop",
          description: "Ovo je device 4"
        },
        {
          id: 5,
          name: "Device 5",
          deviceType: "ULTRA - BOOK",
          description: "Ovo je device 5"
        },
        {
          id: 6,
          name: "Device 6",
          deviceType: "Air Book",
          description: "Ovo je device 6"
        },
        {
          id: 7,
          name: "Device 7",
          deviceType: "Laptop",
          description: "Ovo je device 7"
        },
        {
          id: 8,
          name: "Device 8",
          deviceType: "Server",
          description: "Ovo je device 8"
        }
      ],
      items: [
        {
          id: 1,
          name: "RACUNAR",
          parentid: null,
          description: "RACUNAR PARENT 0",
          properties: [
            {
              nameProperty: "cpu",
              required: true,
              type: "Text"
            },
            {
              nameProperty: "ram",
              required: false,
              type: "Text"
            }
          ],
          children: [
            {
              id: 2,
              name: "LAPTOP",
              parentid: 1,
              description: "Basic Laptop",
              properties: [
                {
                  nameProperty: "touchpad",
                  required: false,
                  type: "Text"
                }
              ],
              children: [
                {
                  id: 3,
                  name: "ULTRA - LAPTOP",
                  parentid: 2,
                  description: "ULTRA LAGAN",
                  properties: [
                    {
                      nameProperty: "weight",
                      required: true,
                      type: "Text"
                    }
                  ],
                  children: [
                    {
                      id: 4,
                      name: "Air Book",
                      parentid: 3,
                      description: "Microsoft Air Book",
                      properties: [
                        {
                          nameProperty: "size",
                          required: true,
                          type: "input"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 7,
                  name: "Standard Laptop",
                  parentid: 2,
                  description: "Standardni laptop",
                  properties: [
                    {
                      nameProperty: "price",
                      required: true,
                      type: "Text"
                    }
                  ]
                }
              ]
            },
            {
              id: 5,
              name: "Desktop",
              parentid: 1,
              description: "Home desktop PC",
              properties: [
                {
                  nameProperty: "Case",
                  required: true,
                  type: "Label"
                }
              ]
            },
            {
              id: 6,
              name: "Server",
              parentid: 1,
              description: "Server Firewall",
              properties: [
                {
                  nameProperty: "Housing",
                  required: true,
                  type: "Label"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    pushToNewDeviceType() {
      this.$router.push("/device-type");
    },
    pushToNewDevice() {
      this.$router.push("/device");
    }
  }
};
</script>
