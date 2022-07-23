import { querySelector } from './utils/dom';
import {
  debounce,
  doReport,
  noop,
  merge,
  getUrlParam,
  autoRetain,
} from './utils';
import { parseLink } from './utils/url';
import { getSysInfo } from './utils/ua';
import { isObject, isFunction } from './utils/types';
import Router from './lib/router';
import Interaction from './lib/interaction';
import {
  DTrackerImage,
  DTrackerFetch,
  DTrackerAjax,
  DTrackerNavigator,
} from './lib/net';
import { wrapTryCatch } from './utils/wrapper';

// export dtracker version
export const version = '0.2.0';
class Dtracker {
  constructor({
    options = {},
    baseUrl = '',
    sampling = 1,
    delay = 2000,
    params = [],
    onBeforeSend,
    debug,
    events,
    settings = {

    },
    onProxy,
  }) {
    this.options = options;
    this.errorList = [];
    this.baseUrl = baseUrl;
    this.sampling = sampling;
    this.params = params;
    this.delay = delay;
    this.onBeforeSend = onBeforeSend;
    this.debug = debug;
    this.events = events;
    this.settings = settings;
    this.onProxy = wrapTryCatch(onProxy);
  }

  init() {
    const context = this;
    try {
      new Router().initRroxy(context);
      new Interaction().initProxy(context);
      new DTrackerImage().initProxy(context);
      new DTrackerFetch().initProxy(context);
      new DTrackerAjax().initProxy(context);
      new DTrackerNavigator().initProxy(context);
    } catch (err) {
      console.warn(`dtracker ${err}`);
    }
  }

  send(data = {}, flag = false) {
    const context = this;
    const { baseUrl } = context;
    const { sampling, delay = 200 } = context;
    const { browser, os } = getSysInfo(navigator.userAgent);
    if (Math.random() < sampling) {
      const debounceReport = debounce(doReport, delay, noop);
      const _onBeforeSend = context.onBeforeSend;
      let mergeData = {
        url: document.location.href,
        browser: browser.name,
        ostype: os.name,
        ...data,
      };
      if (isFunction(_onBeforeSend)) {
        try {
          const returnedValue = _onBeforeSend(mergeData);
          if (typeof returnedValue === 'boolean' && !returnedValue) {
            return;
          }
          if (isObject(returnedValue)) {
            mergeData = merge(mergeData, returnedValue);
          }
        } catch (err) {
          console.warn(err);
        }
      }
      debounceReport({
        baseUrl,
        data: Object.assign({}, data, mergeData),
        method: flag ? 'POST' : 'GET',
      });
    }
  }
}

let dtrackerIns = null;
const create = ({
  // 默认选项
  options = {},
  cgi = {
    sampling: 1,
    baseUrl: '',
  },
  baseUrl,
  delay = 2000,
  sampling = 1, // 采样上报
  // 从url中截取那些字段上报
  params = [],
  events = ['click'],
  onBeforeSend = noop,
  onProxy = noop,
}) => {
  if (!dtrackerIns) {
    dtrackerIns = new Dtracker({
      options,
      baseUrl,
      params,
      delay,
      sampling, // 采样上报
      cgi,
      events,
      onBeforeSend,
      onProxy,
    });
  }
  dtrackerIns.init();
  return dtrackerIns;
};
export {
  create,
  querySelector,
  getSysInfo,
  getUrlParam,
  doReport,
  autoRetain,
  parseLink,
};
