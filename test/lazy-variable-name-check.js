var deps   = require('glslify-deps')
var test   = require('tape')
var path   = require('path')
var bundle = require('../')
var fs     = require('fs')

var fixture = path.resolve(__dirname, '..', 'fixtures', 'basic.glsl')

test('lazy variable rename check', function(t) {
  var depper = deps()

  depper.add(fixture, function(err, modules) {
    if (err) return t.ifError(err)

    var src = bundle(modules)

    t.equal(src.match(/uVec/g).length, 3, '3 occurences of uVec')
    t.equal(src.match(/uVec.x/g).length, 2, '2 occurences of uVec.x')
    t.equal(src.match(/Light_3_0/g).length, 7, '7 occurences of Light_3_0')
    t.equal(src.match(/alongside_2_1/g).length, 2, '2 occurences of alongside_2_1')
    t.equal(src.match(/another_2_2/g).length, 4, '4 occurences of another_2_2')
    t.equal(src.match(/4\.0/g).length, 3, '3 occurences of 4.0')
    t.equal(src.match(/b\.color/g).length, 1, '1 occurence of b.color')
    t.equal(src.match(/b\.position/g).length, 2, '2 occurences of b.position')
    t.equal(src.match(/sibling_1_3/g).length, 2, '2 occurences of sibling_1_3')
    t.equal(src.match(/\#define GLSLIFY 1/g).length, 1, '1 occurences of #define GLSLIFY 1')

    t.end()
  })
})
