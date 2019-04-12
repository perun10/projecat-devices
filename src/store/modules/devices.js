import axios from 'axios'

const state = {   
    devices:null,
    selectedDeviceTypeID:null   
};

const mutations = {   
    setDevices(state, payload) {
        state.devices = payload;
    },
    setDeviceTypeId(state,payload){
        state.selectedDeviceTypeID = payload
    }
};

const actions = {
    getDevices({commit}){
        axios.get('http://localhost:21021/api/services/app/DeviceService/GetDevices')
        .then((response) => {
            let data = response;
          commit('setDevices', data);
        })
    },

};

const getters = {
    devices(state){
        return state.devices
    },
    selectedIdType(state){
        return state.selectedDeviceTypeID
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
