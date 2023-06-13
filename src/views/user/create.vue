<template>
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="120px" class="is-required">
        <el-form-item label="Họ và tên">
          <el-input v-model="form.fullname" />
        </el-form-item>
        <el-form-item label="Username" class="is-required">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Email" class="is-required">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Số điện thoại">
          <el-input v-model="form.telephone" />
        </el-form-item>
        <el-form-item label="Giới tính" class="is-required">
          <el-select v-model="form.sex" placeholder="Chọn giới tính">
            <el-option label="Nam" :value="0" />
            <el-option label="Nữ" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="Ngày sinh" class="is-required">
          <el-col :span="11">
            <el-date-picker v-model="form.birthday" type="date" placeholder="Chọn ngày sinh" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="Trạng thái" class="is-required">
          <el-radio-group v-model="form.status">
            <el-radio label="Active"/>
            <el-radio label="Deactive"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Chức vụ" class="is-required">
          <el-select v-model="form.position" placeholder="Chọn Chức vụ">
            <el-option v-for="item in listPosition" :label="item.name" :value="item._id"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Lưu</el-button>
          <el-button @click="onCancel">Hủy</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { getListPosition } from '@/api/position'
  import { createUser, getDetailUser, editUser } from '@/api/user'  
  export default {
    data() {
      return {
        form: {
          fullname: '',
          username: '',
          email: '',
          telephone: '',
          sex: 0,
          birthday: '',
          position: '',
          status: "Active",
          password: "12345678"
        },
        listPosition: []
      }
    },
    created () {
      this.fetchData()
      if (this.$route.params.id) {
        getDetailUser({
          id: this.$route.params.id
        }).then(response => {
          this.form = response.data.data
        })
      }
    },
    methods: {
      onSubmit() {
        if (this.$route.params.id) {
          editUser(this.form).then(response => {
          this.$message('Cập nhật user thành công')
        })
        } else {
          createUser(this.form).then(response => {
          this.$message('Tạo mới user thành công')
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
      }
    }
  }
  </script>
  
  <style scoped>
  .line{
    text-align: center;
  }
  </style>
  
  