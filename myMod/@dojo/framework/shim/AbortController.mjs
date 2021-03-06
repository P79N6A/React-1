import global from './global';
import has from './support/has';
import { findIndex } from './array';
// tslint:disable-next-line variable-name
export let ShimAbortSignal = global.AbortSignal;
if (!has('abort-signal')) {
    global.AbortSignal = ShimAbortSignal = class {
        constructor() {
            this._aborted = false;
            this.listeners = {};
        }
        get aborted() {
            return this._aborted;
        }
        addEventListener(type, callback) {
            if (!(type in this.listeners)) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(callback);
        }
        removeEventListener(type, callback) {
            if (!(type in this.listeners)) {
                return;
            }
            const index = findIndex(this.listeners[type], (cb) => cb === callback);
            if (index >= 0) {
                this.listeners[type].splice(index, 1);
            }
        }
        dispatchEvent(event) {
            const { type } = event;
            if (type === 'abort') {
                this._aborted = true;
                if (typeof this.onabort === 'function') {
                    this.onabort.call(this, event);
                }
            }
            if (!(type in this.listeners)) {
                return false;
            }
            this.listeners[type].forEach((callback) => {
                setTimeout(() => callback.call(this, event), 0);
            });
            return !event.preventDefault;
        }
    };
}
// tslint:disable-next-line variable-name
export let ShimAbortController = global.AbortController;
if (!has('abort-controller')) {
    global.AbortController = ShimAbortController = class {
        constructor() {
            this.signal = new ShimAbortSignal();
        }
        abort() {
            let event;
            try {
                event = new Event('abort');
            }
            catch (e) {
                if (typeof document !== 'undefined') {
                    event = document.createEvent('Event');
                    event.initEvent('abort', false, false);
                }
                else {
                    event = {
                        type: 'abort',
                        bubbles: false,
                        cancelable: false
                    };
                }
            }
            this.signal.dispatchEvent(event);
        }
    };
}
export default ShimAbortController;
//# sourceMappingURL=AbortController.mjs.map