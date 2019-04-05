import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NewDeviceType from "@/components/DeviceType/NewDeviceType.vue";
import NewDevice from "@/components/NewDevice/NewDevice.vue"
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {

      path: "device-type",
      name: "device-type",
      component: NewDeviceType
      
    },
    {
      path:"/device",
      name:"new-device",
      component:NewDevice

    }
    
  ]
});
