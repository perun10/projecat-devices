<template>
    <v-layout row wrap>
      <v-flex xs12>
       
          <v-layout row wrap justify-space-between pl-5 pr-5>
            <h3>Name</h3>
            <h3>Description</h3>
          </v-layout>
       
        <v-treeview
          :items="data"
          v-model="value"
          :open-all="true"
          item-children='items'
          :hoverable="true"
          v-if="data"
        >
           <template v-slot:append="{item , active}" >
            <p class="mr-3 mt-3">{{item.description}}</p>
            <div v-if="newDeviceType">
            <button type="button" class="btn btn-link" @click="onDelete(item)">Delete</button>
            <button type="button" class="btn btn-link">Edit</button>

            </div>
            <div v-else>
                <button type="button" class="btn btn-link" @click="takeParent(item.id)">Select device type</button>
            </div>
          </template> 
        </v-treeview>
         <prompt :visible="dialogVisible" :activeDevType="activeDevType" @close="onClose"></prompt>
      </v-flex>
    
    </v-layout>
</template>

<script>
import Prompt from '@/components/shared/Prompt'

export default {
  components:{
      Prompt
  },    
  props:{
    data:{
        type:Array
    },
    newDeviceType:{
        type:Boolean,
        default:true
    }
    },
    data(){
        return{
          dialogVisible: false,
          activeDevType: [],
            value:[]
        }
    },
    methods: {    
    takeParent(id){
        this.$store.commit('setDeviceTypeId',id)
    },
    onDelete(item) {
        this.dialogVisible = true;
        this.activeDevType = item;
    },
    onClose() {
        this.dialogVisible = false;
        this.activeDevType = null;
    }
  }

}
</script>

<style>
/* .v-treeview-node{
  border-bottom: 1px solid black;
}
.v-treeview-node__children{
  border-top:1px solid black;
  border-bottom: 1px solid black;
}
.v-treeview-node :last-child{
  border-bottom: none;
} */


</style>
