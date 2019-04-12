const state = {   
    loader: false   
};

const mutations = {   
    setLoader(state, payload) {
        state.loader = payload;
    }
};

const getters = {
    loader(state){
        return state.loader;
    }
};

export default {
    state,
    mutations,
    getters
};
