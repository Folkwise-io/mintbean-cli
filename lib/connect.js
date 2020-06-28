const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');


const connect = (args) => {
  if(!fs.existsSync(path.join(process.cwd(), '.git'))) {
    shell.exec('git init')
  }
  const projectName = path.basename(process.cwd());
  shell.exec(`curl -u 'clairefro' https://api.github.com/user/repos -d '{"name":"${projectName}"}'`)
  shell.exec(`git remote add origin git@github.com:clairefro/${projectName}.git`)
  console.log('Added github repo and remote.')
  shell.exec(`git remote -v`)
}

module.exports = {
  connect
}

// curl -s -H 'Authorization: token 44ceb90e5d2ca9aa66e69dc22859d665d4350f8b' https://api.github.com/user/repos -d '{"name":"githubtest3"}'
