import { createStore } from 'vuex';
import usuariosModule from './usuarios'
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  plugins: [createPersistedState()],
  modules: {
    usuarios: usuariosModule
  },
});

export default store;