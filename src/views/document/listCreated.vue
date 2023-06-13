<template>
  <div class="app-container">
    <el-input v-model="form.name" style="margin-bottom: 20px" placeholder="Tìm kiếm tên tài liệu"/>
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
      <el-table-column label="Tên tài liệu">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="Người sở hữu" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ownerName }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="Trạng thái" align="center">
        <template slot-scope="scope">
          <span>{{ statusDocument[scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 'pending'">
            <button v-if="scope.row.currentProcessId == idProfile" style="margin-right: 20px" class="btn-primary" @click="approveDocument(scope.row)">Duyệt</button>   
            <button v-if="scope.row.currentProcessId == idProfile" style="margin-right: 20px" class="btn-danger" @click="showModal(scope.row)">Từ chối</button>      
          </span>
          <button v-if="scope.row.status == 'created' && scope.row.owner == idProfile" style="margin-right: 20px" class="btn-primary" @click="requestDocument(scope.row)">Yêu cầu duyệt</button>
          <button class="btn-primary" style="margin-right: 20px" @click="viewDocument(scope.row._id)"><i class="el-icon-view"/></button>
          <button v-if="scope.row.owner == idProfile" class="btn-primary" @click="editDocument(scope.row._id)"><i class="el-icon-edit" /></button>
          <button v-if="scope.row.owner == idProfile" class="btn-danger" style="margin-left: 20px;" @click="deleteDocument(scope.row._id)"><i class="el-icon-delete" /></button>
        </template>
      </el-table-column>
    </el-table>
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
    >
      <template v-slot:header>
        Lý do từ chối duyệt 
      </template>

      <template v-slot:body>
        <el-form ref="form" :model="form" label-width="0px">
          <el-form-item>
            <el-input style="width: 400px;" v-model="form.reason" type="textarea" />
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <button
          type="button"
          class="btn-green"
          style="width: 50px; display: inline-flex;"
          @click="rejectDocument()"
          aria-label="Close modal"
        >
          Lưu
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
import { getListDocument, deleteDocument, editDocument } from '@/api/document'
import Modal from '@/components/modal.vue'

export default {
  components: {
    Modal,
  },
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
      listLoading: true,
      idProfile: JSON.parse(localStorage.getItem("profile")).id,
      statusDocument: {
        created: "Đã tạo mới",
        pending: "Đang trong quá trình duyệt",
        approved: "Đã duyệt",
        cancel: "Đã bị hủy",
        reject: "Bị từ chối duyệt"
      },
      isModalVisible: false,
      form: {
        reason: ''
      },
      dataReject: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    showModal(data) {
      this.dataReject = data
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    fetchData() {
      this.getList()
    },
    getList(){
      this.listLoading = true
      getListDocument({
        isCreated: true
      }).then(response => {
        this.list = response.data.data
        this.listLoading = false
      })
    },
    approveDocument(data) {
      editDocument({
        ...data,
        currentProcessId: data.process[data.process.indexOf(this.idProfile) + 1] || data.currentProcessId
      }).then(response => {
        this.getList()
        this.$message('Duyệt tài liệu thành công')
      })
    },
    rejectDocument() {
      editDocument({
        ...this.dataReject,
        idUserReason: this.dataReject.currentProcessId,
        currentProcessId: this.dataReject.process[0],
        status: "reject",
        reason: this.form.reason,
      }).then(response => {
        this.getList()
        this.closeModal()
        this.$message('Từ chối duyệt tài liệu thành công')
      })
    },
    requestDocument(data) {
      editDocument({
        ...data,
        currentProcessId: data.process[1],
        status: "pending"
      }).then(response => {
        this.getList()
        this.$message('Yêu cầu duyệt tài liệu thành công')
      })
    },
    deleteDocument(id) {
      deleteDocument({
        _id: id
      }).then(response => {
        this.fetchData()
      })
    },
    editDocument(id) {
      this.$router.push(`/document/${id}/edit`)
    },
    viewDocument(id) {
      this.$router.push(`/document/${id}/view`)
    }
  }
}
</script>
