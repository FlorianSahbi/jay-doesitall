// @path: src/app/robots.ts

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.jaydoesitall.com/sitemap.xml',
  }
}
