<template>
  <v-container grid-list-xs>
    <v-stepper v-model="tab">
      <v-stepper-header>
        <v-stepper-step :complete="tab==='builder'" step="1">
          <small>Step 1</small>
          Basic Info
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="tab==='completed'" step="2">
          <small>Step 2</small>
          Property Builder
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-content step="info">
        <type-basic-info @clicked="changeTab"></type-basic-info>
      </v-stepper-content>

      <v-stepper-content step="builder">
        <type-property-builder @clicked="changeTab" style="height:100%;"></type-property-builder>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import TypeBasicInfo from "@/components/DeviceType/TypeBasicInfo";
import TypePropertyBuilder from "@/components/DeviceType/TypePropertyBuilder";
import { store } from "@/store/store.js";

export default {
  components: {
    TypeBasicInfo,
    TypePropertyBuilder
  },
  data() {
    return {
      tab: "info",
      allowed: 1
    };
  },
  methods: {
    changeTab(value) {
      this.tab = value;
      return value;
    }
  }
};
</script>

<style scoped>
.nav-item:hover {
  cursor: pointer;
}
</style>
