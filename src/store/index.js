import { createStore, createLogger } from 'vuex';
import auth from './modules/auth';
import global from './modules/global';
import user from './modules/user';

export default new createStore({
  modules: {
    auth,
    global,
    user,
  },
  plugins: [createLogger()],
});
