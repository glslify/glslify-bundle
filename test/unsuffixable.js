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

    t.equal(src.match(/ray(?:1|2)/g).length, 4, '4 occurences of ray*')
    t.equal(src.match(/ray(?:1|2)\.origin\.xy[^_]/g).length, 1, 'ray*.origin.xy properties were not renamed')
    t.equal(src.match(/Ray/g).length, 3, '3 occurences of Ray')
    t.equal(src.match(/child/g).length, 2, '2 occurence of child')
    t.equal(src.match(/vec[^234]/g).length, 3, '3 occurence of vec')
    t.equal(src.match(/vec\.x[^_]/g).length, 1, 'vec.x property was not renamed')
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
