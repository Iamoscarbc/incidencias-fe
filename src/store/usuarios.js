// src/store/usuario/index.js
const state = {
    user: null,
};

const mutations = {
    LOGIN(state, data) {
        state.user = data;
    },
    LOGOUT(state) {
        state.user = null;
    }
};

const actions = {
    login({ commit }, data) {
        commit('LOGIN', data);
    },
    logout({ commit }) {
        localStorage.removeItem("token")
        localStorage.removeItem("vuex")
        commit('LOGOUT')
    }
    // actualizarEmail({ commit }, nuevoEmail) {
    //     commit('SET_EMAIL', nuevoEmail);
    // },
};

const getters = {
    isAuthenticated: (state) => !!state.user,
}

export default {
    namespaced: true, // Habilita el espacio de nombres
    state,
    mutations,
    actions,
    getters
};