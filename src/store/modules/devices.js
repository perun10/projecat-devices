import axios from 'axios'

const state = {   
    devices:null,
    selectedDeviceTypeID:null   ,
    tab: 'newDevice',
    editDeviceMode: false,
    deviceParentID: null,
    activeDevice: [],
    activeDeviceProperties: []
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
    },
    setEditDeviceMode(state, payload) {
        state.editDeviceMode = payload;
    },
    setDeviceParentID(state, payload) {
        state.deviceParentID = payload;
    },
    setActiveDevice(state, payload) {
        state.activeDevice = payload;
    },
    setActiveDeviceProperties(state, payload) {
        state.activeDeviceProperties = payload;
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
    },
    async getDeviceTypePropertiesEditMode({ commit }, payload) {
        commit('setLoader', true);
        await axios.get('http://localhost:21021/api/services/app/DeviceService/GetDeviceTypesWithPropValues', {
            params: {
                deviceId: payload.deviceId,
                deviceTypeId: payload.deviceTypeId
            }
        }
        ).then((response) => {
            let data = [];
            data.push(response.data.result);
            console.log(data, 'data')
            commit('setActiveDeviceProperties', data);
            commit('setLoader', false);
        });
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
    },
    editDeviceMode(state) {
        return state.editDeviceMode;
    },
    deviceParentID(state) {
        return state.deviceParentID;
    },
    activeDevice(state) {
        return state.activeDevice;
    },
    activeDeviceProperties(state) {
        return state.activeDeviceProperties;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
