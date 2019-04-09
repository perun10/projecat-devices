<template>
  <div class="container">
    <form name="device-type">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          id="name"
          class="form-control"
          type="text"
          title="Required field."
          v-model.lazy="name"
          required
        >
      </div>
      <div class="form-group">
      
            <BasicSelect :data="myDeviceTypesArr" v-if="deviceTypes"/>
        


      </div>
      <div class="form-group">
        <label for="description-p">Description:</label>
        <textarea
          id="description"
          maxlength="1000"
          required
          title="Required field."
          v-model.lazy="description"
          class="form-control"
        ></textarea>
      </div>
      <div>
        <button class="btn btn-secondary">Cancel</button>
        <button class="btn btn-primary" @click="newDeviceType">Next</button>
      </div>
    </form>
  </div>
</template>

<script>
import BasicSelect from "@/components/DeviceType/BasicSelect.vue";
export default {
  components: {
    BasicSelect
  },
  beforeCreate(){
    if(!this.$store.getters.deviceTypes){
      this.$store.dispatch('getDeviceProperties')
    }
  },
  computed: {
    deviceTypes() {
      return this.$store.getters.deviceTypes;
    },
    myDeviceTypesArr(){
        let arr = []
        arr.push(this.deviceTypes)
        return arr
    }
    ,
    myTypeNames() {
      let arr = [];
      this.arrNames.push(this.deviceTypes.name);
      for (let i = 0; i <= this.deviceTypes.children.length - 1; i++) {
        console.log(this.deviceTypes.children[i].name);
        this.arrNames.push(this.deviceTypes.children[i].name);
      }
      arr = this.arrNames;
      return arr
    }
  },
  methods: {
    newDeviceType() {
      let update = {
        properties: [
          {
            nameProperty: "Slot 1",
            type: "string",
            required: true
          },
          {
            nameProperty: "Slot 2",
            type: "string",
            required: true
          }
        ],
        id: 4
      };
      this.axios
        .put(
          "http://localhost:21021/api/services/app/DeviceService/UpdateDeviceTypeProperties",
          update
        )
        .then(response => {
          console.log(response);
        });
    }
  },
  data() {
    return {      
      arrNames: [],
      name: "",
      parentDeviceType: "Laptop",
      description: "",
    };
  }
};
</script>

<style scoped>
#name {
  width: 300px;
}

#description {
  width: 650px;
  min-height: 100px;
}

#selectType {
  width: 140px;
}
</style>
