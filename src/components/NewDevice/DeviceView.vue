<template>
   <v-container grid-list-md class="device-view">
       <v-layout align-center row>
            <v-flex xs7 class="back" @click="goBack" title="close">
            </v-flex>
           <v-flex xs5 class="device-properties" v-if="activeDev">
                <h3 class="device-name">{{ activeDev[0].deviceName }}</h3>
                <button class="go-back" @click="goBack"><svg viewPort="0 0 12 12" version="1.1"> <line x1="1" y1="11" x2="11" y2="1" stroke="black" stroke-width="2"/><line x1="1" y1="1" x2="11" y2="11" stroke="black" stroke-width="2"/></svg></button>
                <div class="description">
                    <p>Description:</p> 
                    <p> {{ activeDev[0].description }}</p>
                </div>
                <div v-if="activeDev">
                    <h2 class="device-props">Device properties:</h2>
                    <p v-for="(property, index) in deviceProperties[0].propValues" :key="index"><span class="property">{{ property.propName }}:</span> {{ property.value }}</p>
                </div>
            </v-flex>
        </v-layout>
   </v-container>
</template>

<script>
export default {
    data() {
        return {
            deviceProperties: [
                {
                    propValues: []
                }
            ]
        }
    },
    methods: {
        goBack() {
            this.$store.commit('setActiveDeviceProperties', []);
            this.$router.push({ name: 'devices' });
        }
    },
    computed: {
        activeDev() {
            return this.$store.getters.activeDeviceProperties;
        }
    },
    beforeDestroy() {
        this.$store.commit('setActiveDeviceProperties', []);
    },
    created() {
        for(let i = 0; i < this.activeDev[0].deviceTypes.length; i++) {
            for(let j = 0; j < this.activeDev[0].deviceTypes[i].propValues.length; j++) {
                this.deviceProperties[0].propValues.push(
                    {
                        propName: this.activeDev[0].deviceTypes[i].propValues[j].propName,
                        value:  this.activeDev[0].deviceTypes[i].propValues[j].value
                    } 
                )
            }
        }
    }
}
</script>

<style scoped>
    .property {
        font-weight: 700;
        text-transform: capitalize;
    }

    .device-view {
        position: absolute;
        top: 1px;
        right: 0;
        min-width: 100vw;
        padding: 0;
        margin-top: 4px;
    }

    .device-properties {
        height: 93vh;
        background-color: white;
        margin: 0;
        padding: 20px !important;
    }

    .device-name {
        margin: 15px 0 20px 0;
        text-align: center;
        font-size: 40px;
        box-shadow: 0px 7px 16px -13px rgba(0,0,0,0.75);
    }

    .go-back:hover {
        cursor: pointer;
    }

    .go-back:focus {
        outline: none;
    }

    .go-back {
        width: 15px;
        height: 15px;
        margin-top: 1px;
        margin-right: 2px;
        position:absolute;
        top: 20px;
        right: 30px;
    }

    .back {
        background-color: transparent !important;
        height: 93vh;
    }

    .description {
        border-bottom: 1px solid #eeeeee;
    }

    .description p {
        margin-bottom: 7px;
    }

    .description p:nth-child(1) {
        font-weight: 700;
    }

    .device-props {
        margin: 20px 0;
    }

    svg {
        width: 20px;
        height: 20px;
    }
</style>
