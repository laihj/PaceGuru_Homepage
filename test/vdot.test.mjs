import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const execFileAsync = promisify(execFile);

async function runCalculator(script) {
  const { stdout } = await execFileAsync(process.execPath, [
    '--experimental-default-type=module',
    '--input-type=module',
    '--eval',
    script,
  ], { cwd: projectRoot });
  return JSON.parse(stdout);
}

test('calculates a VDOT score from the same 5K lookup value used by PaceGuru iOS', async () => {
  const result = await runCalculator(`
    import { getVdotForRace } from './src/lib/vdot.js';
    console.log(JSON.stringify(getVdotForRace('50', 289.6 * 5)));
  `);

  assert.equal(result, 40);
});

test('interpolates equivalent results across race distances', async () => {
  const result = await runCalculator(`
    import { getFinishTimeForVdot, getPaceForVdot } from './src/lib/vdot.js';
    console.log(JSON.stringify({
      marathon: getFinishTimeForVdot(40, '422'),
      fiveK: getPaceForVdot(40, '50'),
    }));
  `);

  assert.equal(result.fiveK, 289.6);
  assert.equal(result.marathon, 13785.1065);
});

test('rejects scores outside the supported table range', async () => {
  const result = await runCalculator(`
    import { getVdotForRace } from './src/lib/vdot.js';
    console.log(JSON.stringify(getVdotForRace('50', 60)));
  `);

  assert.equal(result, null);
});

test('provides localized calculator copy and language-specific URLs', async () => {
  const result = await runCalculator(`
    import { VDOT_LOCALES, getVdotCopy } from './src/lib/vdot-i18n.js';
    import { getVdotMetadata, vdotLanguageAlternates, vdotUrl } from './src/lib/vdot-seo.js';
    console.log(JSON.stringify({
      locales: VDOT_LOCALES,
      englishTitle: getVdotCopy('en').heroTitle,
      japaneseTitle: getVdotCopy('ja').heroTitle,
      chineseUrl: vdotUrl('zh'),
      englishCanonical: getVdotMetadata('en').alternates.canonical,
      alternates: vdotLanguageAlternates(),
    }));
  `);

  assert.deepEqual(result.locales, ['zh', 'en', 'ja']);
  assert.equal(result.englishTitle, 'One race. A clearer read on your current ability.');
  assert.equal(result.japaneseTitle, 'レースひとつで、今の走力が見えてくる。');
  assert.equal(result.chineseUrl, 'https://vdot.paceguru.app/');
  assert.equal(result.englishCanonical, '/en');
  assert.equal(result.alternates['zh-CN'], 'https://vdot.paceguru.app/');
  assert.equal(result.alternates.ja, 'https://vdot.paceguru.app/ja');
});
