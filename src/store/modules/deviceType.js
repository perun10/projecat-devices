import axios from 'axios'

const state = {
    deviceTypes: null,
    newDeviceTypeProperties: null,
    selectedDeviceTypeId: null,
    deviceTypeName: null,
    newDeviceTypeId: null,
    trueFalse:null,
    activeDeviceTypeID: ''
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
    setFalse(state, payload){
        state.trueFalse = payload
    },
    setActiveDeviceTypeID(state, payload){
        state.activeDeviceTypeID = payload;
    }
};

const actions = {
    getDeviceTypes({ commit }) {
        axios.get('http://localhost:21021/api/services/app/DeviceTypeService/GetDeviceTypes')
        .then((response) => {
            let data = response.data.result;
            commit('setDeviceTypes', data);
        })
    },
    createNewDeviceType({ commit }, payload) {
        axios.post('http://localhost:21021/api/services/app/DeviceTypeService/CreateOrUpdateDeviceType', payload)
        .then((response) => {
            let data = response.data.result;
            commit('setNewDeviceTypeProperties', data);
            commit('setActiveDeviceTypeID', data[data.length-1].id);
        })
    },
    deleteDeviceType({dispatch},payload){
        // console.log(payload.id)
        axios.delete('http://localhost:21021/api/services/app/DeviceTypeService/DeleteDeviceType', {
            params: {
                id: payload.id
            }
        })
        .then(()=>{
            dispatch('getDeviceTypes')
        })
        .catch(error=>{
            console.log(error.message)
        })
       

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
    },
    activeDeviceTypeID(state){
        return state.activeDeviceTypeID;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
