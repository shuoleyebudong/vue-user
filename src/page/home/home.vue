<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div class="header_left">
        <img src="../../assets/logo.png" alt />
        <span>用户后台管理系统</span>
      </div>
      <div class="header_right">
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../../assets/labi.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a
              href="https://github.com/shuoleyebudong/vue-user"
              target="_blank"
            >
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item divided command="loginout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="sidebar" :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          class="sidebar-el-menu"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :default-active="onRoutes"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <template v-for="item in items">
            <template v-if="item.subs">
              <el-submenu :index="item.index" :key="item.index">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span slot="title">{{ item.title }}</span>
                </template>
                <template v-for="subItem in item.subs">
                  <el-submenu
                    v-if="subItem.subs"
                    :index="subItem.index"
                    :key="subItem.index"
                  >
                    <template slot="title">{{ subItem.title }}</template>
                    <el-menu-item
                      v-for="(threeItem, i) in subItem.subs"
                      :key="i"
                      :index="threeItem.index"
                      >{{ threeItem.title }}</el-menu-item
                    >
                  </el-submenu>
                  <el-menu-item
                    v-else
                    :index="subItem.index"
                    :key="subItem.index"
                    >{{ subItem.title }}</el-menu-item
                  >
                </template>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.index" :key="item.index">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <!-- 内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
      items: [
        {
          icon: "el-icon-s-data",
          index: "dashboard",
          title: "首页"
        },
        {
          icon: "el-icon-user-solid",
          index: "table",
          title: "基础表格"
        },
        {
          icon: "el-icon-s-claim",
          index: "7",
          title: "错误处理",
          subs: [
            {
              index: "401",
              title: "401页面"
            },
            {
              index: "404",
              title: "404页面"
            }
          ]
        }
      ],
      name: "Fenglei"
    };
  },
  created() {
    // 把从vuex 拿到的侧边栏数据 放到 侧边栏中
    // 如果数据不匹配需要对数据做处理
    console.log(this.rightList);
    // this.items = this.rightList
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
    ...mapState(["rightList", "username"])
  },
  methods: {
    handleCommand(command) {
      if (command == "loginout") {
        //删除sessionStorage中的数据
        sessionStorage.clear()        
        this.$router.push("/login");
        // window.location.reload()
      }
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  .header_left {
    margin-left: 10px;
    height: 60px;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    span {
      color: #fff;
      font-size: 20px;
      margin-left: 15px;
    }
  }
  .header_right {
    display: flex;
    align-items: center;
    .user-avator {
      margin-left: 20px;
      img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .user-name {
      margin-left: 10px;
      .el-dropdown-link {
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.sidebar {
  display: block;
  background-color: #333744;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
.el-main {
  background-color: #eaedf1;
}
</style>
