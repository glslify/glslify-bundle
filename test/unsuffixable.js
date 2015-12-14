var Shader = require('./utils/fragment-shader')
var deps = require('glslify-deps')
var test = require('tape')
var path = require('path')
var bundle = require('../')

var fixture = path.resolve(__dirname, '..', 'fixtures', 'unsuffixable.glsl')

test('unsuffixable', function (t) {
  var depper = deps()

  depper.add(fixture, function (err, modules) {
    if (err) return t.ifError(err)

    var src = bundle(modules)

    t.equal(src.match(/ray_\d+/g).length, 2, '2 occurences of ray_*')
    t.equal(src.match(/ray_\d+\.origin\.xy[^_]/g).length, 1, 'ray_*.origin.xy properties were not renamed')
    t.equal(src.match(/Ray_\d+/g).length, 1, '1 occurence of Ray_*')
    t.equal(src.match(/child_\d+/g).length, 2, '2 occurence of child_*')
    t.equal(src.match(/vec_\d+/g).length, 3, '3 occurence of vec_*')
    t.equal(src.match(/vec_\d+\.x[^_]/g).length, 1, 'vec_*.x property was not renamed')
    t.equal(src.match(/5\.0[^_]/g).length, 1, '5.0 was not renamed')
    t.equal(src.match(/float\(2\)/g).length, 1, '2 was not renamed')

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
