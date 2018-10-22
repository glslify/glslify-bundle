// Ensure glslify can import modules in conditional
// preprocessor directives (e.g. #ifdef), and still
// use those modules elsewhere in the code without
// them being deduped.
//
// addresses:
// https://github.com/glslify/glslify/issues/116
// https://github.com/glslify/glslify-bundle/pull/7

var Shader = require('./utils/fragment-shader')
var deps = require('glslify-deps')
var test = require('tape')
var path = require('path')
var bundle = require('../')

var fixture = path.resolve(__dirname, '..', 'fixtures', 'define-bug.glsl')

test('conditional imports', function (t) {
  var depper = deps()

  depper.add(fixture, function (err, modules) {
    if (err) return t.ifError(err)

    var src = bundle(modules)
    var errors = 0

    ;[[],
      ['HELLO'],
      ['WORLD'],
      ['ANOTHER'],
      ['HELLO', 'WORLD'],
      ['HELLO', 'ANOTHER'],
      ['ANOTHER', 'WORLD'],
      ['HELLO', 'WORLD', 'ANOTHER'],
    ].forEach(function (combinations) {
      var prefix = combinations.map(toDefine).join('\n') + '\n'
      var source = prefix + src

      try {
        Shader(source)
      } catch (e) {
        errors++
        return t.fail(e.shortMessage)
      }

      t.pass('shader complied successfully: ' + combinations.join(', '))
    })

    if (errors) console.error(src)
    t.end()
  })
})

function toDefine (d) {
  return '#define ' + d
}
