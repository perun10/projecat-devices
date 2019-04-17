<template>
  <div class="container">
    <form name="device-type">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" class="form-control" type="text" title="Required field." v-model.trim="name" >
        <div class="errors" v-if="!$v.name.required">Field is required</div>
        <div class="errors" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
      </div>
      <div class="form-group">
        <!--   -->
        <BasicSelect :data="deviceTypes" v-if="deviceTypes"/>
      </div>
      <div class="form-group">
        <label for="description-p">Description:</label>
        <textarea
            id="description"
            maxlength="1000"
            title="Required field."
            v-model="description"
            class="form-control"
        ></textarea>
      </div>
      <div v-if="error" style="color:red">
          <p>{{ msg }}</p>
      </div>
      <div>
        <v-btn color="warning" to="/">Cancel</v-btn>
        <v-btn color="primary" @click.prevent="newDeviceType" v-if="!editMode">Next</v-btn>
        <v-btn color="primary" @click.prevent="editDeviceType" v-if="editMode">Next</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import BasicSelect from "@/components/DeviceType/BasicSelect.vue";
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  components: {
    BasicSelect
  },
  validations:{
    name:{
      required,
      minLength: minLength(4)
    }
  },
  beforeCreate() {
    if (!this.$store.getters.deviceTypes) {
      this.$store.dispatch("getDeviceTypes");
    }
  },
  beforeDestroy() {
    this.$store.commit('setEditMode', false);
    // this.$store.commit('setSelectedDeviceTypeId', null);
  },
  mounted(){
    // console.log(this.selectedId)
  },
  created() {
    if(this.editMode) {
      this.name = this.activeDeviceType.name;
      this.description = this.activeDeviceType.description;
      this.placeholder = this.activeDeviceType.parentId;
      //this.$store.commit("setSelectedDeviceTypeId", this.placeholder);

      this.editDeviceType()
    }
  },
  computed: {
    flatted() {
      return this.flatten(this.deviceTypes);
    },
    deviceTypes() {
      return this.$store.getters.deviceTypes;
    },
    activeDeviceType() {
      return this.$store.getters.activeDeviceType;
    },
    editMode() {
      return this.$store.getters.editMode;
    },
    selectedId() {
      return this.$store.getters.selectedDeviceTypeId;
    },
    myDeviceTypesArr() {
      let arr = [];
      arr.push(this.deviceTypes);
      return arr;
    },
    myTypeNames() {
      let arr = [];
      this.arrNames.push(this.deviceTypes.name);
      for (let i = 0; i <= this.deviceTypes.children.length - 1; i++) {
        // console.log(this.deviceTypes.children[i].name);
        this.arrNames.push(this.deviceTypes.children[i].name);
      }
      arr = this.arrNames;
      return arr;
    }
  },
  methods: {
    setName(value) {
      this.name = value
      this.$v.name.$touch()
    },
    flatten(arr) {
      var final = [];
      var self = this;
      arr.forEach(item => {
        final.push(item.name);
        // console.log(item.name);
        if (typeof item.items !== "undefined") {
          final = final.concat(self.flatten(item.items));
        }
      });
      return final;
    },
    newDeviceType() {
      if(!this.$v.name.$invalid){
        console.log(this.selectedId + ","+ this.name)
        let parent = 0
        this.selectedId === null ? parent = null : parent = this.selectedId
        let createDeviceType = {
          "id":0,
          "name":this.name,
          "description":this.description,
          "parentId":parent
        }
        console.log(createDeviceType)
       if(parent){

         this.$store.dispatch('getDeviceTypeProperties', parent)
       }
      
         
        this.$store.commit('setActiveDeviceType', createDeviceType);

        // this.$store.commit('setDeviceTypeName', createDeviceType)
        //this.$store.dispatch('createNewDeviceType', createDeviceType)

        this.goBack()
      }
      // if (this.name && this.description) {
      //  let parentID = '';
      // this.selectedId === null ? parentID = null : parentID = this.selectedId
      //   // console.log(parentID)
      //   let arr = []
      //   arr = this.flatted
      //   // console.log(arr)
      //   if(!arr.includes(this.name)){    
      //   this.error = false
      //   let createDeviceType = {
      //       "id": 0,
      //       "parentid": parentID,
      //       "name": this.name,
      //       "description": this.description
      //   }

      //   this.$store.dispatch('createNewDeviceType', createDeviceType)
      //   this.$store.commit('setDeviceTypeName', this.name)

      //   this.goBack();
      //   }else{
      //     this.msg = 'Name already exists'
      //     this.error = true
      //   }
      // } else {
      //   this.error = true;
      // }
    },
     editDeviceType() {
        // console.log(this.activeDeviceType)
        // console.log(this.activeDeviceType.name)
        // console.log(this.activeDeviceType.description)
        // console.log(this.activeDeviceType.parentid)
      let deviceTypeData;

      let parentID;
        this.selectedId === null ? parentID = this.activeDeviceType.parentid : parentID = this.selectedId;
      
      deviceTypeData = {
          "id": this.activeDeviceType.id,
          "parentid": parentID,
          "name": this.name,
          "description": this.description
      }

       this.$store.dispatch('createNewDeviceType', deviceTypeData);
       this.$store.commit('setDeviceTypeName', this.name);
       this.$emit('clicked', 'builder');
    },
    goBack() {
      this.$emit("clicked", "builder");
    }
  },
  data() {
    return {
      placeholder: 'Select device type parent...',
      msg:'Name and description needed',
      test: [],
      error: false,
      arrNames: [],
      name: "",
      description: "",
      parentDeviceType: "Laptop",     
    }
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
.errors{
  color:red;
  background-color:none!important;
}
</style>
