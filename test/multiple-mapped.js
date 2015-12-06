var Shader = require('./utils/fragment-shader')
var deps = require('glslify-deps')
var test = require('tape')
var path = require('path')
var bundle = require('../')

var fixture = path.resolve(__dirname, '..', 'fixtures', 'multiple-mapped.glsl')

test('multiple mappings of the same module', function (t) {
  var depper = deps()

  depper.add(fixture, function (err, modules) {
    if (err) return t.ifError(err)

    var src = bundle(modules)

    t.equal(src.match(/mappedChild_\d+/g).length, 5, '5 occurences of mappedChild_*')
    t.equal(numberOfSuffixes(src, /mappedChild_(\d+)/g), 2, '2 suffixed versions of mappedChild_*')

    var suffixes = src.match(/mappedChild_(\d+)\(\), mappedChild_(\d+)\(\), mappedChild_(\d+)\(\)/)
    t.equal(suffixes[1], suffixes[3], 'multiple require calls with the same mapping resolve to the same symbol')
    t.notEqual(suffixes[1], suffixes[2], 'multiple require calls with different mappings resolve to different symbols')

    try {
      Shader(src)
    } catch (e) {
      console.error(src)
      t.fail(e.message)
      return t.end()
    }

    t.pass('shader compiled successfully')

    t.end()
  })
})

function numberOfSuffixes (src, regex) {
  var suffixes = {}

  src.replace(regex, function (_, suffix) {
    suffixes[suffix] = true
    return _
  })

  return Object.keys(suffixes).length
}
