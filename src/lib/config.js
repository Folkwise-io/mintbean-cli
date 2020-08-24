import { Pref } from "dotpref";

// returns false if no key or value is undefined, returns value if key
export const getConfig = (key) => {
  const value = Pref.get(key);
  if (typeof value === "undefined") return false;
  return value;
};

export const setConfig = (key, val) => {
  Pref.set(key, val);
};
