module.exports = function (error_code, error_msg) {
  const error = {
    code: error_code,
    msg: error_msg
  }
  return { error }
}
