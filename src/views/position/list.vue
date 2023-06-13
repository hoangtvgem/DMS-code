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
        <el-table-column label="Tên Chức vụ">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="Cấp độ" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.level }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" align="center">
          <template slot-scope="scope">
            <button class="btn-primary" @click="editPosition(scope.row._id)"><i class="el-icon-edit" /></button>
            <button class="btn-danger" style="margin-left: 20px;" @click="deletePosition(scope.row._id)"><i class="el-icon-delete" /></button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { getListPosition, deletePosition } from '@/api/position'
  
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
        getListPosition().then(response => {
          this.list = response.data.data
          this.listLoading = false
        })
      },
      deletePosition(id) {
        deletePosition({
          _id: id
        }).then(response => {
          this.fetchData()
        })
      },
      editPosition(id) {
        this.$router.push(`/position/${id}`)
      }
    }
  }
  </script>
  