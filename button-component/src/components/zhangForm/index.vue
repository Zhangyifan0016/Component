<template>
  <div class="form-container">
    <el-form ref="form" :model="field">
      <template v-for="item in formItem">
        <el-form-item
          :rules="item.rules"
          :key="item.label"
          :label="item.label"
          :prop="item.prop"
        >
          <component
            :value.sync="field[item.prop]"
            :config="item"
            :is="!item.type ? 'com-text' : `com-${item.type}`"
          ></component>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button v-for="item in button" :key="item.key" v-bind="item">{{
          item.label
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import createRules from './createRules'
const modules = {}
const files = require.context('../control', true, /index.vue$/i)
files.keys().forEach((item) => {
  const key = item.split('/')
  const name = key[1]
  modules[`com-${name}`] = files(item).default
})
export default {
  name: 'index',
  components: {
    ...modules
  },
  props: {
    item: {
      type: Array,
      default: () => []
    },
    field: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    button: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formItem: []
    }
  },
  methods: {},
  beforeMount() {
    this.formItem = createRules(this.item)
  }
}
</script>

<style scoped></style>
