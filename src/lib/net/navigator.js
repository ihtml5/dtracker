import { isFunction, isString, isObject } from '../../utils/types';
import { reportBaseInfo } from '../../utils/index';
import { formatParams } from '../../utils/url';

// https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon
class DTrackerSendBeacon {
  getBeaconData(data) {
    try {
      if (isObject(data)) {
        return data;
      }
      if (isString(data)) {
        return JSON.parse(data);
      }
      return {};
    } catch (err) {
      console.error(`get BeaconData ${err}`);
      return {};
    }
  }

  initProxy(context) {
    const { onProxy } = context;
    const self = this;
    const nativeNavigatorSendBeacon = navigator.sendBeacon;
    if (isFunction(nativeNavigatorSendBeacon)) {
      navigator.sendBeacon = (...rest) => {
        const combineRest = [`${rest[0]}&${formatParams(Object.assign({}, reportBaseInfo, self.getBeaconData(rest[1])))}`];
        nativeNavigatorSendBeacon.apply(window.navigator, combineRest);
        if (isFunction(onProxy)) {
          onProxy({
            type: 'beacon',
            data: rest[1],
            extra: {
              url: rest[0],
            },
          });
        }
      };
    }
  }
}

export default DTrackerSendBeacon;
