const npm = require('../lib/npm')

const deploy = () => {
  npm.run('deploy');
}

module.exports = {
  deploy,
}
