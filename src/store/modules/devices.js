import axios from 'axios'

const state = {   
    devices:null   
};

const mutations = {   
    setDevices(state, payload) {
        state.devices = payload;
    }
};

const actions = {
    getDevices({commit}){
        axios.get('http://localhost:21021/api/services/app/DeviceService/GetAllDevices')
        .then((response) => {
            let data = response;
          commit('setDevices', data);
        })
    }
};

const getters = {
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
