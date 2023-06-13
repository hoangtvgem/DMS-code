<template>
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="20s0px">
        <el-form-item label="Tên loại tài liệu" class="is-required">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Mô tả" class="is-required">
          <el-input type="text" v-model="form.description" />
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
          description: '',
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
          this.$message('Cập nhật loại văn bản thành công')
        })
        } else {
          createDocumentType(this.form).then(response => {
          this.$message('Tạo mới loại văn bản thành công')
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
  
  