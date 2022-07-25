<template>
  <div>
    <h3>文件上传</h3>
    <hr />
    <input
      class="file-up"
      ref="fileUp"
      type="file"
      @change="handleSelectFile"
    />
    <div>
      <el-button type="primary" size="mini" @click="handleClick"
        >选择文件</el-button
      >
      <el-button
        :loading="loading"
        type="success"
        size="mini"
        @click="handleUpload"
        >上传</el-button
      >
      <div class="file-info" v-if="files">文件: {{ files.name }}</div>
    </div>
    <img v-if="imgUrl" :src="imgUrl" alt="" width="100" height="100" />
  </div>
</template>
<script>
export default {
  name: 'Upload',
  data() {
    return {
      files: '',
      imgUrl: '',
      loading: false
    }
  },
  methods: {
    handleClick() {
      // console.log(this.$refs.fileUp)
      this.$refs.fileUp.click()
    },
    handleSelectFile(event) {
      this.files = event.target.files[0]
      console.log(this.files)
    },
    async handleUpload() {
      const size = this.files.size
      // 限制大小2MB
      const limit2M = 1024 * 1024 * 2
      // 上传文件类型
      const type = this.files.type
      if (size > limit2M) {
        this.$message({
          type: 'error',
          message: '上传文件不能大于2MB'
        })
        return false
      }
      // 文件类型png / jpg / jpeg / gif
      if (!/png|jpg|jpeg|gif/i.test(type)) {
        this.$message({
          type: 'error',
          message: '上传文件只能是png / jpg / jpeg / gif'
        })
        return false
      }

      // 文件需要将文件添加formData中
      const formData = new FormData()
      formData.append('file', this.files)
      formData.append('filename', this.files.name)

      this.loading = true
      // 开始上传
      const res = await this.$axios({
        url: '/upload_single',
        method: 'POST',
        data: formData
      })
      this.loading = false
      this.imgUrl = res.data.servicePath

      console.log(res)
    }
  }
}
</script>
<style scoped lang="scss">
.file-up {
  display: none;
}
.file-info {
  font-size: 14px;
  color: #cccccc;
}
</style>
