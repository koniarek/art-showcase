import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

const PageTemplate = ({ data: { page } }) => (
  <Layout
    title={page.frontmatter.title}
    description={page.frontmatter.description}
    keywords={page.frontmatter.keywords}
    url={page.fields.slug}
    variant="left-sidebar"
  >
    {page.html}
  </Layout>
);

export default PageTemplate;

export const query = graphql`
  query PageTemplate($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        keywords
      }
    }
  }
`;
