<template>
  <div class="home">
    <zhangButton size="mini" border round type="primary">默认按钮 </zhangButton>
    <zhangButton
      :disabled="false"
      :loading="loadingStatus"
      @click="handleSubmit"
      type="success"
      size="medium"
      >成功按钮</zhangButton
    >
    <zhangButton disabled type="danger" size="small">危险按钮</zhangButton>
    <zhangButton prefix="browse" suffix="eye-close" type="warning" block>
      警告按钮
    </zhangButton>
  </div>
</template>

<script>
import zhangButton from '../components/zhangButton'
export default {
  name: 'HomeView',
  data() {
    return {
      loadingStatus: false
    }
  },
  components: {
    zhangButton
  },
  methods: {
    handleSubmit() {
      this.loadingStatus = true
      setTimeout(() => {
        this.loadingStatus = false
      }, 3000)
    }
  }
}
</script>
