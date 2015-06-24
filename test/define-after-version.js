var tokenize = require('glsl-tokenizer')
var deps     = require('glslify-deps')
var test     = require('tape')
var path     = require('path')
var bundle   = require('../')
var fs       = require('fs')

var fixture = path.resolve(__dirname, '..', 'fixtures', 'version.glsl')

test('lazy variable rename check', function(t) {
  var depper = deps()

  depper.add(fixture, function(err, modules) {
    if (err) return t.ifError(err)

    var src    = bundle(modules)
    var tokens = tokenize(src).filter(function(d) {
      return d.type !== 'whitespace'
    })

    t.equal(tokens[0].type, 'preprocessor')
    t.equal(tokens[0].data, '#version 150')
    t.equal(tokens[1].type, 'preprocessor')
    t.equal(tokens[1].data, '#define GLSLIFY 1')

    t.end()
  })
})
