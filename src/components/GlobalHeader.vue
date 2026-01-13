<template>
  <a-row id="globalHeader" class="grid-demo" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/minioj-logo.svg" />
            <div class="title">mini OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { computed } from "vue";

const router = useRouter();
const store = useStore();

// // 过滤需要展示的菜单项
// const visibleRoutes = routes.filter((item, index) => {
//   // 过滤需要隐藏的菜单项
//   if (item.meta?.hideInMenu) {
//     return false;
//   }
//   // 根据权限过滤需要展示的菜单项
//   if (!checkAccess(loginUser, item?.meta?.access as string)) {
//     return false;
//   }
//   return true;
// });

const visibleRoutes = computed(() => {
  // 过滤需要展示的菜单项
  return routes.filter((item, index) => {
    // 过滤需要隐藏的菜单项
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤需要展示的菜单项
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// 默认选中主页
const selectedKeys = ref(["/"]);

router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
  selectedKeys.value = [key];
};

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "mingle",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);
</script>
