const chalk = require('chalk');
const Pref = require('dotpref').Pref;

// returns false if no key or value is undefined, returns value if key
const getConfig = (key) => {
  const value = Pref.get(key);
  if (typeof value === 'undefined') return false
  return value;
}

const setConfig = (key, val) => {
  Pref.set(key, val)
}
//
// const parse = (cmdObj) => {
//   if (cmdObj.view) {
//     console.log('Your config:')
//     console.log(`(-g) github username: ${Pref.get('github')}`)
//     console.log(`(-t) token: ${Pref.get('token') ? '<hidden>' : 'undefined'}`)
//     return
//   }
//   if (cmdObj.github) {
//     Pref.set('github', cmdObj.github)
//     console.log(`Successfully set github username to '${cmdObj.github}'`)
//   }
//   if (cmdObj.token) {
//     Pref.set('token', cmdObj.token)
//     console.log(`Successfully set github personal access token.`)
//   }
// }

module.exports = {
  // parse,
  getConfig,
  setConfig
}
