import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');
const IGNORED_RELATION_TAGS = new Set(['paceguru']);

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.map(item => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value.split(',').map(item => item.trim()).filter(Boolean);
  }

  return [];
}

function normalizeTerm(value) {
  return String(value || '').trim().toLocaleLowerCase();
}

// Get all posts for a specific type (blog) and locale
export function getPosts(type, locale = 'en') {
  const fullPath = path.join(contentDirectory, type, locale);
  
  // Check if directory exists
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  const filenames = fs.readdirSync(fullPath);
  const posts = filenames
    .filter(name => name.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(fullPath, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: filename.replace(/\.md$/, ''),
        frontmatter: {
          ...data,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || '',
          category: data.category || 'general',
          tags: normalizeList(data.tags),
          related: normalizeList(data.related)
        },
        content
      };
    })
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
    
  return posts;
}

// Get a single post by slug
export function getPostBySlug(type, locale, slug) {
  const fullPath = path.join(contentDirectory, type, locale, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    frontmatter: {
      ...data,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      category: data.category || 'general',
      tags: normalizeList(data.tags),
      related: normalizeList(data.related)
    },
    content
  };
}

// Get all blog posts for a locale
export function getBlogPosts(locale = 'en') {
  return getPosts('blog', locale);
}

// Get available locales for a post type
export function getAvailableLocales(type) {
  const typePath = path.join(contentDirectory, type);
  
  if (!fs.existsSync(typePath)) {
    return ['en']; // Default fallback
  }
  
  return fs.readdirSync(typePath).filter(item => {
    const itemPath = path.join(typePath, item);
    return fs.statSync(itemPath).isDirectory();
  });
}

// Get previous and next posts for navigation
export function getAdjacentPosts(type, locale, currentSlug) {
  const posts = getPosts(type, locale);
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { previousPost: null, nextPost: null };
  }
  
  return {
    previousPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
    nextPost: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  };
}

// Get articles that share a manually curated link, topic, tags, or category.
// This keeps related reading useful even when no post was published on the same date.
export function getRelatedPosts(type, locale, currentSlug, limit = 3) {
  const currentPost = getPostBySlug(type, locale, currentSlug);
  if (!currentPost) {
    return [];
  }

  const currentTopic = normalizeTerm(currentPost.frontmatter.topic);
  const currentCategory = normalizeTerm(currentPost.frontmatter.category);
  const currentTags = new Set(
    normalizeList(currentPost.frontmatter.tags)
      .map(normalizeTerm)
      .filter(tag => !IGNORED_RELATION_TAGS.has(tag))
  );
  const manualRelated = new Set(normalizeList(currentPost.frontmatter.related));
  const posts = getPosts(type, locale);

  return posts.filter(post => {
    return post.slug !== currentSlug;
  }).map(post => {
    const postTopic = normalizeTerm(post.frontmatter.topic);
    const postCategory = normalizeTerm(post.frontmatter.category);
    const postTags = normalizeList(post.frontmatter.tags)
      .map(normalizeTerm)
      .filter(tag => !IGNORED_RELATION_TAGS.has(tag));
    const sharedTags = postTags.filter(tag => currentTags.has(tag)).length;
    const manuallyRelated = manualRelated.has(post.slug);

    let score = 0;
    if (manuallyRelated) score += 100;
    if (currentTopic && currentTopic === postTopic) score += 30;
    score += sharedTags * 8;
    if (currentCategory && currentCategory === postCategory) score += 3;

    return { post, score };
  }).filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.frontmatter.date) - new Date(a.post.frontmatter.date);
    })
    .slice(0, limit)
    .map(({ post }) => post);
}
