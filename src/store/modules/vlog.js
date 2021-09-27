import axios from 'axios';

// initial state
const state = () => ({
  recommendedVlogs: {},
  currentUserVlogs: {},
});

// getters
const getters = {
  recommendedVlogs: (state) => state.recommendedVlogs,
  currentUserVlogs: (state) => state.currentUserVlogs,
};

// actions
const actions = {
  async fetchRecommendedVlogs({ commit }) {
    try {
      const response = await axios.get(
        `${axios.defaults.baseURL}/vlog/wrappers-recommended`
      );
      if (response) {
        commit('setRecommendedVlogs', response.data);
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async fetchCurrentUserVlogs({ commit }, payload) {
    console.log(payload);

    try {
      const response = await axios.get(
        `${axios.defaults.baseURL}/vlog/wrappers-for-user/${payload}?SortingOrder=2`
      );
      if (response) {
        commit('setCurrentUserVlogs', response.data);
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },
};

// mutations
const mutations = {
  setRecommendedVlogs: (state, recommendedVlogs) =>
    (state.recommendedVlogs = recommendedVlogs),
  setCurrentUserVlogs: (state, currentUserVlogs) =>
    (state.currentUserVlogs = currentUserVlogs),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
