
import { getDomPath, addEventListener } from '../../utils/dom';

class Interaction {
  constructor(options) {
    this.options = options;
  }

  initProxy(instance = {}) {
    const context = this;
    const { options = {} } = context;
    const commonListener = e => {
      instance.send({
        selector: getDomPath(e.target, true),
        ...options,
      });
    };
    if (Array.isArray(instance.events)) {
      instance.events.forEach(eventName => addEventListener(eventName, commonListener));
    } else {
      addEventListener('click', commonListener);
    }
  }
}

export default Interaction;
