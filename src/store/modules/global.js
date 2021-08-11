import { toastController } from '@ionic/vue';

// initial state
const state = () => ({});

// getters
const getters = {};

// actions
const actions = {
  async showToast({}, payload) {
    if (typeof payload === 'object') {
      if (payload.errors[Object.keys(payload.errors)[0]]) {
        payload = payload.errors[Object.keys(payload.errors)[0]];
      }
    }
    const toast = await toastController.create({
      componentProps: { parent: this },
      message: payload,
      duration: 3000,
    });

    await toast.present();
  },
};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
