<template>
  <button
    class="zhang-button"
    @click="change"
    :disabled="disabled || loading"
    :class="[theme, isRound, isBorder, isSize, isBlock]"
  >
    <span>
      <i v-if="loading" class="iconfont icon-prefix icon-loading"></i>
      <i v-if="prefix" class="iconfont icon-prefix" :class="iconPrefix"></i>
      <slot></slot>
      <i v-if="suffix" class="iconfont icon-prefix" :class="iconSuffix"></i>
    </span>
  </button>
</template>
<script>
export default {
  name: 'zhangButton',
  props: {
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    round: Boolean,
    border: Boolean,
    block: Boolean,
    disabled: Boolean,
    loading: Boolean
  },
  data() {
    return {}
  },
  computed: {
    theme() {
      return this.type ? `zhang-button-${this.type}` : ''
    },
    isRound() {
      return this.round ? 'is-round' : ''
    },
    isBorder() {
      return this.border ? 'is-border' : ''
    },
    isSize() {
      return this.size ? `zhang-button-${this.size}` : ''
    },
    isBlock() {
      return this.block ? 'zhang-button-block' : ''
    },
    iconPrefix() {
      return this.prefix ? `icon-${this.prefix}` : ''
    },
    iconSuffix() {
      return this.suffix ? `icon-${this.suffix}` : ''
    }
  },
  methods: {
    change() {
      this.$emit('click')
    }
  }
}
</script>
<style scoped lang="scss">
@import './zhangButton.scss';
</style>
