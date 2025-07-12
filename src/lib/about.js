import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const aboutDirectory = path.join(process.cwd(), 'content', 'about');

// Get the about page content for a specific locale
export function getAboutContent(locale = 'en') {
  const fullPath = path.join(aboutDirectory, locale, 'about.md');
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    frontmatter: {
      title: data.title || 'About',
      date: data.date || new Date().toISOString(),
      ...data
    },
    content
  };
}