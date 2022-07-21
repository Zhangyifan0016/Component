<template>
  <div>
    <zhang-form
      :item="formItem"
      :field="formField"
      :button="formButton"
    ></zhang-form>
  </div>
</template>

<script>
export default {
  data() {
    // const validateName = (rules, value, callback) => {
    //   if (value && value !== '10') {
    //     callback(new Error('请输入10'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      formButton: [
        { label: '提交', key: 'submit', type: 'primary', size: 'mini' },
        { label: '取消', key: 'cancel', type: 'danger', size: 'small' },
        { label: '下一个', key: 'next', type: 'success' }
      ],
      formItem: [
        {
          label: '手机号',
          type: 'input',
          valueType: 'phone',
          prop: 'phone',
          required: true
        },
        {
          type: 'input',
          label: '活动名称',
          prop: 'name',
          required: true,
          rules: [
            { min: 3, max: 10, message: '请输入3~10个字符', trigger: 'blur' }
            // { validator: validateName, trigger: 'blur' }
          ]

          // rules: [
          //   {
          //     required: true,
          //     message: '必填'
          //   }
          // ]
        },
        {
          type: 'select',
          label: '活动区域',
          prop: 'gender',
          required: true
          // rules: [
          //   {
          //     required: true,
          //     message: '必填'
          //   }
          // ]
        }
      ],
      formField: {
        phone: '',
        name: '',
        gender: ''
      }
      // formRules: {
      //   name: [
      //     {
      //       required: true,
      //       message: '必填'
      //     }
      //   ],
      //   gender: [
      //     {
      //       required: true,
      //       message: '必填'
      //     }
      //   ]
      // }
    }
  },
  components: {
    zhangForm: () => import('../components/zhangForm/index.vue')
  }
}
</script>

<style scoped></style>
