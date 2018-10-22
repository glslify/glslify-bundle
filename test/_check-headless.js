const spawn = require('child_process').spawn
const which = require('which')

try {
  which.sync('xvfb-run')
  run('test:linux')
} catch (e) {
  run('test:basic')
}

function run (script) {
  setTimeout(function () {
    spawn('npm', ['run', script], {
      stdio: [0, 1, 2]
    })
  })
}
