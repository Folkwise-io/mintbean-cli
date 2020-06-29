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

module.exports = {
  getConfig,
  setConfig
}
