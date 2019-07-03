import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import '../styles/pages/post.css';

const PostTemplate = ({ data: { page } }) => (
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

export default PostTemplate;

export const query = graphql`
  query PostTemplate($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        date(formatString: "MMMM Do, YYYY")
        keywords
        featuredImageCropped: featuredImage {
          childImageSharp {
            resolutions(height: 1200, width: 1200) {
              ...GatsbyImageSharpResolutions
            }
          }
        }
      }
    }
  }
`;
