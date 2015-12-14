var deps = require('glslify-deps')
var test = require('tape')
var path = require('path')
var bundle = require('../')

var fixture = path.resolve(__dirname, '..', 'fixtures', 'basic.glsl')

test('lazy variable rename check', function (t) {
  var depper = deps()

  depper.add(fixture, function (err, modules) {
    if (err) return t.ifError(err)

    var src = bundle(modules)

    t.equal(src.match(/uVec/g).length, 3, '3 occurences of uVec')
    t.equal(src.match(/uVec_\d+/g).length, 2, '2 occurences of uVec_*')
    t.equal(src.match(/uVec_\d+\.x/g).length, 2, '2 occurences of uVec_*.x')
    t.notOk(src.match(/uVec_\d+\.x_/g), 'uVec_*.x did not get suffixed')
    t.equal(src.match(/Light+/g).length, 7, '7 occurences of Light')
    t.equal(src.match(/alongside+/g).length, 2, '2 occurences of alongside')
    t.equal(src.match(/another+/g).length, 4, '4 occurences of another')
    t.equal(src.match(/4\.0/g).length, 3, '3 occurences of 4.0')
    t.notOk(src.match(/4\.0_/g), '4.0 did not get suffixed')
    t.equal(src.match(/b\.color/g).length, 1, '1 occurence of b.color')
    t.equal(src.match(/b\.position/g).length, 2, '2 occurences of b.position')
    t.equal(src.match(/sibling/g).length, 2, '2 occurences of sibling')
    t.equal(src.match(/\#define GLSLIFY 1/g).length, 1, '1 occurences of #define GLSLIFY 1')

    t.end()
  })
})
