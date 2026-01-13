import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  console.log("登陆用户", store.state.user.loginUser);
  const loginUser = store.state.user.loginUser;
  // 登录
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
  }
  // 鉴权
  const neededRole = to.meta?.access ?? ACCESS_ENUM.NOT_LOGIN;
  if (neededRole !== ACCESS_ENUM.NOT_LOGIN) {
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    if (!checkAccess(loginUser, neededRole)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
