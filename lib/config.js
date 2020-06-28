const chalk = require('chalk');
const Pref = require('dotpref').Pref;

// Pref.set("test","value");
// Pref.set("config","from command")

const parse = (cmdObj) => {
  // console.log(Pref.get("config"))
  if (cmdObj.view) {
    console.log('Your config:')
    console.log(`(-g) github username: ${Pref.get('github')}`)
    console.log(`(-t) token: ${Pref.get('token') ? '<hidden>' : 'undefined'}`)
    return
  }
  if (cmdObj.github) {
    Pref.set('github', cmdObj.github)
    console.log(`Successfully set github username to '${cmdObj.github}'`)
  }
  if (cmdObj.token) {
    Pref.set('token', cmdObj.token)
    console.log(`Successfully set github personal access token.`)
  }
  // console.log(cmdObj.token)
}

module.exports = {
  parse
}
