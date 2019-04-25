<template>
    <div>
        <v-container v-if="devices" class="devices">
        <v-layout row wrap>
            <v-flex xs12 mb-5>
            <button type="button" class="btn btn-primary" @click="pushToNewDevice">New device</button>
            </v-flex>
        </v-layout>
      <!-- <v-data-table :headers="header" :items="devices" class="elevation-1" item-key="name" v-if="devices">
            <template v-slot:items="props">
            
            
                <tr>
                    <td class="text-left device-view" @click="viewDevice(props.item.id, props.item.deviceTypeId, props.item.name)">{{props.item.name}}</td>
                    <td class="text-center">{{props.item.deviceTypeName}}</td>
                    <td class="text-right">{{props.item.description}}</td>
                    <td class="text-right"> <span class="td-button btn-link"  @click="onEdit(props.item)">Edit</span> <span class="td-button btn-link pl-3" @click="onDelete(props.item)">Delete</span>  <span class="td-button btn-link pl-3" @click="viewDevice(props.item.id, props.item.deviceTypeId, props.item.name)">View</span>  </td>
                </tr>
            
            
            </template>
        </v-data-table> -->

    <!--  -->
           <!-- <Grid id="target"
        ref="grid"
        :style="{height: 'auto'}"
        :data-items="devices"
        :sortable="true"
        :sort= "sort"
        :selected-field="selectedField"
        :columns="columns"
        @rowclick="onRowClick"
        @sortchange="sortChangeHandler"
        >

    </Grid> -->
 
     <kendo-grid :data-source="devices" id="target"
        ref="grid"
        :toolbar="['pdf']"
                :pdf-all-pages="true"
                :pdf-avoid-links="true"
                :pdf-paper-size="'A4'"
                :pdf-margin="{ top: '2cm', left: '1cm', right: '1cm', bottom: '1cm' }"
                :pdf-landscape="true"
                :pdf-repeat-headers="true"
                :pdf-scale="0.8">
        <kendo-grid-column :field="'name'"
                           :title="'Name'"
                           :width="40"></kendo-grid-column>

        <kendo-grid-column 
        :field="'deviceTypeName'" 
        :title="'Type'" 
        :width="40">
        </kendo-grid-column>
        <kendo-grid-column
        :field="'description'" 
        :title="'description'" 
        :width="40">
        </kendo-grid-column>

       
    </kendo-grid>
       <kendo-contextmenu :target="target" filter="tr" @open="contextOpen">
               
            <li @click="viewDevice(selectedID.id,selectedID.deviceTypeId,selectedID.name)">View</li>
            <li  @click="onEdit(selectedID)">Edit</li>
            <li @click="onDelete(selectedID)">Delete</li>
            <!-- <li @click="test">Test</li> -->
      
     
    </kendo-contextmenu>
   
    <!-- <v-btn color="error" @click="exportPDFWithComp">Export PDF</v-btn>  -->
    <!-- <v-btn color="info" type="button" id="printGrid" @click="printGrid" ref='print'>Print</v-btn> -->
    <!-- <button @click="exportPDFWithComp" class="k-button">Export PDF</button>-->
    <button type="button" class="k-button" id="printGrid" @click="printGrid" ref="print">Print</button>

        <prompt :visible="dialogVisible" :activeDevice="activeDevice" @close="onClose" :mode="mode"></prompt>
        </v-container>
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
         
    </div>
</template>

<script>

import { GridPdfExport } from '@progress/kendo-vue-pdf';
// import { Grid } from '@progress/kendo-vue-grid';
import "@progress/kendo-theme-default/dist/all.css";
import { ContextMenu,LayoutInstaller } from '@progress/kendo-layout-vue-wrapper';
import { Grid, GridInstaller } from '@progress/kendo-grid-vue-wrapper'

import Vue from 'vue'
Vue.use(LayoutInstaller)
Vue.use(GridInstaller)
// Vue.component('Grid', Grid);
Vue.component('grid-pdf-export', GridPdfExport);
import Prompt from "@/components/shared/Prompt";
import {store} from '@/store/store'
import { setTimeout } from 'timers';
import { constants } from 'crypto';
import { orderBy } from '@progress/kendo-data-query';
import { Button, ButtonGroup, ToolBar, ToolBarItem, ButtonGroupButton, ButtonsInstaller } from '@progress/kendo-buttons-vue-wrapper';
Vue.use(ButtonsInstaller);

export default {
    components: {
       Prompt,
       Grid
        
    },
    data() {
        return {            
             sort: [
                { field: 'name', dir: 'asc' }
            ],
            selectedField: 'selected',
            selectedID:1,
            numArr:[],
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
        devices:{
            get : function(){
            let arr = [];
            arr = this.$store.getters.devices.data.result;
            return orderBy(arr,this.sort);
            }
        },
        devicetypeProperties() {
            return this.$store.getters.newDeviceTypeProperties;
        },
        selectedItem () {
            return this.devices.find((item) => item.id === this.selectedID);
        }
    },
    methods: {
        toolbarTemplate(){
            const html = "<button type='button' class='k-button' id='printGrid' @click='printGrid' ref='print'>Print</button>"
            return kendo.template(html)
        },
        contextOpen(event) {
            const wrapper = this.$refs.grid.kendoWidget()
            const data = wrapper.dataItem(event.target)
            this.selectedID = data
        },
         sortChangeHandler: function(e) {
            this.sort = e.sort;
        },
        printGrid() {
        var gridElement = $('#target'),
            printableContent = '',
            win = window.open('', '', 'width=800, height=500, resizable=1, scrollbars=1'),
            doc = win.document.open();
        var htmlStart =
            '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<meta charset="utf-8" />' +
            '<title>Devices Print</title>' +
            '<link href="http://kendo.cdn.telerik.com/' + kendo.version + '/styles/kendo.common.min.css" rel="stylesheet" /> ' +
            '<style>' +
            'html { font: 11pt sans-serif; }' +
            '.k-grid { border-top-width: 10px; }' +
            '.k-grid, .k-grid-content { height: auto !important; }' +
            '.k-grid-content { overflow: visible !important;}' +
            'div.k-grid table { width:100%; }' +
            '.k-grid-content  td:nth-child(2) {padding-left:65px;}'+
            'div.k-grid table tr td {border:1px solid black; table-layout: auto;text-align:left; }' +
            '.k-grid .k-grid-header th { border-top:0; text-align:center; }' +
            '.k-grouping-header, .k-grid-toolbar, .k-grid-pager > .k-link { display: none; }' +
            '.k-grid-pager { display: none; }' + 
            '.moveTo { color:red; }' + // optional: hide the whole pager
            '</style>' +
            '</head>' +
            '<body>';

        var htmlEnd =
            '</body>' +
            '</html>';
        
        var gridHeader = gridElement.children('.k-grid-header');
        if (gridHeader[0]) {
          var thead = gridHeader.find('thead').clone().addClass('k-grid-header');
          printableContent = gridElement
            .clone()
            .children('.k-grid-header').remove()
            .end()
            .children('.k-grid-content')
            .find('table')
            .first()
            .children('tbody').before(thead)
            .end()
            .end()
            .end()
            .end()[0].outerHTML;
        } else {
          printableContent = gridElement.clone()[0].outerHTML;
        }

        doc.write(htmlStart + printableContent + htmlEnd);
        doc.close();
        win.print();
      },
        
        onRowClick(event){            
                this.selectedID = event.dataItem  
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