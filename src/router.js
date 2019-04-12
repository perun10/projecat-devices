import Vue from "vue";
import Router from "vue-router";
import DeviceType from "./views/DeviceType.vue";
import Devices from "./views/Devices.vue";
import NewDeviceType from "@/components/DeviceType/NewDeviceType.vue";
import NewDevice from "@/components/NewDevice/NewDevice.vue"
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "device-type",
      component: DeviceType
    },

    {
      path:'/devices',
      name:'devices',
      component:Devices
    },
    {

      path: "/new-device-type",
      name: "new-device-type",
      component: NewDeviceType
      
    },
    {
      path:"/new-device",
      name:"new-device",
      component:NewDevice

    }
    
  ]
});
