'use strict';

var github = require('@actions/github');
var core = require('@actions/core');
var process = require('process');
var fs = require('fs');
var load = require('@commitlint/load');
var lint = require('@commitlint/lint');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var github__namespace = /*#__PURE__*/_interopNamespace(github);
var process__default = /*#__PURE__*/_interopDefault(process);
var fs__namespace = /*#__PURE__*/_interopNamespace(fs);
var load__default = /*#__PURE__*/_interopDefault(load);
var lint__default = /*#__PURE__*/_interopDefault(lint);

// src/index.ts
function handleError(err, fail = true) {
  if (err instanceof Error) {
    core.error(err);
    fail && core.setFailed(err.message);
  } else {
    const message = typeof err == "string" ? err : "Unknown error has occurred!";
    core.error(message);
    fail && core.setFailed(message);
  }
}
var errHandle_default = handleError;

// src/log.ts
var SEPARATOR = "=====================";
function logWithTile(title, content) {
  return `${title}
${SEPARATOR}
${content}`;
}
var log_default = logWithTile;

// src/lint.ts
var defaultConfig = {
  extends: "@commitlint/config-conventional"
};
function getLintOptions(configuration) {
  var _a;
  return {
    defaultIgnores: configuration.defaultIgnores ? configuration.defaultIgnores : true,
    ignores: configuration.ignores ? configuration.ignores : void 0,
    parserOpts: typeof ((_a = configuration.parserPreset) == null ? void 0 : _a.parserOpts) == "object" ? configuration.parserPreset.parserOpts : void 0,
    plugins: configuration.plugins ? configuration.plugins : void 0,
    helpUrl: configuration.helpUrl ? configuration.helpUrl : void 0
  };
}
async function verifyTitle(title, configPath = "") {
  const commitlintConfig = fs__namespace.existsSync(configPath) ? await load__default.default({}, { file: configPath, cwd: process__default.default.cwd() }) : await load__default.default(defaultConfig);
  const linterResult = await lint__default.default(title, commitlintConfig.rules, getLintOptions(commitlintConfig));
  if (linterResult.valid) {
    return true;
  } else {
    const errors = linterResult.errors.map((error2) => {
      return `${error2.name}: ${error2.message}`;
    }).join("\n");
    throw new Error(log_default("Commitlint check failed!", errors));
  }
}

// src/index.ts
async function run() {
  const pullRequestPayload = github__namespace.context.payload.pull_request;
  if (!(pullRequestPayload == null ? void 0 : pullRequestPayload.title))
    throw new Error("Pull Request or Title not found!");
  const pullRequestObject = {
    title: pullRequestPayload.title,
    number: pullRequestPayload.number
  };
  await verifyTitle(pullRequestObject.title, "commitlint.config.js");
}
run().catch(errHandle_default);
