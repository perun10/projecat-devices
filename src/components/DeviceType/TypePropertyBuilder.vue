<template>
    <div class="container">
        <div class="row">
            <div class="col-8">
                <recursive-component
                    v-if="deviceTypes"
                    :device="deviceTypes">
                </recursive-component>
              
                
            </div>
            <div class="col-4 border">
                <p class="row">Fields</p>
                <p class="row">Drag & drop or click to add</p>
                <p class="row">Text</p>
                <p class="row">Text Area</p>
            </div>
        </div>
        <div class="row border justify-content-center buttons">
            <button @click="cancel">Cancel</button>
            <button @click="goBack">Back</button>
            <button class="btn-save">Save</button>
        </div>
    </div>
</template>

<script>
import RecursiveComponent from './RecursiveComponent.vue'

export default {
    components: {
        RecursiveComponent
    },
    computed: {
        deviceTypes() {
            return this.$store.getters.deviceTypes;
        }
    },
    beforeCreate() {
        this.$store.dispatch('getDeviceProperties')
    },
    methods: {
        cancel() {
            this.$router.push('/');
        },
        goBack() {
            this.$emit('clicked', 'info');
        }
    },
    data() {
        return {
            //  items: []
                    // {
                    //     id: 1,
                    //     name: 'RACUNAR',
                    //     parentid: null,
                    //     description: 'RACUNAR PARENT 0',
                    //     properties: [
                    //     {
                    //         nameProperty: 'cpu',
                    //         required: true,
                    //         type: 'Text'
                    //     },
                    //     {
                    //         nameProperty: 'ram',
                    //         required: false,
                    //         type: 'Text'
                    //     }
                    //     ],
                    //     children: [
                    //     {
                    //         id: 2,
                    //         name: 'LAPTOP',
                    //         parentid: 1,
                    //         description: 'Basic Laptop',
                    //         properties: [
                    //         {
                    //             nameProperty: 'touchpad',
                    //             required: false,
                    //             type: 'Text'
                    //         }
                    //         ],
                    //         children: [
                    //         {
                    //             id: 3,
                    //             name: 'ULTRA - LAPTOP',
                    //             parentid: 2,
                    //             description: 'ULTRA LAGAN',
                    //             properties: [
                    //             {
                    //                 nameProperty: 'weight',
                    //                 required: true,
                    //                 type: 'Text'
                    //             }
                    //             ],
                    //             children: [
                    //             {
                    //                 id: 4,
                    //                 name: 'Air Book',
                    //                 parentid: 3,
                    //                 description: 'Microsoft Air Book',
                    //                 properties: [
                    //                 {
                    //                     nameProperty: 'size',
                    //                     required: false,
                    //                     type: 'input'
                    //                 }
                    //                 ]
                    //             }
                    //             ]
                    //         },
                    //         {
                    //             id: 7,
                    //             name: 'Standard Laptop',
                    //             parentid: 2,
                    //             description: 'Standardni laptop',
                    //             properties: [
                    //             {
                    //                 nameProperty: 'price',
                    //                 required: true,
                    //                 type: 'Text'
                    //             }
                    //             ]
                    //         }
                    //         ]
                    //     },
                    //     {
                    //         id: 5,
                    //         name: 'Desktop',
                    //         parentid: 1,
                    //         description: 'Home desktop PC',
                    //         properties: [
                    //         {
                    //             nameProperty: 'Case',
                    //             required: false,
                    //             type: 'Label'
                    //         }
                    //         ],
                    //         children: [
                    //             {
                    //                 id: 99,
                    //                 name: 'Air Jordan',
                    //                 parentid: 3,
                    //                 description: 'JORDAN',
                    //                 properties: [
                    //                 {
                    //                     nameProperty: 'size',
                    //                     required: true,
                    //                     type: 'input'
                    //                 },
                    //                 {
                    //                     nameProperty: 'color',
                    //                     required: false,
                    //                     type: 'input'
                    //                 }
                    //                 ]
                    //             }
                    //             ]
                    //     },
                    //     {
                    //         id: 6,
                    //         name: 'Server',
                    //         parentid: 1,
                    //         description: 'Firewall',
                    //         properties: [
                    //         {
                    //             nameProperty: 'Housing',
                    //             required: true,
                    //             type: 'Label'
                    //         }
                    //         ]
                    //     }
                    //     ]
                    // }
                    
        }
    }
}
</script>

<style scoped>
    button {
        width: 141px;
        height: 34px;
        color: #4A86E8;
        border: 1px solid #4A86E8;
        margin: auto 40px auto 0;
    }

    .btn-save {
        background-color: #4a86e8;
        color: white;
    }

    .buttons {
        height: 77px;
    }


</style>
