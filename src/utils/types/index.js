export const nativeToString = Object.prototype.toString;
export const nativeHasOwn = Object.prototype.hasOwnProperty;
export const isArray = obj => nativeToString.call(obj) === '[object Array]';
export const isObject = obj => nativeToString.call(obj) === '[object Object]';
export const isString = obj => typeof obj === 'string';
export const isUndefined = obj => typeof obj === 'undefined';
export const isFunction = func => typeof func === 'function';
export const hasProp = (obj, key) => nativeHasOwn.call(obj, key);
