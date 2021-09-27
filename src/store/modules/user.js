import axios from 'axios';

// initial state
const state = () => ({
  self: {},
  selfStats: {},
  likedVlogs: {},
  selectedUser: {},
  selectedUserStats: {},
  selectedUserFollowing: {},
  selectedUserFollowers: {},
  selectedUserRequested: {},
});

// getters
const getters = {
  self: (state) => state.self,
  stats: (state) => state.stats,
  likedVlogs: (state) => state.likedVlogs,
  selectedUser: (state) => state.selectedUser,
  selectedUserStats: (state) => state.selectedUserStats,
  selectedUserFollowing: (state) => state.selectedUserFollowing,
  selectedUserFollowers: (state) => state.selectedUserFollowers,
  selectedUserRequested: (state) => state.selectedUserRequested,
};

// actions
const actions = {
  async self({ commit }) {
    try {
      const response = await axios.get(`${axios.defaults.baseURL}/user/self`);
      if (response) {
        commit('setSelf', response.data);
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
        commit('setSelfStats', response.data);
        return response.data;
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async fetchSelectedUser({ commit }, payload) {
    try {
      const response = await axios.get(
        `${axios.defaults.baseURL}/user/${payload}`
      );
      if (response) {
        commit('setSelectedUser', response.data);
        return response.data;
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async fetchSelectedUserStats({ commit }, payload) {
    try {
      const response = await axios.get(
        `${axios.defaults.baseURL}/user/${payload}/statistics`
      );
      if (response) {
        commit('setSelectedUserStats', response.data);
        return response.data;
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async updateProfile({}, payload) {
    try {
      const response = await axios.put(
        `${axios.defaults.baseURL}/user`,
        payload
      );
      if (response) {
        this.dispatch('global/showToast', 'Changes saved!');

        return true;
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async fetchSelectedUserFollowing({ commit }, payload) {
    try {
      const response = await axios.get(
        `${axios.defaults.baseURL}/user/${payload}/following`
      );
      if (response) {
        commit('setSelectedUserFollowing', response.data);
        return response.data;
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async fetchSelectedUserFollowers({ commit }, payload) {
    try {
      const response = await axios.get(
        `${axios.defaults.baseURL}/user/${payload}/followers`
      );
      if (response) {
        commit('setSelectedUserFollowers', response.data);
        return response.data;
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async fetchSelectedUserRequested({ commit }) {
    try {
      const response = await axios.get(
        `${axios.defaults.baseURL}/user/follow-requesting-users`
      );
      if (response) {
        commit('setSelectedUserRequested', response.data);
        return response.data;
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async respondToRequest({}, payload) {
    try {
      const response = await axios.put(
        `${axios.defaults.baseURL}/followrequest/${payload.status}?requesterId=${payload.requestingUserId}`
      );
      if (response) {
        // commit('setSelectedUserRequested', response.data);
        if (response.status == 204) {
          return true;
        }
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async fetchLikedVlogs({ commit }) {
    try {
      const response = await axios.get(
        `${axios.defaults.baseURL}/user/vlog-liking-users`
      );
      if (response) {
        commit('setLikedVlogs', response.data);
        return response.data;
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  // async uploadProfileImage({}, payload) {
  //   try {
  //     const response = await axios.put(payload.user.profileImageUploadUri, {});
  //     if (response) {
  //       // commit('setUser', response.data);
  //       return response.data;
  //     }
  //   } catch (error) {
  //     this.dispatch('global/showToast', error.response.data);
  //   }
  // },

  async unfollowUser({}) {
    // try {
    // }
  },
};

// mutations
const mutations = {
  setSelf: (state, self) => (state.self = self),
  setSelfStats: (state, selfStats) => (state.selfStats = selfStats),
  setLikedVlogs: (state, likedVlogs) => (state.likedVlogs = likedVlogs),
  setSelectedUser: (state, selectedUser) => (state.selectedUser = selectedUser),
  setSelectedUserStats: (state, selectedUserStats) =>
    (state.selectedUserStats = selectedUserStats),
  setSelectedUserFollowing: (state, selectedUserFollowing) =>
    (state.selectedUserFollowing = selectedUserFollowing),
  setSelectedUserFollowers: (state, selectedUserFollowers) =>
    (state.selectedUserFollowers = selectedUserFollowers),
  setSelectedUserRequested: (state, selectedUserRequested) =>
    (state.selectedUserRequested = selectedUserRequested),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
