<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :http-request="handleUpload"
      :show-file-list="config.showFile"
      :accept="config.accept"
      :multiple="config.multiple"
      :limit="config.limit || 1"
      :on-exceed="handleExceed"
      :before-upload="handleBeforeUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="handleBeforeRemove"
    >
      <el-button v-if="model === 'button'" size="small" type="primary"
        >点击上传</el-button
      >

      <div v-if="model === 'card'" class="upload-card" :style="[sizeBox]">
        <!-- 删除图标 -->
        <i
          class="el-icon-delete deleteIcon"
          v-if="imageUrl"
          @click.stop="handleDelete"
        ></i>

        <img
          v-if="imageUrl"
          style="max-width: 100%; max-height: 100%"
          :src="imageUrl"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </el-upload>
  </div>
</template>
<script>
import { props, mixin } from '../basis'

export default {
  name: 'index',
  mixins: [mixin],
  props: {
    ...props
  },
  data() {
    return {
      val: '',
      imageUrl: '',
      two: {
        2: '二'
      },
      three: {
        3: '三'
      }
    }
  },
  computed: {
    model() {
      return this.config?.model
    },
    sizeBox() {
      const width = this.config?.width || '100px'
      const height = this.config?.height || '100px'
      return {
        width,
        height
      }
    }
  },
  methods: {
    async handleUpload(data) {
      const file = data.file
      // console.log(file)
      const formData = new FormData()
      formData.append('file', file)
      formData.append(' filename', file.name)
      const res = await this.$axios({
        url: this.url,
        method: this.method,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
      console.log(res)
      this.imageUrl = res.data.servicePath
    },
    handleDelete() {
      this.imageUrl = ''
    },
    handleExceed() {
      this.$message({
        type: 'warning',
        message: `最多只能上传${this.three[this.config.limit]}个文件`
      })
    },
    handleBeforeUpload(file) {
      const limit2M = file.size / 1024 / 1024 < this.config.maxSize
      if (!limit2M) {
        this.$message({
          type: 'warning',
          message: `最多只能上传${this.two[this.config.maxSize]}MB!`
        })
      }
    },
    handlePreview(file) {
      console.log('handlePreview', file)
    },
    handleRemove(file) {
      this.imageUrl = ''

      console.log('handleRemove', file)
    },
    handleBeforeRemove() {
      return new Promise((resolve, reject) => {
        this.$confirm('是否删除文件？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.upload-card {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: #409eff;
  }
}
.deleteIcon {
  width: 100%;
  height: 100%;
  line-height: 100%;
  background-color: rgba(204, 204, 204, 0.562);
  position: absolute;
  cursor: pointer;
  z-index: 2;
}
</style>
