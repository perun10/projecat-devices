<template>
    <div>
    <v-layout row justify-center>
        <v-dialog v-model="show" max-width="600px" v-if="activeDevType">
        <v-card>
            <v-card-title>
                <span class="headline">Are you sure you want to delete <span>{{ activeDevType.name }}</span> device type?</span>
            </v-card-title>
            <div v-if="!noChildren">
                <v-card-title>
                    <span class="headline">You will also delete this device types:</span>
                </v-card-title>
                <v-card-text>
                    <ul>
                        <li v-for="(item, index) in activeDevType.items" :key="index" class="items">{{ item.name }}</li>
                    </ul>
                </v-card-text>
            </div>
            <v-layout justify-center>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.stop="onConfirm" class="modalButton">Confirm</v-btn>
                    <v-btn color="blue darken-1" flat @click.stop="show = false" class="modalButton">Cancel</v-btn>
                </v-card-actions>
            </v-layout>
        </v-card>
        </v-dialog>
    </v-layout>
    </div>
</template>

<script>
export default { 
    props: ['visible', 'activeDevType'],
    data() {
        return {
            dialog: false
        }
    },
    computed: {
        show: {
            get () {
                return this.visible;
            },
            set (value) {
                this.$emit('close');
            }
        },
        noChildren() {
            if(this.activeDevType.items){
                return this.activeDevType.items.length === 0;
            }
        }
    },
    methods: {
        onConfirm() {
            let id = this.activeDevType.id;
            this.$store.dispatch("deleteDeviceType", { id: id });
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
    .items {
        font-size: 16px;
    }

    .modalButton {
        font-size: 14px;
    }
</style>
