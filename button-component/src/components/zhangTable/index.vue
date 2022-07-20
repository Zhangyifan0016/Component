<template>
  <el-table
    :data="tableData"
    @selection-change="handleSelectionChange"
    @sort-change="sortChange"
    style="width: 100%"
  >
    <!-- 复选框 -->
    <el-table-column
      v-if="checkbox"
      type="selection"
      width="55"
    ></el-table-column>
    <!-- 序号 -->
    <el-table-column
      v-if="index"
      label="序号"
      type="index"
      width="55"
    ></el-table-column>
    <template v-for="item in column">
      <!-- 自定义渲染文本 -->
      <el-table-column :key="item.prop" v-bind="item">
        <template slot-scope="scope">
          <slot
            v-if="item.type === 'slot'"
            :name="item.slot_name"
            :data="scope.row"
          ></slot>
          <component
            v-else
            :data="scope.row"
            :config="item"
            :prop="item.prop"
            :is="!item.type ? 'com-text' : `com-${item.type}`"
          ></component>
          <!-- <div v-html="item.callback && item.callback(scope.row)"></div> -->
        </template>
      </el-table-column>
      <!-- 插槽渲染组件 -->
      <!-- <el-table-column
        :render-header="item.render_header"
        v-if="item.type === 'slot'"
        :key="item.prop"
        v-bind="item"
      >
        <template slot-scope="scope">
          <slot :name="item.slot_name" :data="scope.row"></slot>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        :sort-by="item.sort_by"
        :sortable="item.sort"
        :render-header="item.render_header"
        v-else
        :key="item.prop"
        v-bind="item"
      ></el-table-column> -->
    </template>
  </el-table>
</template>

<script>
const modules = {}
const files = require.context('../control', true, /index.vue$/)
console.log(files)
files.keys().forEach((item) => {
  const key = item.split('/')
  const name = key[1]
  console.log(name)
  // const component = files(item).default
  // console.log(component)
  // 组件集成
  modules[`com-${name}`] = files(item).default
})
export default {
  name: 'zhangTable',
  components: {
    // 'com-function' : () => import("../control/function"),
    // 'com-image' : () => import("../control/image"),
    ...modules
  },
  props: {
    column: {
      type: Array,
      default: () => []
    },
    checkbox: Boolean,
    index: Boolean,
    url: {
      type: String,
      default: '',
      required: true
    },
    method: {
      type: String,
      default: 'GET'
    },
    data: {
      type: Object,
      default: () => {}
    },
    params: {
      type: Object,
      default: () => {}
    },
    initRequest: Boolean,
    onLoad: Boolean,
    format: Function
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.initRequest && this.getTableList()
  },
  methods: {
    // 远程排序
    sortChange({ column, prop, order }) {
      console.log(column)
      const sortBy = column.sortBy
      // order 升序降序
      console.log(sortBy, order)
    },
    // 复选框回调
    handleSelectionChange(val) {
      console.log(val)
      this.$emit('update:checkList', val)
    },
    async getTableList() {
      const requestData = {
        url: this.url,
        method: this.method
      }
      if (!this.url) {
        console.log('url is required')
        return false
      }
      if (this.data) {
        requestData.data = this.data
      }
      if (this.params) {
        console.log(this.params)
        requestData.params = this.params
      }
      const response = await this.$axios(requestData)
      let data = response.data.data
      if (this.format && typeof this.format === 'function') {
        data = this.format(response.data)
      }
      this.tableData = data

      this.onLoad && this.$emit('onLoad', response.data)
    },
    initRequestList() {
      this.getTableList()
    }
  }
}
</script>
