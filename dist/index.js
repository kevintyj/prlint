import * as github from '@actions/github';
import { error, setFailed } from '@actions/core';
import process from 'process';
import * as fs from 'fs';
import load from '@commitlint/load';
import lint from '@commitlint/lint';

// src/index.ts
function handleError(err, fail = true) {
  if (err instanceof Error) {
    error(err);
    fail && setFailed(err.message);
  } else {
    const message = typeof err == "string" ? err : "Unknown error has occurred!";
    error(message);
    fail && setFailed(message);
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
  const commitlintConfig = fs.existsSync(configPath) ? await load({}, { file: configPath, cwd: process.cwd() }) : await load(defaultConfig);
  const linterResult = await lint(title, commitlintConfig.rules, getLintOptions(commitlintConfig));
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
  const pullRequestPayload = github.context.payload.pull_request;
  if (!(pullRequestPayload == null ? void 0 : pullRequestPayload.title))
    throw new Error("Pull Request or Title not found!");
  const pullRequestObject = {
    title: pullRequestPayload.title,
    number: pullRequestPayload.number
  };
  await verifyTitle(pullRequestObject.title, "commitlint.config.js");
}
run().catch(errHandle_default);
