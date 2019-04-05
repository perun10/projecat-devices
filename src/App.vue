<template>
      <router-view></router-view>
</template>

<script>
import NewDeviceType from "@/components/DeviceType/NewDeviceType";

export default {
  name: 'App',
  components: {
      NewDeviceType
  },
  data () {
    return {
      //
    }
  }
}
</script>
<style>
/* @import '~vuetify/src/stylus/main'; */

</style>
