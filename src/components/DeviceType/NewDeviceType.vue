<template>
    <div class="container">
        <div class="container">
            <h2>New Device Type</h2>
            <ul class="nav nav-tabs" align="center">
                <li class="nav-item">
                    <small>Step 1</small>
                    <a class="nav-link" :class="{active: tab === 'info'}" @click="tab = 'info'">Basic Info</a>
                </li>
                <li class="nav-item">
                    <small>Step 2</small>
                    <a class="nav-link" :class="{active: tab === 'builder'}" @click="tab = 'builder'">Property Builder</a>
                </li>
            </ul>
            <!-- basic info tab -->
            <div v-if="tab === 'info'">
                <type-basic-info></type-basic-info>
            </div>

            <!-- property builder tab -->
            <div v-if="tab === 'builder'">
                <type-property-builder @clicked="changeTab"></type-property-builder>
            </div>

        </div>
    </div>
</template>

<script>
import TypeBasicInfo from '@/components/DeviceType/TypeBasicInfo';
import TypePropertyBuilder from '@/components/DeviceType/TypePropertyBuilder';
import {store} from '../../store/store.js'


export default {
    components: {
        TypeBasicInfo,
        TypePropertyBuilder
    },
    data() {
        return {
            tab: 'info'
        }
    },
    methods: {
        changeTab(value) {
            this.tab = value;
        }
    }
}
</script>

<style scoped>
    .nav-item:hover {
        cursor: pointer;
    }
</style>
