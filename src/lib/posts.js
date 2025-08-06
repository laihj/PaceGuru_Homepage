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

// Get posts from the same day in previous years
export function getPostsFromSameDayInPreviousYears(type, locale, currentSlug) {
  const currentPost = getPostBySlug(type, locale, currentSlug);
  if (!currentPost) {
    return [];
  }
  
  const currentDate = new Date(currentPost.frontmatter.date);
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  
  const posts = getPosts(type, locale);
  
  return posts.filter(post => {
    if (post.slug === currentSlug) return false; // Exclude current post
    
    const postDate = new Date(post.frontmatter.date);
    const postMonth = postDate.getMonth();
    const postDay = postDate.getDate();
    const postYear = postDate.getFullYear();
    
    // Same month and day, but different year and previous year
    return postMonth === currentMonth && 
           postDay === currentDay && 
           postYear < currentYear;
  }).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)); // Sort by most recent first
}