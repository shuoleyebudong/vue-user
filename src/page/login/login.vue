<template>
  <div class="login">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="logo_box">
        <img src="../../assets/logo.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-lock"
            show-password
            type="password"
            @keyup.enter.native="login('formRef')"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login('formRef')">登录</el-button>
          <el-button type="info" @click="resetForm('formRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginCheck } from "../../network/login";
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //重置
    resetForm(formRef) {
      this.$refs[formRef].resetFields();
    },
    //登陆
    login(formRef) {
      this.$refs[formRef].validate(valid => {
        if (!valid) return false;
        loginCheck(this.form.username, this.form.password).then(res => {
          if (res.status !== 200) {
            this.$message({
              message: "警告哦，这是一条警告消息",
              type: "warning"
            });
          } else {
            console.log(res);
            //调用vuex中的setRightList方法，把得到的  侧边栏数据  存储到vuex中
            // this.$store.commit("setRightList", res.data);
            this.$store.commit("setUsername", res.data.data.username);
            this.$store.commit("setToken", res.data.data.token);
            this.$router.push("/home");
            this.$message({
              message: "恭喜你，这是一条成功消息",
              type: "success"
            });
          }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  background: url(../../assets/login-bg.jpg) no-repeat;
  background-size: 100% 100%;
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 251, 240, 0.2);

  .logo_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: center;
  }
}
</style>
