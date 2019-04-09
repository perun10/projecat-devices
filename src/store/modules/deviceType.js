import axios from 'axios'

const state = {
    deviceTypes: null,
    deviceTypesProperties: null,
    devices:null,
    selectedDeviceTypeId: null,
    deviceTypeName:null
};

const mutations = {
    setDeviceTypes(state, payload) {
        state.deviceTypes = payload;
    },
    setDeviceTypesProperties(state, payload) {
        state.deviceTypesProperties = payload;
    },
    setDevices(state, payload) {
        state.devices = payload;
    },
    setSelectedDeviceTypeId(state, payload) {
        state.selectedDeviceTypeId = payload;
    },
    setDeviceTypeName(state,payload){
        state.deviceTypeName = payload
    }
};

const actions = {
    getDeviceTypes({ commit }) {
        axios.get('http://localhost:21021/api/services/app/DeviceTypeService/GetDeviceTypeNestedDtos')
        .then((response) => {
            let data = response.data.result[0];
          commit('setDeviceTypes', data);
        })
    },
    getDevices({commit}){
        axios.get('http://localhost:21021/api/services/app/DeviceService/GetAllDevices')
        .then((response) => {
            let data = response;
          commit('setDevices', data);
        })
    },
    getDeviceTypeProperties({ commit }, payload) {
        axios.post('http://localhost:21021/api/services/app/DeviceTypeService/CreateOrUpdateDeviceType', payload)
        .then((response) => {
            let data = response.data.result;
          commit('setDeviceTypesProperties', data);
        })
    }
};

const getters = {
    deviceTypes(state) {
        return state.deviceTypes;
    },
    deviceTypesProperties(state) {
        return state.deviceTypesProperties;
    },
    devices(state){
        return state.devices
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
