import axios from 'axios'

const state = {   
    devices:null,
    selectedDeviceTypeID:null   ,
    tab: 'newDevice'
};

const mutations = {   
    setDevices(state, payload) {
        state.devices = payload;
    },
    setDeviceTypeId(state,payload){
        state.selectedDeviceTypeID = payload
    },
    setTabLocation(state,payload){
        state.tab = payload
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
    deleteDevice({ commit, dispatch }, payload) {
        commit('setLoader', true);
        axios.delete('http://localhost:21021/api/services/app/DeviceService/DeleteDevice', {
            params: {
                id: payload.id
            }
        })
        .then(()=>{
            dispatch('getDevices');
            commit('setLoader', false);
        })
        .catch(error=>{
            console.log(error.message);
            commit('setLoader', false);
        }) 
    }

};

const getters = {
    devices(state){
        return state.devices
    },
    selectedIdType(state){
        return state.selectedDeviceTypeID
    },
    tabLocation(state){
        return state.tab
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
