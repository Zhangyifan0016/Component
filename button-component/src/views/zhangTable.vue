<template>
  <div>
    <zTable :column="column" checkbox index url="/name/" method="GET">
      <template v-slot:operation="slot">
        <el-button type="primary" @click="handleEdit(slot.data)"
          >编辑</el-button
        >
        <zhangButton type="danger" @click="handleDelete(slot.data)"
          >删除</zhangButton
        >
      </template>
    </zTable>
  </div>
</template>
<script>
export default {
  name: 'zhangTable',
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
        { label: '姓名', prop: 'name' },
        { label: '性别', prop: 'gender' },
        {
          label: '操作',
          type: 'slot',
          slot_name: 'operation',
          prop: 'operation'
        }
      ]
    }
  },
  methods: {
    handleEdit(row) {
      console.log(row)
    },
    handleDelete(row) {
      console.log(row)
    }
  },
  components: {
    zhangButton: () => import('../components/zhangButton'),
    zTable: () => import('../components/zhangTable/index.vue')
  }
}
</script>
<style scoped lang="scss"></style>
