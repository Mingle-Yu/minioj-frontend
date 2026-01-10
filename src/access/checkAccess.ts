import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 判断当前用户是否有权限
 * @param user 当前用户
 * @param neededAccess 需要的权限
 * @return boolean 是否有权限
 */
const checkAccess = (user: any, neededAccess = ACCESS_ENUM.NOT_LOGIN) => {
  // 获取当前用户的权限
  const userAccess = user?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  // 不需要权限
  if (neededAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 需要普通用户登录
  if (neededAccess === ACCESS_ENUM.USER) {
    if (userAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 需要管理员登录
  if (neededAccess === ACCESS_ENUM.ADMIN) {
    if (userAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
