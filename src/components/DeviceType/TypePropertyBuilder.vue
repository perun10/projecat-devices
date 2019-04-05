<template>
    <div class="container">
        <div class="row">
            <div class="col-8">
                <div v-for="(item, index) in items" :key="index" class="property">
                    <p class="propertyHeader">"{{ item.name }}" properties</p>
                    <p class="propertyDescription">{{ item.description }}</p>
                    <div v-for="(item, index) in item.properties" :key="index">
                        <div class="propertyBody">
                            <p>{{ item.nameProperty }} <span v-if="item.required" class="required">*</span></p>
                            <input type="text">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4 border">
                <p class="row">Fields</p>
                <p class="row">Drag & drop or click to add</p>
                <p class="row">Text</p>
                <p class="row">Text Area</p>
            </div>
        </div>
        <div class="row border justify-content-center buttons">
            <button>Cancel</button>
            <button>Back</button>
            <button class="btn-save">Save</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    id: 1,
                    name: "RACUNAR",
                    parentid: null,
                    description: "OPIS",
                    properties: [
                        {
                            nameProperty: "cpu",
                            required: true,
                            type: "Text"
                        },
                        {
                            nameProperty: "ram",
                            required: false,
                            type: "Text"
                        }
                    ]
                },
                {
                    id: 2,
                    name: "LAPTOP",
                    parentid: 1,
                    description: "OPIS",
                    properties: [
                        {
                            nameProperty: "touchpad",
                            required: false,
                            type: "Text"
                        }
                    ]
                }
                ,
                {
                    id: 3,
                    name: "ULTRA - LAPTOP",
                    parentid: 2,
                    description: "ULTRA LAGAN",
                    properties: [
                        {
                            nameProperty: "weight",
                            required: true,
                            type: "Text"
                        },
                        {
                            nameProperty: "boja",
                            required: true,
                            type: "zelena"
                        }
                    ]
                },
                   
                {
                    id: 4,
                    name: "Ultra Book",
                    properties: [
                        {
                            nameProperty: "tezina",
                            required: true,
                            type: "Text"
                        }
                    ]
                }
            ]
        }
    },
    created() {
        // console.log(this.items)
    }
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
