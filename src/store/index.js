import { createStore, createLogger } from 'vuex';
import auth from './modules/auth';
import global from './modules/global';
import user from './modules/user';
import vlog from './modules/vlog';

export default new createStore({
  modules: {
    auth,
    global,
    user,
    vlog,
  },
  plugins: [createLogger()],
});
