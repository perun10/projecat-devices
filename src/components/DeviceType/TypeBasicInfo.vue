<template>
    <div class="container">
        <form name="device-type">
            <div class="form-group">
                <label for="name">Name:</label>
                <input id="name" class="form-control" type="text" title="Required field." v-model.lazy="name" required>
            </div>
            <div class="form-group">
                <label for="name">Parent device type *</label>
                <select id="selectType" v-model.lazy="parentDeviceType" class="form-control">
                    <option>Laptop</option>
                    <option>Laptop 2</option>
                </select>
            </div>
            <div class="form-group">
                <label for="description-p">Description:</label>
                <textarea id="description" maxlength="1000" required title="Required field." v-model.lazy="description" class="form-control"></textarea>
            </div>
            <div>
                <button class="btn btn-secondary">Cancel</button>
                <button class="btn btn-primary">Next</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            parentDeviceType: 'Laptop',
            description: ''
        }
    }
}
</script>

<style scoped>
    #name {
        width: 300px;
    }

    #description {
        width: 650px;
        min-height: 100px;
    }

    #selectType {
        width: 140px;
    }
</style>
