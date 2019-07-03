const siteMetadata = require('./src/content/metadata.json');

// Get environment variables (managed by Netlify CMS admin settings)
const getValueFromEnv = (key, defaultValue = '') => {
  const { env } = process;

  if (env[key]) {
    return env[key];
  }
  return defaultValue;
};

// Get site metadata from JSON file (managed by Netlify CMS)
const getValueFromJson = (key, defaultValue = '') => {
  if (siteMetadata[key]) {
    return siteMetadata[key];
  }
  return defaultValue;
};

// Configuration for the Gatsby Source Filesystem plugin
const gatsbySourcePages = {
  resolve: 'gatsby-source-filesystem',
  options: {
    name: 'pages',
    path: `${__dirname}/src/content/`,
  },
};

const gatsbySourceImages = {
  resolve: 'gatsby-source-filesystem',
  options: {
    name: 'assets',
    path: `${__dirname}/src/assets/`,
  },
};

// Configuration for the Gatsby Transformer Markdown plugin
const gatsbyTransformerMarkdown = {
  resolve: 'gatsby-transformer-remark',
  options: {
    plugins: [
      {
        resolve: 'gatsby-remark-relative-images',
      },
      {
        resolve: 'gatsby-remark-images',
        options: {
          // See more: https://www.npmjs.com/package/gatsby-remark-images#options
          maxWidth: 1000,
          showCaptions: true,
          linkImagesToOriginal: false,
        },
      },
      'gatsby-remark-prismjs',
      'gatsby-remark-smartypants',
    ],
  },
};

// Configuration for Google Analytics
const gatsbyGoogleAnalytics = {
  resolve: 'gatsby-plugin-google-analytics',
  options: {
    trackingId: getValueFromEnv('GOOGLE_ANALYTICS_TRACKING_ID'),
    anonymize: true,
    respectDNT: true,
  },
};

// Configuration for the RSS feed
const gatsbyRssFeed = {
  resolve: 'gatsby-plugin-feed',
  options: {
    query: `
        {
          site {
            siteMetadata {
              title
              description
              url
            }
          }
        }
      `,
    feeds: [
      {
        serialize: ({ query: { site, allMarkdownRemark } }) => {
          const { siteMetadata } = site;

          return allMarkdownRemark.edges.map(({ node }) => Object.assign({}, node.frontmatter, {
            description: node.excerpt,
            url: `${siteMetadata.url}/${node.fields.slug}`,
            guid: `${siteMetadata.url}/${node.fields.slug}`,
          }));
        },
        query: `
            {
              allMarkdownRemark(
                limit: 1000,
                filter: {
                  frontmatter: {
                    templateKey: { eq: "post" }
                    published: { eq: true }
                  }
                }
                sort: {
                  fields: [ frontmatter___date ],
                  order: DESC
                }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
        output: 'rss.xml',
      },
    ],
  },
};

// Default Gatsby configuration
module.exports = {
  siteMetadata: {
    title: getValueFromJson('siteTitle'),
    description: getValueFromJson('siteDescription'),
    introduction: getValueFromJson('siteIntroduction'),
    keywords: getValueFromJson('siteKeywords'),
    url: getValueFromJson('siteUrl'),
    enablePortfolio: getValueFromJson('enablePortfolio'),
    portfolioCompanies: getValueFromJson('portfolioCompanies'),
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    gatsbySourcePages,
    gatsbySourceImages,
    gatsbyTransformerMarkdown,
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cms',
    gatsbyGoogleAnalytics,
    gatsbyRssFeed,
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-postcss',
  ],
};
