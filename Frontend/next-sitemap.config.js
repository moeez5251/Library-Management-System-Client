/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://xlms-client.netlify.app', // your live domain
  generateRobotsTxt: true, // also generates robots.txt
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/req/*', '/admin/*', '/api/*'], // exclude private or backend routes
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api', '/req'] },
    ],
  },
}
