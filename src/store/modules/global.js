import { toastController } from '@ionic/vue';

// initial state
const state = () => ({});

// getters
const getters = {};

// actions
const actions = {
  async showToast({}, payload) {
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
