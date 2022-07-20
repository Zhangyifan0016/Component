<template>
  <div>
    <el-button @click="getCheckList">数据测试</el-button>
    <zTable
      ref="tableDemo"
      :check-list.sync="check_list"
      :column="column"
      initRequest
      @onLoad="onLoad"
      onLoad
      checkbox
      index
      :data="data_1"
      :params="params_1"
      url="/name/"
      method="GET"
    >
      <template v-slot:operation="slot">
        <el-button type="primary" @click="handleEdit(slot.data)"
          >编辑</el-button
        >
        <zhangButton type="danger" @click="handleDelete(slot.data)"
          >删除</zhangButton
        >
      </template>
    </zTable>
    <!-- 第二个请求 -->
    <!-- <zTable :column="column_1" checkbox index url="/fruit/" method="GET">
      <template v-slot:operation="slot">
        <el-button type="primary" @click="handleEdit(slot.data)"
          >编辑</el-button
        >
        <zhangButton type="danger" @click="handleDelete(slot.data)"
          >删除</zhangButton
        >
      </template>
    </zTable> -->
  </div>
</template>
<script>
export default {
  name: 'zhangTable',
  mounted() {
    // this.$refs.tableDemo.initRequestList()
    setTimeout(() => {
      // console.log(this.$refs.tableDemo)
    }, 1000)
  },
  data() {
    return {
      // column: [
      //   {
      //     label: 'URL地址',
      //     type: 'function',
      //     prop: 'date',
      //     callback: (data) => {
      //       return `<a href="https://www.baidu.com">${data.name}</a>`
      //     }
      //   },
      //   // { label: '日期', prop: 'date', width: 500 },
      //   { label: '姓名', prop: 'name' },
      //   { label: '地址', prop: 'address' },
      //   { label: '性别', prop: 'sex' },
      //   {
      //     label: '操作',
      //     prop: 'operation',
      //     type: 'slot',
      //     slot_name: 'operation'
      //   }
      // ]
      column: [
        { label: '姓名', prop: 'name', sort: 'custorm', sort_by: 'aaa' },
        { label: '性别', prop: 'gender', sort: 'custorm' },
        {
          label: '操作',
          type: 'slot',
          slot_name: 'operation',
          prop: 'operation',
          render_header: (h, { column, $index }) => {
            return <el-input value="111" />
          }
        }
      ],
      data_1: {
        name: 'jack'
      },
      params_1: {
        name: 'rose'
      },
      check_list: []
      // column_1: [
      //   { label: '姓名', prop: 'name' },
      //   { label: '性别', prop: 'gender' },
      //   {
      //     label: '操作',
      //     type: 'slot',
      //     slot_name: 'operation',
      //     prop: 'operation'
      //   }
      // ]
    }
  },
  watch: {
    check_list: {
      handler(value) {
        console.log(value)
      }
    }
  },
  methods: {
    getCheckList() {
      console.log(this.check_list)
    },
    handleEdit(row) {
      console.log(row)
    },
    handleDelete(row) {
      console.log(row)
    },
    onLoad(data) {
      console.log(data)
    },
    formatData(data) {
      const tableData = data.data
      tableData.forEach((item) => {
        item.gender = item.gender === '男' ? 1 : 0
      })
      return tableData
    }
  },
  components: {
    zhangButton: () => import('../components/zhangButton'),
    zTable: () => import('../components/zhangTable/index.vue')
  }
}
</script>
<style scoped lang="scss"></style>
