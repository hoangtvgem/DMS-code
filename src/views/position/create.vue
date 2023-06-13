<template>
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Tên Chức vụ" class="is-required">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Phòng ban" class="is-required">
          <el-select v-model="form.department" placeholder="Chọn Chức vụ">
            <el-option v-for="item in listDepartment" :label="item.name" :value="item._id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Cấp độ" class="is-required">
          <el-input type="number" v-model="form.level" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Lưu</el-button>
          <el-button @click="onCancel">Hủy</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { getListPosition, createPosition, editPosition, getDetailPosition } from '@/api/position' 
  import { getListDepartment } from '@/api/department' 
  export default {
    data() {
      return {
        form: {
          name: '',
          level: 1,
        },
        listPosition: [],
        listDepartment: []
      }
    },
    created () {
      this.fetchData();
      if (this.$route.params.id) {
        getDetailPosition({
          id: this.$route.params.id
        }).then(response => {
          this.form = response.data.data
        })
      }
    },
    methods: {
      onSubmit() {
        if (this.$route.params.id) {
          editPosition(this.form).then(response => {
          this.$message('Cập nhật Chức vụ thành công')
        })
        } else {
          createPosition(this.form).then(response => {
          this.$message('Tạo mới Chức vụ thành công')
        })
        }
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      },
      fetchData() {
        getListPosition().then(response => {
          this.listPosition = response.data.data
        })
        getListDepartment().then(response => {
          this.listDepartment = response.data.data
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .line{
    text-align: center;
  }
  </style>
  
  