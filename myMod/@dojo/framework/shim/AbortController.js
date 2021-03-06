(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./global", "./support/has", "./array"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var global_1 = require("./global");
    var has_1 = require("./support/has");
    var array_1 = require("./array");
    // tslint:disable-next-line variable-name
    exports.ShimAbortSignal = global_1.default.AbortSignal;
    if (!has_1.default('abort-signal')) {
        global_1.default.AbortSignal = exports.ShimAbortSignal = /** @class */ (function () {
            function class_1() {
                this._aborted = false;
                this.listeners = {};
            }
            Object.defineProperty(class_1.prototype, "aborted", {
                get: function () {
                    return this._aborted;
                },
                enumerable: true,
                configurable: true
            });
            class_1.prototype.addEventListener = function (type, callback) {
                if (!(type in this.listeners)) {
                    this.listeners[type] = [];
                }
                this.listeners[type].push(callback);
            };
            class_1.prototype.removeEventListener = function (type, callback) {
                if (!(type in this.listeners)) {
                    return;
                }
                var index = array_1.findIndex(this.listeners[type], function (cb) { return cb === callback; });
                if (index >= 0) {
                    this.listeners[type].splice(index, 1);
                }
            };
            class_1.prototype.dispatchEvent = function (event) {
                var _this = this;
                var type = event.type;
                if (type === 'abort') {
                    this._aborted = true;
                    if (typeof this.onabort === 'function') {
                        this.onabort.call(this, event);
                    }
                }
                if (!(type in this.listeners)) {
                    return false;
                }
                this.listeners[type].forEach(function (callback) {
                    setTimeout(function () { return callback.call(_this, event); }, 0);
                });
                return !event.preventDefault;
            };
            return class_1;
        }());
    }
    // tslint:disable-next-line variable-name
    exports.ShimAbortController = global_1.default.AbortController;
    if (!has_1.default('abort-controller')) {
        global_1.default.AbortController = exports.ShimAbortController = /** @class */ (function () {
            function class_2() {
                this.signal = new exports.ShimAbortSignal();
            }
            class_2.prototype.abort = function () {
                var event;
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
            };
            return class_2;
        }());
    }
    exports.default = exports.ShimAbortController;
});
//# sourceMappingURL=AbortController.js.map