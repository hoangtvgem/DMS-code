<template>
  <div class="app-container">
    <label>Cấu hình SFTP Server</label>
    <el-form style="margin-top: 20px" ref="form" :model="form" label-width="120px">
      <el-form-item label="JSON">
        <el-input v-model="form.sftp" rows="10" type="textarea" />
      </el-form-item>
    </el-form>
    <label>Cấu hình Google Drive</label>
    <el-form style="margin-top: 20px" ref="form" :model="form" label-width="120px">
      <el-form-item label="JSON">
        <el-input v-model="form.googledrive" rows="10" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Lưu</el-button>
        <el-button @click="onCancel">Hủy</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDetailSetting, editSetting } from '@/api/setting' 
export default {
  data() {
    return {
      form: {
        sftp: '',
        googledrive: '',
      },
      listPosition: []
    }
  },
  created () {
    getDetailSetting().then(response => {
      this.form.sftp = JSON.stringify(response.data.data.sftp)
      console.log(this.form.sftp)
      this.form.googledrive = JSON.stringify(response.data.data.googleDrive)
    })
  },
  methods: {
    onSubmit() {
      editSetting(this.form).then(response => {
        this.$message('Cập nhật cấu hình thành công')
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

