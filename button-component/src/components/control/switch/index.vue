<template>
  <div
    class="Z-switch"
    :class="{ 'Z-switch-active': active }"
    @click="handleSwitch"
  >
    <i> </i>
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
      // active: true
      // 打开
      activeValue: 1,
      // 关闭
      inactiveValue: 0,
      // 定义类型
      initDefaultValueType: ['boolean', 'string', 'number']
    }
  },
  computed: {
    active() {
      return this.value === this.activeValue
    }
  },
  watch: {
    'config.activeValue': {
      handler(newValue) {
        const bool = this.initDefaultValueType.includes(typeof newValue)
        bool && (this.activeValue = newValue)
      },
      immediate: true,
      deep: true
    },
    'config.inactiveValue': {
      handler(newValue) {
        const bool = this.initDefaultValueType.includes(typeof newValue)
        bool && (this.inactiveValue = newValue)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleSwitch() {
      const beforeChange = this.config.beforeChange
      const value =
        this.value === this.activeValue ? this.inactiveValue : this.activeValue
      if (
        beforeChange &&
        Object.prototype.toString.call(beforeChange) === '[object Function]'
      ) {
        beforeChange(this.active)
          .then((res) => {
            console.log(res)
            this.$emit('update:value', value)
          })
          .catch((error) => {
            console.log(error)
          })
        return false
      }
      this.$emit('update:value', value)
    }
  }
}
</script>
<style scoped lang="scss">
.Z-switch {
  width: 64px;
  padding: 2px;
  border-radius: 100px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: all 0.4s ease 0s;
  > i {
    display: block;
    width: 28px;
    height: 28px;
    border-radius: 100px;
    background-color: #fff;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.4s ease 0s;
  }
}
.Z-switch-active {
  background-color: #409eff;
  > i {
    margin-left: 36px;
  }
}
</style>
