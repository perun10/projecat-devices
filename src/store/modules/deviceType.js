import axios from 'axios'

const state = {
    deviceTypes: null
};

const mutations = {
    setDeviceTypes(state, payload) {
        state.deviceTypes = payload;
    }
};

const actions = {
    getDeviceProperties({ commit }) {
        axios.get('https://test-projekat-nr.firebaseio.com/0.json')
        .then((response) => {
            let data = response.data;
            commit('setDeviceTypes', data);
        })
    }
};

const getters = {
    deviceTypes(state) {
        return state.deviceTypes;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
