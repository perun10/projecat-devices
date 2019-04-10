import axios from 'axios'

const state = {
    deviceTypes: null,
    newDeviceTypeProperties: null,
    selectedDeviceTypeId: null,
    deviceTypeName: null,
    newDeviceTypeId: null,
    trueFalse:null
};

const mutations = {
    setDeviceTypes(state, payload) {
        state.deviceTypes = payload;
    },
    setNewDeviceTypeProperties(state, payload) {
        state.newDeviceTypeProperties = payload;
    },
    setSelectedDeviceTypeId(state, payload) {
        state.selectedDeviceTypeId = payload;
    },
    setDeviceTypeName(state, payload) {
        state.deviceTypeName = payload;
    },
    setFalse(state,payload){
        state.trueFalse = payload
    }
};

const actions = {
    getDeviceTypes({ commit }) {
        axios.get('http://localhost:21021/api/services/app/DeviceTypeService/GetDeviceTypeNestedDtos')
        .then((response) => {
            // console.log(response)
            let data = response.data.result[0];
          commit('setDeviceTypes', data);
        })
    },
    createNewDeviceType({ commit }, payload) {
        axios.post('http://localhost:21021/api/services/app/DeviceTypeService/CreateOrUpdateDeviceType', payload)
        .then((response) => {
            let data = response.data.result;
            // console.log(data)
            commit('setNewDeviceTypeProperties', data);
        })
    },
    deleteDeviceType({commit},payload){
        // console.log(payload.id)
        axios.delete('http://localhost:21021/api/services/app/DeviceTypeService/Delete', {
            params: {
                id: payload.id
            }
        })
        .catch(error=>{
            console.log(error.message)
        })
        commit('setFalse',true)

    }
};

const getters = {
    deviceTypes(state) {
        return state.deviceTypes;
    },
    newDeviceTypeProperties(state) {
        return state.newDeviceTypeProperties;
    },
    selectedDeviceTypeId(state) {
        return state.selectedDeviceTypeId;
    },
    getdeviceTypeName(state){
        return state.deviceTypeName
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
