/* eslint-disable no-console */
const path = require('path');

/*
 * Function: createPages
 * Description:
 */
module.exports = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;

  createRedirect({ fromPath: 'http://psb.design/*', isPermanent: true, toPath: 'https://www.pburtchaell.com/:splat' });
  createRedirect({ fromPath: 'https://psb.design/*', isPermanent: true, toPath: 'https://www.pburtchaell.com/:splat' });
  createRedirect({ fromPath: 'http://psb.codes/*', isPermanent: true, toPath: 'https://www.pburtchaell.com/:splat' });
  createRedirect({ fromPath: 'https://psb.codes/*', isPermanent: true, toPath: 'https://www.pburtchaell.com/:splat' });

  return graphql(`
    {
     allMarkdownRemark(limit: 1000) {
       edges {
         node {
           id
           fields {
             slug
           }
           frontmatter {
             templateKey
             published
             date(formatString: "YYYY")
             path
           }
         }
       }
     }
   }
 `).then(({ errors, data }) => {
    if (errors) {
      errors.forEach(error => console.error(error));

      throw new Error('GraqhQLError: Could not query pages');
    }

    data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { frontmatter, id } = node;
      const { templateKey, published } = frontmatter;

      if (published) {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`src/templates/${templateKey}.js`),
          context: {
            id,
          },
        });
      }
    });
  });
};
