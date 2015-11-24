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
    t.equal(src.match(/uVec.x/g).length, 2, '2 occurences of uVec.x')
    t.equal(src.match(/Light_\d_0/g).length, 7, '7 occurences of Light_*_0')
    t.equal(src.match(/alongside_\d_1/g).length, 2, '2 occurences of alongside_*_1')
    t.equal(src.match(/another_\d_2/g).length, 4, '4 occurences of another_*_2')
    t.equal(src.match(/4\.0/g).length, 3, '3 occurences of 4.0')
    t.equal(src.match(/b\.color/g).length, 1, '1 occurence of b.color')
    t.equal(src.match(/b\.position/g).length, 2, '2 occurences of b.position')
    t.equal(src.match(/sibling_\d_3/g).length, 2, '2 occurences of sibling_*_3')
    t.equal(src.match(/\#define GLSLIFY 1/g).length, 1, '1 occurences of #define GLSLIFY 1')

    t.end()
  })
})
