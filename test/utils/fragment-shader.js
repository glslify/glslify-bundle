var Shader = require('gl-shader')
var path = require('path')
var fs = require('fs')
var GL = require('gl')
var gl

var vert = fs.readFileSync(
  path.join(__dirname, '..', '..', 'fixtures', 'square.vert')
  , 'utf8')

module.exports = function (source) {
  gl = gl || GL(2, 2)
  return Shader(gl, vert, source)
}
