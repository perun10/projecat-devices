<template>
    <div>
        <div class="property">
            <p class="propertyHeader">"{{ device.name }}" properties</p>
            <p class="propertyDescription">{{ device.description }}</p>
            <div v-for="(property, index) in device.properties" :key="index">
                <div class="propertyBody">
                    <p>
                        {{ property.nameProperty }} <span v-if="property.required" class="required">*</span>
                    </p>
                    <input type="text">
                </div>
            </div>
        </div>
        <recursive-component
            v-for="(child, index) in device.children"
            :device="child"
            :key="index">
        </recursive-component>
    </div>
</template>

<script>
export default {
    name: 'RecursiveComponent',
    props: ['device']
}
</script>

<style scoped>
    input {
        border: 1px solid #404040;
        margin-bottom: 15px;
        width: 319px;
        height: 32px;
        padding-left: 6px;
    }

    .property {
        max-width: 747px;
        margin: 0 auto;
        border: 1px solid #404040;
        margin-bottom: 25px;
    }

    .propertyHeader {
        height: 40px;
        background-color: #efefef;
        font-weight: 700;
        padding-left: 25px;
        vertical-align: middle;
        line-height: 40px;
        border-bottom: 1px solid #404040;
    }

    .propertyBody {
        margin-left: 25px;
        display: inline-block;
    }

    .required {
        color: red;
    }

    .propertyDescription {
        margin-left: 25px;
    }

</style>
