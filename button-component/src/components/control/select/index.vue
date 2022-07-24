<template>
  <div>
    <el-select v-model="val" @change="handleChangeEvent">
      <el-option
        v-for="item in option"
        :key="item[props.value]"
        :label="item[props.label]"
        :value="item[props.value]"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'SelectComponents',
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      val: '',
      option: [],
      props: {
        label: 'label',
        value: 'value'
      }
    }
  },
  computed: {
    url() {
      return this.config?.url
    },
    initRequest() {
      return this.config?.initRequest
    },
    methods() {
      return this.config?.methods || 'get'
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.val = newValue
      },
      immediate: true
    },
    config: {
      handler(newValue) {
        this.initOptions()
        this.initProps()
      },
      immediate: true
    }
  },
  methods: {
    handleChangeEvent(value) {
      this.$emit('update:value', value)
    },
    initOptions() {
      if (this.url) {
        this.fetchOptions()
        return false
      }
      const option = this.config.options

      if (option && Array.isArray(option) && option.length > 0) {
        this.option = option
      }
    },
    initProps() {
      const option = this.config.props
      const keys = Object.keys(this.props)

      if (
        option &&
        Object.prototype.toString.call(option) === '[object Object]'
      ) {
        for (const key in option) {
          if (keys.includes(key)) {
            this.props[key] = option[key]
          }
        }
      }
    },
    async fetchOptions() {
      if (!this.initRequest) {
        return false
      }
      try {
        const requestData = {
          url: this.url,
          method: this.method
        }

        const response = await this.$axios(requestData)
        console.log(response.data.data)
        let data = response.data.data
        if (this.format && typeof this.format === 'function') {
          data = this.format(response.data)
        }
        this.options = data

        this.onLoad && this.$emit('onLoad', response.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped></style>
