const tailwind = require('../tailwind');

module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "/portfolio"

  siteTitle: 'joel.net - Joel Thoms Portfolio', // Navigation and Site Title
  siteTitleAlt: 'joel.net - Joel Thoms Portfolio', // Alternative Site title for SEO
  siteUrl: 'https://joel.net', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteLogo: '/logos/logo-1024.png', // Used for SEO and manifest
  siteDescription: 'Seasoned developer who designs and creates custom applications that scale',

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@joelnet', // Twitter Username
  ogSiteName: 'joelnet', // Facebook Site Name
  ogLanguage: 'en_US', // Facebook Language

  // Manifest and Progress color
  themeColor: tailwind.colors.orange,
  backgroundColor: tailwind.colors.blue,
};
