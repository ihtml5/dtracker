import { isFunction } from '../types';

export const wrapTryCatch = (func = () => {}) => {
  if (isFunction(func)) {
    return (...rest) => {
      const context = this;
      try {
        func.apply(context, rest);
      } catch (err) {
        console.error(`wrapTryCatch ${err}`);
      }
    };
  }
  return func;
};
