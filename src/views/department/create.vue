<template>
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="20s0px">
        <el-form-item label="Tên phòng ban" class="is-required">
          <el-input v-model="form.name" />
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
  import { getListDocumentType, createDocumentType, editDocumentType, getDetailDocumentType } from '@/api/documentType' 
  export default {
    data() {
      return {
        form: {
          name: '',
          level: 1,
        },
        listDocumentType: []
      }
    },
    created () {
      this.fetchData();
      if (this.$route.params.id) {
        getDetailDocumentType({
          id: this.$route.params.id
        }).then(response => {
          this.form = response.data.data
        })
      }
    },
    methods: {
      onSubmit() {
        if (this.$route.params.id) {
          editDocumentType(this.form).then(response => {
          this.$message('Cập nhật phòng ban thành công')
        })
        } else {
          createDocumentType(this.form).then(response => {
          this.$message('Tạo mới phòng ban thành công')
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
        getListDocumentType().then(response => {
          this.listDocumentType = response.data.data
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
  
  