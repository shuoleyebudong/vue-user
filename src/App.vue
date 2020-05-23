<template>
  <div id="app">
    <el-button type="success">成功按钮</el-button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
/* 引入重置样式 */
@import "assets/css/base.css";
</style>
