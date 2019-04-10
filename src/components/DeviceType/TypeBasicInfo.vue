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
          v-model="name"
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
          v-model="description"
          class="form-control"
        ></textarea>
      </div>
      <div>
        <button class="btn btn-secondary">Cancel</button>
        <button class="btn btn-primary" @click.prevent="newDeviceType">Next</button>
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
      this.$store.dispatch('getDeviceTypes')
    }
  },
  computed: {
    deviceTypes() {
      return this.$store.getters.deviceTypes;
    },
    selectedId() {
        return this.$store.getters.selectedDeviceTypeId;
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
        let createDeviceType = {
            "id": 0,
            "parentid": this.selectedId,
            "name": this.name,
            "description": this.description
        }

        this.$store.dispatch('createNewDeviceType', createDeviceType)
        this.$store.commit('setDeviceTypeName', this.name)
        
        
        this.goBack();
        },
        goBack() {
            this.$emit('clicked', 'builder');
        }
  },
  data() {
    return {      
      arrNames: [],
      name: "",
      description: "",
      parentDeviceType: "Laptop",
      description: ""
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
