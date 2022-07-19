<template>
  <el-table :data="tableData" style="width: 100%">
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
      <el-table-column
        v-if="item.type === 'function'"
        :key="item.prop"
        v-bind="item"
      >
        <template slot-scope="scope">
          <div v-html="item.callback && item.callback(scope.row)"></div>
        </template>
      </el-table-column>
      <!-- 插槽渲染组件 -->
      <el-table-column
        v-if="item.type === 'slot'"
        :key="item.prop"
        v-bind="item"
      >
        <template slot-scope="scope">
          <slot :name="item.slot_name" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column v-else :key="item.prop" v-bind="item"></el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
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
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    async getTableList() {
      if (!this.url) {
        console.log('url is required')
        return false
      }
      const response = await this.$axios({
        url: this.url,
        method: this.method
      })
      this.tableData = response.data.data
    }
  }
}
</script>
