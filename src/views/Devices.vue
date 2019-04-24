<template>
    <div>
        <v-container v-if="devices" class="devices">
        <v-layout row wrap>
            <v-flex xs12 mb-5>
            <button type="button" class="btn btn-primary" @click="pushToNewDevice">New device</button>
            </v-flex>
        </v-layout>
      <v-data-table :headers="header" :items="devices" class="elevation-1" item-key="name" v-if="devices">
            <template v-slot:items="props">
            
            
                <tr>
                    <td class="text-left device-view" @click="viewDevice(props.item.id, props.item.deviceTypeId, props.item.name)">{{props.item.name}}</td>
                    <td class="text-center">{{props.item.deviceTypeName}}</td>
                    <td class="text-right">{{props.item.description}}</td>
                    <td class="text-right"> <span class="td-button btn-link"  @click="onEdit(props.item)">Edit</span> <span class="td-button btn-link pl-3" @click="onDelete(props.item)">Delete</span>  <span class="td-button btn-link pl-3" @click="viewDevice(props.item.id, props.item.deviceTypeId, props.item.name)">View</span>  </td>
                </tr>
            
            
            </template>
        </v-data-table>
        <button @click="exportPDFWithComp" class="k-button">Export PDF</button>
    
    <grid-pdf-export ref="gridPdfExport" :margin="'1cm'" :paper-size="'a4'" :items="devices">
        <Grid id="target"         
            :style="{height: '280px'}"
            :data-items="devices"
            :columns="columns"
           >
        </Grid>
     
        <!-- <kendo-contextmenu :target="target">
               
            <li @click="viewDevice(devices[1].id, devices[1].deviceTypeId, devices[1].name)">View</li>
            <li  @click="onEdit(props.item)">Edit</li>
            <li @kendocontextmenu="test()">Delete</li>
      
     
    </kendo-contextmenu> -->
    </grid-pdf-export>
            {{dataI}}
        <prompt :visible="dialogVisible" :activeDevice="activeDevice" @close="onClose" :mode="mode"></prompt>
        </v-container>
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
         
       
    </div>
</template>

<script>
import { GridPdfExport } from '@progress/kendo-vue-pdf';
import { Grid } from '@progress/kendo-vue-grid';
import "@progress/kendo-theme-default/dist/all.css";
import { ContextMenu,LayoutInstaller } from '@progress/kendo-layout-vue-wrapper';
import Vue from 'vue'
Vue.use(LayoutInstaller)
Vue.component('Grid', Grid);
Vue.component('grid-pdf-export', GridPdfExport);
import Prompt from "@/components/shared/Prompt";
import {store} from '@/store/store'
import { setTimeout } from 'timers';
import { constants } from 'crypto';

export default {
    components: {
        Prompt
        
    },
    data() {
        return {
            dataI:'',
            target:'#target',
            columns:[{field:'name',title:'Name'},{field:'deviceTypeName',title:"Type"},{field:'description',title:"Description"}],
            myDevs:[],
            active: "",
            itemKey: [],
            value: [],
            header: [
            {
                text: "Name",
                align: "left",
                sortable: true,
                value: "name"
            },
            {
                text: "Type",
                align: "center",
                sortable: true,
                value: "type"
            },
            {
                text: "Description",
                align: "right",
                sortable: false,
                value: "description"
            }
            ,
            {
                text: "Options",
                align: "right",
                sortable: false,
                value: "Options"
            }
            ],
            activeDevice: [],
            dialogVisible: false,
            mode: '',
            
    };
    },
    beforeRouteEnter(to,from,next) {
        store.commit('setLoader',true);
        store.dispatch("getDevices");
        setTimeout(()=>{
            next();
        }, 500)  
    },
    mounted(){
        this.$store.commit('setLoader',false)
    },
    computed: {
        devices() {
            let arr = [];
            arr = this.$store.getters.devices.data.result;
            return arr;
        },
        devicetypeProperties() {
            return this.$store.getters.newDeviceTypeProperties;
        }
    },
    methods: {
        test(ev){
            console.log(ev)
        },
          exportPDFWithComp: function() {
            (this.$refs.gridPdfExport).save();
        },
        async viewDevice(id, typeID, name2) {
            await this.$store.dispatch('getDeviceTypePropertiesEditMode', {
                        deviceId: id,
                        deviceTypeId: typeID
                    });
            this.$router.push({ name: 'device-view', params: { id: this.slugify(name2) }});
        },
        async onEdit(item) {
                await this.$store.commit('setActiveDevice', item);
                await this.$store.commit('setEditDeviceMode', true);
                await this.$store.commit('setDeviceParentID', item.deviceTypeId);
                this.$router.push('/new-device');
        },
        pushToNewDevice() {
            this.$router.push("/new-device");
        },
        onDelete(item) {
            this.mode = 'deleteDevice'
            this.dialogVisible = true;
            this.activeDevice = item;
        },
        onClose() {
            this.mode = '';
            this.dialogVisible = false;
            this.activeDevice = null;
        },
        slugify(name) {
            return name.toString().toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/č/g, 'c')
                .replace(/ć/g, 'c')
                .replace(/đ/g, 'dj')
                .replace(/š/g, 's')
                .replace(/ž/g, 'z')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
        }
    }
};
</script>
<style scoped>
    .devices {
        position: relative;
    }

    .td-button:hover {
        cursor: pointer;
    }

    .slide-fade-enter-active {
        transition: all .2s ease;
    }

    .slide-fade-leave-active {
        transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter,.slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }

    .device-view:hover {
        cursor: pointer;
    }
</style>