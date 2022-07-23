import { isString } from './types/index';
import { getSysInfo } from './ua/index';

export const noop = () => {};
// https://developer.mozilla.org/zh-CN/docs/Web/API/Network_Information_API
// http://www.honglei.net/?p=340
export const processStackMsg = error => {
  let stack = error.stack
    .replace(/\n/gi, '')
    .replace(/\bat\b/gi, '@')
    .split('@')
    .slice(0, 9)
    .map(v => v.replace(/^\s*|\s*$/g, ''))
    .join('~')
    .replace(/\?[^:]+/gi, '');
  const msg = error.toString();
  if (stack.indexOf(msg) < 0) {
    stack = `${msg}@${stack}`;
  }
  return stack;
};

export const getUrlParam = ({ name, url = window.location.href }) => {
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) {
    return '';
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
export const getCookie = name => {
  const nameEQ = `${encodeURIComponent(name)}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }

  return null;
};
// 自动从url或者cookie中获取对应name的值

export const autoRetain = name => {
  let returnedValue = '';
  if (!isString(name)) {
    console.warn('name is not string');
    return returnedValue;
  }
  try {
    returnedValue = getUrlParam({
      name,
    });
    if (returnedValue.length === 0) {
      returnedValue = getCookie(name) || '';
    }
    return returnedValue;
  } catch (err) {
    console.error(`Automatically get the value of the corresponding name from the url or cookie ${err}`);
    return returnedValue;
  }
};
export const isReport = (sampling = 1) => Math.random() <= sampling;
export const debounce = (func, delay, callback) => {
  let timer = null;
  return function debounced(...rest) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, rest);
      if (typeof callback === 'function') {
        callback();
      }
    }, delay);
  };
};
export const formatParams = data => {
  const arr = [];
  for (const name in data) {
    arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`);
  }
  return arr.join('&');
};
export const { browser, os } = getSysInfo();
export const reportBaseInfo = {
  browser: browser.name,
  hh_ua: navigator.userAgent,
  sOsType: os.name,
  sUrl: window.location.href,
  sRefer: document.referrer,
};
export const doReport = ({
  baseUrl = '',
  data,
  method = 'GET',
}) => {
  if (method === 'GET') {
    let img = new Image();
    img.onerror = () => {
      img = null;
    };
    img.onload = () => {
      img = null;
    };
    img.src = `${baseUrl}&${formatParams(Object.assign({}, reportBaseInfo, data))}`;
  } else if (method === 'POST') {
    try {
      let _xmlhttp = null;
      if (window.XMLHttpRequest) {
        _xmlhttp = new window.XMLHttpRequest();
      } else {
        _xmlhttp = new window.ActiveXObject('Microsoft.XMLHTTP');
      }
      _xmlhttp.open('POST', baseUrl, true);
      _xmlhttp.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded',
      );
      _xmlhttp.send(JSON.stringify(Object.assign({}, reportBaseInfo, data)));
    } catch (err) {
      console.warn('xmlhttp error', err);
    }
  }
};

export const merge = (mergeData, opts = {}) => Object.assign({}, mergeData, opts);
