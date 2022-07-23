
export const __proxy = type => {
  const source = window.history[type];
  return function proxyEvent() {
    const event = new Event(type);
    event.arguments = arguments;
    window.dispatchEvent(event);
    const _proxySource = source.apply(this, arguments);
    return _proxySource;
  };
};


class Router {
  constructor(options) {
    this.options = options;
  }

  initRroxy(instance = {}) {
    const context = this;
    const { options = {} } = context;
    window.history.pushState = __proxy('pushState');
    window.history.replaceState = __proxy('replaceState');
    window.addEventListener('pushState', () => {
      instance.send({
        sOp: 'pageView',
        ...options,
      });
    });
    window.addEventListener('replaceState', () => {
      instance.send({
        sOp: 'pageView',
        ...options,
      });
    });
    const originOnPopState = window.onpopstate;
    window.onpopstate = function onPopState(...rest) {
      const self = this;
      instance.send({
        sOp: 'pageView',
        ...options,
      });
      return originOnPopState.apply(self, rest);
    };
  }
}

export default Router;
