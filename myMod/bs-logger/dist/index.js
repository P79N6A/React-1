"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
exports.createLogger = logger_1.createLogger;
exports.lastSequenceNumber = logger_1.lastSequenceNumber;
exports.resetSequence = logger_1.resetSequence;
var context_1 = require("./logger/context");
exports.LogContexts = context_1.LogContexts;
var level_1 = require("./logger/level");
exports.LogLevels = level_1.LogLevels;
exports.logLevelNameFor = level_1.logLevelNameFor;
exports.parseLogLevel = level_1.parseLogLevel;
var message_1 = require("./logger/message");
exports.registerLogFormatter = message_1.registerLogFormatter;
exports.resetLogFormatters = message_1.resetLogFormatters;
var root_1 = require("./logger/root");
exports.default = root_1.rootLogger;
exports.logger = root_1.rootLogger;
exports.setup = root_1.setup;
var target_1 = require("./logger/target");
exports.DEFAULT_LOG_TARGET = target_1.DEFAULT_LOG_TARGET;
exports.parseLogTargets = target_1.parseLogTargets;
var testing = __importStar(require("./testing"));
exports.testing = testing;
