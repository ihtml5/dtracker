
import { isFunction } from '../../utils/types';

class DtrackerAjax {
  initProxy(context) {
    const fakeAjax = Object.create(null);
    const { onProxy } = context;
    fakeAjax.send = XMLHttpRequest.prototype.send;
    fakeAjax.open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function ajaxOpen(method, url, boolean = true) {
      fakeAjax.open.apply(this, [method, url, boolean]);
      this.dtrackerUrl = url;
    };
    XMLHttpRequest.prototype.send = function ajaxSend(data) {
      if (isFunction(onProxy)) {
        onProxy({
          type: 'ajax',
          data,
          extra: {
            url: this.dtrackerUrl,
          },
        });
      }
      fakeAjax.send.apply(this, [data]);
    };
  }
}

export default DtrackerAjax;
