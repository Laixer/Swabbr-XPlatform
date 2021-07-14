import { createStore } from 'vuex';
import auth from './modules/auth';
import global from './modules/global';

export default new createStore({
  modules: {
    auth,
    global,
  },
});
