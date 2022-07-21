// 校验手机号
const regPhone = /^1[3456789]\d{9}$/
export const validatePhone = (rule, value, callback) => {
  if (value && regPhone.test(value)) {
    callback()
  } else {
    callback(new Error('请输入合法的手机号码'))
  }
}
