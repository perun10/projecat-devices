<template>
  <v-container grid-list-xs>
    <form name="device-type">
      <v-layout row wrap>
        <v-flex xs6>
         
          <label for="name">
            Name
            <span style="color:red;">*</span>
          </label>
          <input
            id="name"
            class="form-control"
            type="text"
            title="Required field."
            style="width:90%;"
            v-model.trim="name"
            @blur="$v.name.$touch()"
          >
          <div class="errors" v-if="$v.name.$error">Name is required</div>
          <div
            class="errors"
            v-if="!$v.name.minLength"
          >Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
        </v-flex>
        <v-flex xs6>
          <BasicSelect :data="deviceTypes" :model="activeDeviceType.name"/>
        </v-flex>
      </v-layout>
      <v-layout row wrap mt-5>
        <v-flex xs12>
          <label for="description-p">Description</label>
          <textarea
            id="description"
            maxlength="1000"
            title="Required field."
            v-model.trim="description"
            @input="$v.description.$touch()"
            class="form-control"
          ></textarea>
          <div class="errors" v-if="$v.description.$error">Description is required</div>
          <div
            class="errors"
            v-if="!$v.description.minLength || !$v.description.maxLength "
          >Description must have between {{$v.description.$params.minLength.min}} and {{$v.description.$params.maxLength.max}} letters .</div>
        </v-flex>
      </v-layout>
      <div v-if="error" style="color:red">
        <p>{{ msg }}</p>
      </div>
      <v-layout row wrap style="min-height:250px;"></v-layout>
      <v-layout row wrap justify-center style="border-top:1px solid black;" pt-2>
        <v-btn color="transparent" to="/">Cancel</v-btn>
        <v-btn color="primary" @click.prevent="newDeviceType">Next</v-btn>
        <!-- <v-btn color="primary" @click.prevent="editDeviceType" v-if="editMode">Next</v-btn> -->
      </v-layout>
    </form>
    <Alert :snackbar="snackbar" :y="y" :x="x" :timeout="timeout" :text="text"/>
  </v-container>
</template>

<script>
import BasicSelect from "@/components/DeviceType/BasicSelect.vue";
import {
  required,
  minLength,
  maxLength,
  between
} from "vuelidate/lib/validators";
import Alert from "@/components/shared/Alert.vue";
import {store} from '@/store/store'
export default {
  data() {
    return {
      snackbar: false,
      y: "bottom",
      x: "left",
      mode: "",
      timeout: 3000,
      text: "Hello, I'm a snackbar",
      placeholder: "Select device type parent...",
      msg: "Name and description needed",
      test: [],
      error: false,
      arrNames: [],
      name: "",
      description: "",
      parentDeviceType: "Laptop"
    };
  },
  components: {
    Alert,
    BasicSelect
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    description: {
      required,
      minLength: minLength(20),
      maxLength: maxLength(30)
    }
  },  
  beforeDestroy() {
    this.$store.commit("setEditMode", false);
  },
  created(){
 if (this.editMode) {
      this.name = this.activeDeviceType.name;
      this.description = this.activeDeviceType.description;
      this.placeholder = this.activeDeviceType.parentId;
      console.log(this.activeDeviceType);
      this.$store.commit(
        "setSelectedDeviceTypeId",
        this.activeDeviceType.parentId
      );
    }
  },
  computed: {  
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
  },
  methods: {
    setName(value) {
      this.name = value;
      this.$v.name.$touch();
    },
    setDescription(value) {
      this.description = value;
      this.$v.description.$touch();
    },
    newDeviceType() {
      let createDeviceType;
      let parentID;
      if (!this.$v.name.$invalid && !this.$v.description.$invalid) {
        if (this.editMode) {
          this.selectedId === null
            ? (parentID = this.activeDeviceType.parentid)
            : (parentID = this.selectedId);
          createDeviceType = {
            id: this.activeDeviceType.id,
            parentid: parentID,
            name: this.name,
            description: this.description
          };
        } else {
          this.selectedId === null
            ? (parentID = null)
            : (parentID = this.selectedId);
          createDeviceType = {
            id: 0,
            name: this.name,
            description: this.description,
            parentId: parentID
          };
        }
        if (parentID) {
          this.$store.dispatch("getDeviceTypeProperties", parentID);
        }

        this.$store.commit("setActiveDeviceType", createDeviceType);
        this.goBack();
      } else {
        this.text = "Form invalid";
        this.snackbar = true;
      }
      setTimeout(() => {
    this.snackbar = false
    
}, 1000);
    },
    goBack() {
      this.$emit("clicked", "builder");
    }
  }
};
</script>

<style scoped>
#name {
  width: 300px;
}

#description {
  width: 100%;
  min-height: 100px;
}

#selectType {
  width: 140px;
}
.errors {
  color: red;
  background-color: none !important;
}
</style>
