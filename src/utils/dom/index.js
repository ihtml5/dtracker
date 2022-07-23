import { noop } from '../index';

export const querySelector = selector => {
  try {
    return document.getElementById(selector)
    || document.getElementsByName(selector)[0]
    || document.querySelector(selector);
  } catch (err) {
    console.warn(`querySelector ${err}`);
  }
};


export const getDomDetail = (element, useClass = false) => {
  const DOMDETAIL = [];
  if (!element || !element.tagName) {
    return '';
  }
  if (element.id) {
    return `#${element.id}`;
  }
  DOMDETAIL.push(element.tagName.toLowerCase());
  if (useClass) {
    const { className } = element || {};
    if (typeof className === 'string') {
      const classes = className.split(/\s+/);
      DOMDETAIL.push(`.${classes.join('.')}`);
    }
  }
  if (element.name) {
    DOMDETAIL.push(`[name=${element.name}]`);
  }
  return DOMDETAIL.join('');
};

export const getDomPath = (element, useClass = false) => {
  if (!(element instanceof HTMLElement)) {
    console.warn('input is not a HTML element!');
    return '';
  }
  const domPath = [];
  let elem = element;
  while (elem) {
    let domDesc = getDomDetail(elem, useClass);
    if (!domDesc) {
      break;
    }
    domPath.unshift(domDesc);
    if (querySelector(domPath.join('>')) === element || domDesc.indexOf('body') >= 0) {
      break;
    }
    domPath.shift();
    const { children } = elem.parentNode;
    if (children.length > 1) {
      for (let i = 0; i < children.length; i++) {
        if (children[i] === elem) {
          domDesc += `:nth-child(${i + 1})`;
          break;
        }
      }
    }
    domPath.unshift(domDesc);
    if (querySelector(domPath.join('>')) === element) {
      break;
    }
    elem = elem.parentNode;
  }
  return domPath.join('>');
};


export const addEventListener = (eventName, func = noop) => {
  if (document.addEventListener) {
    document.addEventListener(eventName, func);
  } else if (document.attachEvent) {
    document.attachEvent(eventName, func);
  }
};
