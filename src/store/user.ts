import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      userRole: "notLogin",
    },
  }),
  actions: {
    getLoginUser({ commit, state }, payLoad) {
      commit("updateUser", payLoad);
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
