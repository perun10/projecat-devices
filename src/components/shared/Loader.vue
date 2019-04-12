<template>
    <div class="text-xs-center">
        <!-- <v-btn
            :disabled="loader"
            :loading="loader"
            class="white--text"
            color="purple darken-2"
            @click="load"
            >
            Start loading
        </v-btn> -->
        <v-dialog
            v-model="loader"
            hide-overlay
            persistent
            width="300"
        >
            <v-card
                color="primary"
                dark
            >
                <v-card-text>
                    Loading...
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  export default {
    methods: {
        load() {
            this.$store.commit('setLoader', true);
            setTimeout(() => {
                (this.$store.commit('setLoader', false))
            }, 2000)
        }
    },
    computed: {
        loader() {
            return this.$store.getters.loader;
        }
    }
  }
</script>

<style scoped>

</style>
