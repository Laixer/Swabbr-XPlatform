import axios from 'axios';

// initial state
const state = () => ({
  token: localStorage.getItem('access_token') || null,
});

// getters
const getters = {};

// actions
const actions = {
  checkAuth({ commit }) {
    const state = this.state.user;
    return new Promise((resolve) => {
      commit('checkAuth', { authChecked: true, user: state.user });
      resolve(true);
    });
  },

  async register({}, payload) {
    try {
      const response = await axios.post(
        `${axios.defaults.baseURL}/authentication/register`,
        payload
      );
      if (response) {
        return true;
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async login({ commit }, payload) {
    try {
      const response = await axios.post(
        `${axios.defaults.baseURL}/authentication/login`,
        payload
      );
      if (response) {
        localStorage.setItem('access_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);

        commit('loggedin', response.data.token);
        const user = await this.dispatch('user/self');

        return user;
      }
    } catch (error) {
      this.dispatch('global/showToast', error.response.data);
    }
  },

  async logout({}) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return true;
  },
};

// mutations
const mutations = {
  logout: (state) => (state.isAuthenticated = false),

  loggedin: (state, token) => {
    state.token = token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
