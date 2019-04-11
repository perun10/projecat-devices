<template>
  <v-app>
    <v-toolbar color="white">
      <v-toolbar-items style="margin:0 auto;">
        <v-btn flat to="/">Device Type</v-btn>
        <v-btn flat to="/devices">Devices</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NewDeviceType from "@/components/DeviceType/NewDeviceType";
import DeviceType from "@/views/DeviceType.vue";
import NewDevice from "@/components/NewDevice/NewDevice";
export default {
  name: "App",
  components: {
    NewDeviceType,
    DeviceType,
    NewDevice
  },
  data() {
    return {
      //
    };
  }
};
</script>
<style>
/* @import '~vuetify/src/stylus/main'; */
</style>
