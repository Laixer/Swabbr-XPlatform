import axios from 'axios';

// initial state
const state = () => ({
  recommendedVlogs: [],
  recommendedVlogsIndex: 0,
  currentUserVlogs: {},
});

// getters
const getters = {
  recommendedVlogs: (state) => state.recommendedVlogs,
  currentUserVlogs: (state) => state.currentUserVlogs,
};

// actions
const actions = {
  async fetchRecommendedVlogs({ commit }, payload) {
    try {
      const response = await axios.get(
        `${axios.defaults.baseURL}/vlog/wrappers-recommended?SortingOrder=2&offset=${payload.offset}&limit=${payload.limit}`
      );
      if (response) {
        commit('setRecommendedVlogs', response.data);
        return 'duno';
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async fetchCurrentUserVlogs({ commit }, payload) {
    console.log(payload);

    try {
      const response = await axios.get(
        `${axios.defaults.baseURL}/vlog/wrappers-for-user/${payload}?SortingOrder=2&offset=0&limit=10`
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
  // setRecommendedVlogs: (state, recommendedVlogs) =>
  //   (state.recommendedVlogs = state.recommendedVlogs.push(...recommendedVlogs)),
  setRecommendedVlogs: (state, recommendedVlogs) =>
    state.recommendedVlogs.push(...recommendedVlogs),
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
