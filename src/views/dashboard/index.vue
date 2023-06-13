<template>
  <div class="dashboard-container">
    <div><strong>Họ và tên: </strong>{{ user.username }}</div>
    <div><strong>Email: </strong>{{ user.email }}</div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple p-2 mt-2">
          <a href="/document/list-created" class="header-name">
            Tài liệu tạo mới
          </a>
          <div class="content-name">
            {{ data.created }}
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple p-2 mt-2">
          <a href="/document/list-pending" class="header-name">
            Tài liệu chờ duyệt
          </a>
          <div class="content-name">
            {{ data.pending }}
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple p-2 mt-2">
          <a href="/document/list-publish" class="header-name">
            Tài liệu chờ ban hành
          </a>
          <div class="content-name">
            {{ data.approved }}
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple p-2 mt-2">
          <a href="/document/list" class="header-name">
            Tài liệu đã ban hành
          </a>
          <div class="content-name" style="color: #4bad4b">
            {{ data.publish }}
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple p-2 mt-2">
          <a href="/document/list-reject" class="header-name">
            Tài liệu bị từ chối duyệt
          </a>
          <div class="content-name" style="color: #bd3b3b">
            {{ data.reject }}
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple p-2 mt-2">
          <a href="/document/list-waiting-approve" class="header-name">
            Tài liệu duyệt
          </a>
          <div class="content-name" style="color: #a8a800">
            {{ data.waitingApprove }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDashboardDocument } from '@/api/document'

export default {
  name: 'Dashboard',
  data () {
    return {
      user: JSON.parse(localStorage.getItem("profile")),
      data: {
        approved: 0,
        created: 7,
        pending: 1,
        publish: 0,
        reject: 0,
        waitingApprove: 0
      }
    }
  },
  created() {
    getDashboardDocument().then(response => {
      this.data = response.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.p-2 {
  padding: 20px
}

.mt-2 {
  margin-top: 20px
}
.header-name {
  font-weight: bold;
  font-size: 16px;
}
.content-name {
  margin-top: 20px;
  font-size: 50px;
  color: #808080;
}
</style>
