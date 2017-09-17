module.exports = function (success_code, success_msg) {
  const success = {
    code: success_code,
    msg: success_msg
  }
  return { success }
}
