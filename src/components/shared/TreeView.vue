<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>

        <v-layout row wrap justify-center v-if="editDeviceMode">
            <h3>Editing Device: {{ activeDevice.name }}</h3>
        </v-layout>   


        <v-layout row wrap justify-space-between>
          <h3>Name</h3>
          <h3>Description</h3>
        </v-layout>   

        <!-- za DEVICE TYPE -->   
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

        <!-- za DEVICE -->
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
          <template v-slot:append="{item, active}">
            <!-- <p>{{item.id}}</p> -->
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
{{activeDevice}}
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
    beforeDestroy() {
        console.log(this.value)
    },
    data() {
        return {
            dialogVisible: false,
            activeDevType: [],
            value: [],
            mode: ""
        };
    },
    created() {
        if(this.editDeviceMode) {
            this.value.push(this.$store.getters.deviceParentID);
        }
    },
    computed: {
        editDeviceMode() {
            return this.$store.getters.editDeviceMode;
        },
        deviceParentID() {
            return this.$store.getters.deviceParentID;
        },
        activeDevice() {
            return this.$store.getters.activeDevice;
        }
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
            this.$store.commit("setActiveDeviceType", item);
            this.$store.commit("setEditMode", true);
            this.$router.push("/new-device-type");
        },
        async onNext(typeID) {
            if(!this.editDeviceMode) {
                this.$store.dispatch("getDeviceTypeProperties", typeID);
            } else {
                await this.$store.dispatch('getDeviceTypePropertiesEditMode',
                    {
                        deviceId: this.activeDevice.id,
                        deviceTypeId: typeID
                    });
            }
            await this.$store.commit("setDeviceTypeId", typeID);
            this.$store.commit("setTabLocation", "newProperties");
        },
        pushtoDevices() {
            this.$store.commit('setEditDeviceMode', false);
            this.$store.commit('setActiveDevice', []);
            this.$router.push("/devices");
        }
    }
};
</script>

<style>

</style>
