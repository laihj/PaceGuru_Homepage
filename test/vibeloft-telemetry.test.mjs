import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(projectRoot, 'src');
const layoutPath = path.join(sourceRoot, 'app', 'layout.js');
const scriptUrl = 'https://vibeloft.ai/telemetry/v1.js';
const productId = '11277e6e-55e0-4c59-bc42-e4c7a26ad39b';
const eventEndpoint = 'https://api.vibeloft.ai/api/v1/telemetry/events';

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(entryPath) : [entryPath];
  }));

  return files.flat();
}

function occurrences(text, value) {
  return text.split(value).length - 1;
}

test('installs the official runtime exactly once in the shared root layout', async () => {
  const layout = await readFile(layoutPath, 'utf8');
  const applicationSource = await Promise.all(
    (await sourceFiles(sourceRoot)).map(file => readFile(file, 'utf8'))
  );
  const allApplicationSource = applicationSource.join('\n');

  assert.equal(occurrences(allApplicationSource, scriptUrl), 1);
  assert.match(layout, new RegExp(`data-vl-product-id="${productId}"`));
  assert.match(layout, /data-vl-auth-key=/);
  assert.equal(occurrences(allApplicationSource, 'data-vl-auth-key='), 1);
  assert.match(layout, /<script\s+defer[\s\S]*src="https:\/\/vibeloft\.ai\/telemetry\/v1\.js"/);
  assert.match(layout, /<body[\s\S]*\{children\}/);
});

test('delegates collection and privacy behavior exclusively to the official runtime', async () => {
  const applicationSource = (await Promise.all(
    (await sourceFiles(sourceRoot)).map(file => readFile(file, 'utf8'))
  )).join('\n');

  assert.equal(occurrences(applicationSource, eventEndpoint), 0);
  assert.doesNotMatch(applicationSource, /supabase/i);
  assert.doesNotMatch(applicationSource, /globalPrivacyControl\s*=/i);
  assert.doesNotMatch(applicationSource, /doNotTrack\s*=/i);

  const response = await fetch(scriptUrl);
  assert.equal(response.ok, true);
  const runtime = await response.text();

  assert.match(runtime, /globalPrivacyControl/i);
  assert.match(runtime, /doNotTrack/i);
  assert.match(runtime, /credentials\s*:\s*["']omit["']/i);
  assert.match(runtime, new RegExp(eventEndpoint.replaceAll('/', '\\/')));
});

test('the production build embeds the registered product ID', async (t) => {
  const buildDirectory = path.join(projectRoot, '.next');
  if (!existsSync(buildDirectory)) {
    t.skip('Run after npm run build.');
    return;
  }

  const buildFiles = await sourceFiles(buildDirectory);
  const buildOutput = (await Promise.all(
    buildFiles.map(file => readFile(file, 'utf8').catch(() => ''))
  )).join('\n');

  assert.match(buildOutput, new RegExp(productId));
});
