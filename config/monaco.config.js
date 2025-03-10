
if (process.env.NODE_ENV === 'production') {
  module.exports = esmRequire('./monaco.prod.js')
} else {
  module.exports = esmRequire('./monaco.dev.js')
}

function esmRequire(id) {
  var m = require(id);
  if (m.__esModule && 'default' in m) {
    return m.default;
  }
  return m;
}
