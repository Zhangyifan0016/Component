<template>
  <div>{{ data[prop] }}</div>
</template>
<script>
export default {
  name: 'index',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({})
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped lang="scss"></style>
