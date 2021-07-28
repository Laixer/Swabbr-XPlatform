import axios from 'axios';

// initial state
const state = () => ({
  user: {},
  stats: {},
});

// getters
const getters = {
  user: (state) => state.user,
  stats: (state) => state.stats,
};

// actions
const actions = {
  async self({ commit }) {
    try {
      const response = await axios.get(`${axios.defaults.baseURL}/user/self`);
      if (response) {
        commit('setUser', response.data);
        return response.data;
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async selfStats({ commit }) {
    try {
      const response = await axios.get(
        `${axios.defaults.baseURL}/user/self/statistics`
      );
      if (response) {
        commit('setUserStats', response.data);
        return response.data;
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async uploadProfileImage({}, payload) {
    try {
      // const body = new FormData();

      // body.append('file', payload);

      const response = await axios.put(payload.user.profileImageUploadUri, {});
      if (response) {
        // commit('setUser', response.data);
        return response.data;
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },
};

// mutations
const mutations = {
  setUser: (state, user) => (state.user = user),
  setUserStats: (state, stats) => (state.stats = stats),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
