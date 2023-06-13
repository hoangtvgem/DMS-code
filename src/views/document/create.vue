<template>
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Tên tài liệu" class="is-required">
          <el-input :disabled="isView" v-model="form.name" />
        </el-form-item>
        <el-form-item label="Loại tài liệu" class="is-required">
          <el-select :disabled="isView" v-model="form.type" placeholder="Chọn loại văn bản">
            <el-option v-for="item, _index in listDocumentType" :key="_index" :label="item.name" :value="item._id"/>
            <!-- <el-option label="Quy chế" value="quy_che"/>
            <el-option label="Báo cáo" value="bao_cao"/>
            <el-option label="Thông báo" value="thong_bao"/>
            <el-option label="Thu ngân" value="thu_ngan"/>
            <el-option label="Đề xuất" value="de_xuat"/>
            <el-option label="Tường trình" value="tuong_trinh"/>
            <el-option label="Khiếu nại" value="khieu_nai"/> -->
          </el-select>
        </el-form-item>
        <el-form-item label="Người sở hữu" class="is-required">
          <el-select :disabled="isView" v-model="form.owner" placeholder="Chọn người sở hữu">
            <el-option v-for="item, _index in listUser" :key="_index" :label="item.fullname" :value="item._id"/>
          </el-select>
        </el-form-item>
        <hr />
        <el-form-item label="Người duyệt" class="is-required">
          <span v-for="user, index in listUserApproval" >
            <el-select 
              v-model="listUserApproval[index]" 
              placeholder="Chọn người duyệt" 
              style="margin-right: 10px;margin-bottom: 10px;"
              :disabled="(isEdit && indexCurrent >= index) || isView"
              :class="{'is-current': (isEdit || isView) && indexCurrent == index}"
            >
              <el-option 
                v-for="
                  item, __index in listUser.filter(
                    (item) => index == 0 || 
                    index > 0 && item.position.level < getLevel(listUserApproval[index - 1])
                  )
                " 
                :key="__index"
                :label="item.fullname" 
                :value="item._id"
              />
            </el-select>
            <span v-if="!isView || (isView && index != listUserApproval.length - 1)">
              <i v-if="isView || isEdit" class="el-icon-right" style="margin-right: 10px"/>
            </span>
          </span>
          <!-- <el-button v-if="!isView" @click="onAdd">Thêm người duyệt</el-button> -->
        </el-form-item>
        <hr />
        <el-form-item label="Tải tệp lên" v-if="!(isView)" class="is-required">
          <el-upload
            class="upload-demo"
            drag
            accept="application/pdf,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :action="'/'"
            :auto-upload="false"
            :file-list="fileList"
            :on-change="handleChange"
            :disabled="!!fileList.length"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Kéo thả vào đây hoặc <em>click để chọn tệp</em></div>
            <div class="el-upload__tip" slot="tip">Chỉ được tải lên file không quá 1GB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Tệp tải lên" v-else>
          <div v-if="fileBase64 || form.viewLinkDrive">
            <label class="el-form-item__label">Xem trước</label>
            <strong style="display: inline-flex">Phiên bản:</strong><span style="display: inline-flex; margin-left: 20px">{{ form.version }}</span>
            <iframe 
              style="width: 100%; height: 600px;border: none" 
              :src="typeBase64 == 'pdf' ? fileBase64 : form.viewLinkDrive && form.viewLinkDrive.replace('/view', '/preview')"
            ></iframe>
          </div>
          <div>

          </div>
          <div v-if="fileBase64">
            <label class="el-form-item__label">SFTP Server</label>
            <a class="btn-link" target="_blank" :href="fileBase64"><i class="el-icon-download" /> Tải xuống file tài liệu</a>
          </div>
          <div style="margin-top: 20px" v-if="form.viewLinkDrive">
            <label class="el-form-item__label">Google Drive</label>
            <a class="btn-link" target="_blank" :href="form.viewLinkDrive"><i class="el-icon-view" /> Xem file tài liệu</a>
            <a class="btn-link" target="_blank" :href="form.downloadLinkDrive"><i class="el-icon-download" /> Tải xuống file tài liệu</a>
          </div>
          <!-- <div style="margin-top: 20px" v-if="form.viewLinkOneDrive">
            <label class="el-form-item__label">One Drive</label>
            <a class="btn-link" target="_blank" :href="form.viewLinkOneDrive"><i class="el-icon-view" /> Xem file tài liệu</a>
            <a class="btn-link" target="_blank" :href="form.downloadLinkOneDrive"><i class="el-icon-download" /> Tải xuống file tài liệu</a>
          </div> -->
        </el-form-item>
        <el-form-item v-if="!(isView)" label="Vị trí lưu">
          <el-checkbox-group v-model="drive">
            <el-checkbox label="SFTP Server" name="sftp" />
            <el-checkbox label="Google Drive" name="drive" />
            <!-- <el-checkbox label="One Drive" name="onedrive" /> -->
          </el-checkbox-group>
        </el-form-item>
        <template v-if="isView">
          <el-form-item label="Trạng thái">
            {{ statusDocument[form.status] }}
          </el-form-item>
          <template v-if="form.status == 'reject'">
            <el-form-item label="Lý do">
            <el-input disabled style="width: 400px;" v-model="form.reason" type="textarea" />
          </el-form-item>
          <el-form-item label="Người từ chối">
            <el-select 
              v-model="form.idUserReason" 
              placeholder="Người từ chối duyệt" 
              style="margin-right: 10px;margin-bottom: 10px;"
              :disabled="(isEdit && indexCurrent >= index) || isView"
              :class="{'is-current': (isEdit || isView) && indexCurrent == index}"
            >
              <el-option v-for="item, _index in listUser" :key="_index" :label="item.fullname" :value="item._id"/>
            </el-select>
          </el-form-item>
          </template>
        </template>
        <el-form-item v-if="!isView">
          <el-button type="primary" @click="onSubmit">Lưu</el-button>
          <el-button @click="onCancel">Hủy</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { createDocument, editDocument, getDetailDocument } from '@/api/document'
  import { getListDocumentType } from '@/api/documentType'
  import axios from 'axios'
  import { getListUser } from '@/api/user';
  import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
        form: {
          name: '',
          level: 1,
          owner: JSON.parse(localStorage.getItem("profile")).id
        },
        fileBase64: '',
        typeBase64: '',
        drive: [],
        listUser: [],
        file: null,
        fileList: [],
        value: null,
        options: ['list', 'of', 'options'],
        listUserApproval: [null],
        indexCurrent: 0,
        isEdit: this.$route.params.mode == 'edit',
        isView: this.$route.params.mode == 'view',
        listDocumentType: [],
        statusDocument: {
          created: "Đã tạo mới",
          pending: "Đang trong quá trình duyệt",
          approved: "Đã duyệt",
          cancel: "Đã bị hủy",
          reject: "Bị từ chối duyệt"
        },
      }
    },
    created () {
      this.fetchData();
      if (this.isEdit || this.isView) {
        getDetailDocument({
          id: this.$route.params.id
        }).then(response => {
          this.form = response.data.data
          const type = this.getTypeBase64(response.data.data.fileName.split(".")[1])
          this.typeBase64 = type
          this.form.version = response.data.data.version || 1
          this.fileBase64 = `data:application/${type};base64,` + response.data.file
          this.indexCurrent = this.form.process.indexOf(this.form.currentProcessId);
          this.listUserApproval = response.data.data.process
        })
      }
    },
    methods: {
      getTypeBase64(type) {
        switch (type) {
          case 'doc', 'dot': return 'msword'
          case 'docx': return 'vnd.openxmlformats-officedocument.wordprocessingml.document'
          case 'dotx': return 'vnd.openxmlformats-officedocument.wordprocessingml.template'
          case 'xls', 'xlt', 'xla': return 'vnd.ms-excel'
          case 'xlsx': return 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          case 'ppt', 'pot', 'pps', 'ppa': return 'vnd.ms-powerpoint'
          case 'pdf': return 'pdf'
        }
        return type
      },
      handleChange(data) {
        this.file = data
      },
      getLevel(id) {
        return this.listUser.filter(item => item._id == id)[0].position.level
      },
      onAdd () {
        this.listUserApproval.push(null)
      },
      async uploadFile() {
        if (this.file) {
          let formData = new FormData();
          formData.append('file', this.file.raw);
          formData.append('name', this.file.name);
          formData.append('type', this.file.raw.type);
          formData.append('drive', this.drive);
          const data = await axios.post('http://localhost:5555/api/document/upload',
            formData,
            {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': getToken()
              }
            }
          )
          return data 
        } else {
          return null
        }
        
      },
      async onSubmit() {
        const data = await this.uploadFile()
        if (!data) {
          alert("Vui lòng upload file");
          returns
        }
        if (this.isEdit) {
          editDocument({
            ...this.form,
            version: this.form.version + 1,
            viewLinkSFTP: data.data?.dataSFTP?.webViewLink,
            viewLinkDrive: data.data?.dataDrive?.webViewLink,
            downloadLinkSFTP: data.data?.dataSFTP?.webContentLink,
            downloadLinkDrive: data.data?.dataDrive?.webContentLink,
            fileName: data.data?.dataSFTP?.fileName,
            process: this.listUserApproval,
            reason: ""
          }).then(response => {
          this.$message('Cập nhật tài liệu thành công')
        })
        } else {
          this.listUserApproval.unshift(this.form.owner)
          createDocument(
            {
              ...this.form,
              version: 1,
              process: this.listUserApproval,
              currentProcessId: this.form.owner,
              viewLinkSFTP: data.data?.dataSFTP?.webViewLink,
              viewLinkDrive: data.data?.dataDrive?.webViewLink,
              downloadLinkSFTP: data.data?.dataSFTP?.webContentLink,
              downloadLinkDrive: data.data?.dataDrive?.webContentLink,
              fileName: data.data?.dataSFTP?.fileName
            }
          ).then(response => {
            this.$message('Tạo mới tài liệu thành công')
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
        getListUser().then(response => {
          this.listUser = response.data.data
        })
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
  .is-current {
    border: solid greenyellow 3px !important;
    border-radius: 4px !important;
  }
  .btn-link {
    border: solid 1px gray;
    padding: 10px;
    margin-right: 10px;
    border-radius: 4px;
  }
  </style>
  
  