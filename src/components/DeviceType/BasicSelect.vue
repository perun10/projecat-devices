<template>
    <div>
        <div class="form-group">
                <label for="name">Parent device type *</label>
                <select v-for="d in data" :key="d.id">

                </select>
            </div>
    </div>
</template>

<script>
export default {
    name:"BasicSelect",
    props:['data']
}
</script>

<style>

</style>
