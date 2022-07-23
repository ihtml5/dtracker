import { isFunction, isString } from '../../utils/types';

class DTrackerFetch {
  initProxy(context) {
    const { onProxy } = context;
    if (!window.fetch) return;
    const nativeFetch = window.fetch;
    window.fetch = (...rest) => nativeFetch.apply(null, ...rest)
      .then(res => {
        // HTTP响应状态码非 2xx
        // HTTP 2xx，访问响应主体的每个方法都返回一个Promise
        // 当关联的数据类型准备好时，将被解析
        // https://github.com/swissquote/fetch-filter
        try {
          // 仅当返回值是json时候才进行过滤
          const contentType = res.headers ? res.headers.get('content-type') : '';
          const canToJson = isString(contentType) && contentType.includes('application/json');
          if (canToJson) {
            // https://developer.mozilla.org/en-US/docs/Web/API/Response/clone
            const respClone = res.clone();
            respClone.json().then(respCurResult => {
              try {
                if (isFunction(onProxy)) {
                  onProxy({
                    type: 'fetch',
                    data: respCurResult,
                    extra: {
                      url: rest[0],
                    },
                  });
                }
              } catch (err) {
                console.warn(err);
              }
            }).catch(err => {
              console.error('getCgiInfo', err);
            });
          }
        } catch (err) {
          console.error('getCgiInfo', err);
        }
        return res;
      })
      .catch(err => {
        console.error('getCgiInfo', err);
      });
  }
}

export default DTrackerFetch;
