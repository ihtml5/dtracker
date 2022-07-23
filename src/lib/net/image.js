import { isFunction } from '../../utils/types';

class DTrackerImage {
  initProxy(context) {
    const { onProxy } = context;
    const NativeWindowImage = window.Image;
    const ImageCallback = e => {
      const target = e.target ? e.target : e.srcElement;
      const isImageDOMObj = target !== window && (target.nodeName === 'IMG');
      if (isImageDOMObj) {
        if (isFunction(onProxy)) {
          onProxy({
            data: null,
            type: 'image',
            extra: {
              url: target.currentSrc || target.src,
            },
          });
        }
      }
    };
    window.Image = function fakeImage(width, height) {
      const newImage = new NativeWindowImage(width, height);
      ['load', 'error', 'abort'].forEach(eventName => {
        newImage.addEventListener(eventName, evt => {
          ImageCallback(evt, {
            eventType: eventName,
          });
        }, true);
      });
      return newImage;
    };
  }
}

export default DTrackerImage;
