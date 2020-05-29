<template>
  <div class="table" v-loading="loading">
    <!-- 面包屑 -->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 搜索区域 -->
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="handle-del mr10"
          @click="addClick"
          v-permission="{ action: 'add' }"
          >添加按钮</el-button
        >
        <el-input
          placeholder="用户名"
          class="handle-input mr10"
          v-model="searchName"
          clearable
          @keyup.enter.native="searchCabinet"
          @clear="clear"
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          v-permission="{ action: 'search' }"
          @click="searchCabinet"
          >搜索按钮</el-button
        >
      </div>
      <!-- 表格区域 -->
      <el-table class="table" :data="tableData" border>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="editClick(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="deleteClick(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加 弹窗区域 -->
    <el-dialog title="添加弹出框" :visible.sync="addDialog" width="30%">
      <el-form
        :model="addForm"
        ref="addFormRef"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addFormRef')"
            >提交</el-button
          >
          <el-button @click="resetForm('addFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑 弹窗区域 -->
    <el-dialog title="编辑弹出框" :visible.sync="editDialog" width="30%">
      <el-form
        :model="editForm"
        ref="editFormRef"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('editFormRef')"
            >提交</el-button
          >
          <el-button @click="resetForm('editFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      pageNo: 1, //页数
      pageSize: 10, // 条数
      currentPage4: 1, //当前页
      total: 1, // 总条数
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ], // 主表格数据
      searchName: "",
      addDialog: false, // 控制   添加   弹出框的显示隐藏
      editDialog: false, // 控制   编辑   弹出框的显示隐藏
      addForm: {
        name: ""
      }, // 添加   表单的数据
      editForm: {
        name: ""
      }, // 编辑  表单的数据
      rules: {
        name: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        sort: [
          { required: true, message: "请输入权限排序", trigger: "blur" },
          { type: "number", message: "权限排序必须为数字值" }
        ]
      } // 表单验证
    };
  },
  methods: {
    // 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    // 第几页
    handleCurrentChange(val) {
      this.pageNo = val;
      console.log(`当前页: ${val}`);
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 判断表单是否有值
        if (valid) {
          //判断是否是添加权限  创建商户信息
          if (formName == "addFormRef") {
            this.addFromSubmit();
          }
          if (formName == "editFormRef") {
            this.editFromSubmit();
          }
        } else {
          this.$message({
            message: "请确认您的信息是否填写完整",
            type: "warning",
            center: true,
            duration: 1000
          });
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      if (formName == "addFormRef") {
        this.$refs[formName].resetFields();
        this.addDialog = false;
      }
      if (formName == "editFormRef") {
        this.$refs[formName].resetFields();
        this.editDialog = false;
      }
    },
    //点击  添加  按钮
    addClick() {
      this.addDialog = true;
    },
    // 添加功能提交
    addFromSubmit() {
      this.addDialog = false;
      console.log(this.addForm.name);
    },
    //点击  编辑  按钮
    editClick(index, row) {
      this.editDialog = true;
    },
    // 编辑功能提交
    editFromSubmit() {
      this.editDialog = false;
      console.log(this.editForm.name);
    },
    //点击  删除  按钮
    deleteClick(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //点击  搜索  按钮
    searchCabinet() {
      this.loading = true;
      this.$message({
        type: "success",
        message: "搜索成功"
      });
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    //清空搜索框
    clear() {
      this.$message({
        type: "success",
        message: "重置成功"
      });
      this.searchName = "";
    }
  }
};
</script>

<style lang="less" scoped>
.crumbs {
  margin-bottom: 20px;
}
.mr10 {
  margin-right: 10px;
}
.handle-box {
  margin-bottom: 20px;
  .handle-select {
    width: 120px;
  }
  .handle-input {
    width: 300px;
    display: inline-block;
  }
}
.box-card {
  .table {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
