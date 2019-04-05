<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Home from "@/views/Home";
import NewDevice from "@/components/NewDevice/NewDevice";
export default {
  name: "App",
  components: {
    Home,
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
