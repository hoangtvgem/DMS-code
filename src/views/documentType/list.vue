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
        <el-table-column label="Tên loại tài liệu">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" align="center">
          <template slot-scope="scope">
            <button class="btn-primary" @click="editDocumentType(scope.row._id)"><i class="el-icon-edit" /></button>
            <button class="btn-danger" style="margin-left: 20px;" @click="deleteDocumentType(scope.row._id)"><i class="el-icon-delete" /></button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { getListDocumentType, deleteDocumentType } from '@/api/documentType'
  
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
        getListDocumentType().then(response => {
          this.list = response.data.data
          this.listLoading = false
        })
      },
      deleteDocumentType(id) {
        deleteDocumentType({
          _id: id
        }).then(response => {
          this.fetchData()
        })
      },
      editDocumentType(id) {
        this.$router.push(`/DocumentType/${id}`)
      }
    }
  }
  </script>
  