import axios from 'axios'

const state = {
    deviceTypes: null,
    devices:null
};

const mutations = {
    setDeviceTypes(state, payload) {
        state.deviceTypes = payload;
    },
    setDevices(state, payload) {
        state.devices = payload;
    }
};

const actions = {
    getDeviceProperties({ commit }) {
        axios.get('http://localhost:21021/api/services/app/DeviceService/GetDeviceTypeNestedDtos')
        .then((response) => {
            let data = response.data.result[0];
            // console.log(data);            
          commit('setDeviceTypes', data);
        })
    },
    getDevices({commit}){
        axios.get('http://localhost:21021/api/services/app/DeviceService/GetAllDevices')
        .then((response) => {
            let data = response;
            // console.log(response);            
          commit('setDevices', data);
        })
    }
};

const getters = {
    deviceTypes(state) {
        return state.deviceTypes;
    },
    devices(state){
        return state.devices
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
