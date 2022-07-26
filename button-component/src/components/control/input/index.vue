<template>
  <div class="relative">
    <el-input v-model="val" @input="handleInputEvent"></el-input>
  </div>
</template>

<script>
import { props, mixin } from '../basis'
export default {
  name: 'index',
  mixins: [mixin],
  components: {},
  props: {
    ...props
  },
  watch: {
    value: {
      handler(newValue) {
        console.log(newValue)
        this.val = newValue
      },
      immediate: true
    }
  },
  data() {
    return {
      val: ''
    }
  },
  methods: {
    handleInputEvent() {
      this.$emit('update:value', this.val)
      const callback = this.config.callback
      if (
        callback &&
        Object.prototype.toString.call(callback) === '[object Function]'
      ) {
        callback(this.val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.relative {
  position: relative;
}
</style>
