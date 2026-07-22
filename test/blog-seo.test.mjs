import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const execFileAsync = promisify(execFile);

function occurrences(text, value) {
  return text.split(value).length - 1;
}

async function queryPosts(script) {
  const { stdout } = await execFileAsync(process.execPath, [
    '--experimental-default-type=module',
    '--input-type=module',
    '--eval',
    script,
  ], { cwd: projectRoot });

  return JSON.parse(stdout);
}

test('uses the registered production origin from one shared module', async () => {
  const [site, sitemap, robots, blogPost] = await Promise.all([
    readFile(path.join(projectRoot, 'src/lib/site.js'), 'utf8'),
    readFile(path.join(projectRoot, 'src/app/sitemap.xml/route.js'), 'utf8'),
    readFile(path.join(projectRoot, 'src/app/robots.js'), 'utf8'),
    readFile(path.join(projectRoot, 'src/app/blog/[locale]/[slug]/page.js'), 'utf8'),
  ]);

  assert.match(site, /SITE_URL = 'https:\/\/paceguru\.app'/);
  assert.match(sitemap, /import \{ SITE_URL \} from '..\/..\/lib\/site'/);
  assert.match(robots, /absoluteUrl\('\/sitemap\.xml'\)/);
  assert.equal(occurrences(blogPost, 'const canonicalUrl = absoluteUrl('), 2);
});

test('selects related posts by topic and ignores a shared brand tag', async () => {
  const posts = await queryPosts(`
    import { getRelatedPosts } from './src/lib/posts.js';
    console.log(JSON.stringify(getRelatedPosts(
      'blog',
      'zh',
      '2026-07-17-easy-run-pace-heart-rate'
    ).map(post => post.slug)));
  `);

  assert.deepEqual(posts, [
    '2026-02-28-80-20-training-rule-why-elite-athletes-spend-80-of-their-tim',
    '2025-12-25-189-aerobic-decoupling',
    '2026-07-22-running-metronome',
  ]);
});

test('normalizes legacy comma-separated tags before comparing posts', async () => {
  const tags = await queryPosts(`
    import { getPostBySlug } from './src/lib/posts.js';
    console.log(JSON.stringify(getPostBySlug(
      'blog',
      'en',
      '2025-08-04-training-schedule-management-system'
    ).frontmatter.tags));
  `);

  assert.deepEqual(tags, ['release', 'training', 'schedule']);
});
