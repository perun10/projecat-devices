import axios from 'axios'

const state = {
    deviceTypes: null,
    newDeviceTypeProperties: null,
    selectedDeviceTypeId: null,
    deviceTypeName: null,
    newDeviceTypeId: null,
    trueFalse:null,
    activeDeviceTypeID: '',
    activeDeviceType: [],
    editMode: false
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
    },
    setActiveDeviceType(state, payload){
        state.activeDeviceType = payload;
    },
    setEditMode(state, payload) {
        state.editMode = payload;
    }
};

const actions = {
    getDeviceTypes({ commit }) {
        commit('setLoader', true);
        axios.get('http://localhost:21021/api/services/app/DeviceTypeService/GetDeviceTypes')
        .then((response) => {
            let data = response.data.result;
            commit('setDeviceTypes', data);
            commit('setLoader', false);
        })
    },
    createNewDeviceType({ commit }, payload) {
        commit('setLoader', true);
        axios.post('http://localhost:21021/api/services/app/DeviceTypeService/CreateOrUpdateDeviceType', payload)
        .then((response) => {
            let data = response.data.result;
            commit('setNewDeviceTypeProperties', data);
            commit('setActiveDeviceTypeID', data[data.length-1].id);
            commit('setActiveDeviceType', data[data.length-1]);
            commit('setLoader', false);
        })
    },
    deleteDeviceType({commit, dispatch},payload){
        commit('setLoader', true);
        axios.delete('http://localhost:21021/api/services/app/DeviceTypeService/DeleteDeviceType', {
            params: {
                id: payload.id
            }
        })
        .then(()=>{
            dispatch('getDeviceTypes');
            commit('setLoader', false);
        })
        .catch(error=>{
            console.log(error.message);
            commit('setLoader', false);
        })    

    },
    getDeviceTypeProperties({commit},payload){
        commit('setLoader', true);
        axios.get('http://localhost:21021/api/services/app/DeviceTypeService/GetDeviceTypesWithProperties',{
            params: {
                id: payload
            }
        })
        .then(response => {
            let data = response.data.result
            commit('setNewDeviceTypeProperties',data)           
            commit('setLoader', false);
        }
            )
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
    },
    activeDeviceType(state){
        return state.activeDeviceType;
    },
    editMode(state) {
        return state.editMode;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
