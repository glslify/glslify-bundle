var Shader = require('./utils/fragment-shader')
var deps = require('glslify-deps')
var test = require('tape')
var path = require('path')
var bundle = require('../')

var fixture = path.resolve(__dirname, '..', 'fixtures', 'complex.glsl')

test('complex but valid shader', function (t) {
  var depper = deps()

  depper.add(fixture, function (err, modules) {
    if (err) return t.ifError(err)

    var src = bundle(modules)

    try {
      Shader(src)
    } catch (e) {
      console.error(src)
      t.fail(e.message)
      return t.end()
    }

    t.pass('shader complied successfully')
    t.end()
  })
})
