import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

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
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || '',
          category: data.category || 'general',
          ...data
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
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      category: data.category || 'general',
      ...data
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