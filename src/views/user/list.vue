<template>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="Họ tên">
          <template slot-scope="scope">
            {{ scope.row.fullname }}
          </template>
        </el-table-column>
        <el-table-column label="Username" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Email" align="center">
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="Status" width="110" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" align="center">
          <template slot-scope="scope">
            <button class="btn-primary" @click="editUser(scope.row._id)"><i class="el-icon-edit" /></button>
            <button class="btn-danger" style="margin-left: 20px;" @click="deleteUser(scope.row._id)"><i class="el-icon-delete" /></button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { getListUser, deleteUser } from '@/api/user'
  
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getListUser().then(response => {
          this.list = response.data.data
          this.listLoading = false
        })
      },
      deleteUser(id) {
        deleteUser({
          _id: id
        }).then(response => {
          this.fetchData()
        })
      },
      editUser (id) {
        this.$router.push(`/user/${id}`)
      }
    }
  }
  </script>
  