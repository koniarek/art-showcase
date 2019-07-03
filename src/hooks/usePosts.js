import { useStaticQuery, graphql } from 'gatsby'

export const useWritings = () => {
  const { writings } = useStaticQuery(
    graphql`
      query Writings {
        writings: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "post"}, published: {eq: true}}}, sort: {fields: [frontmatter___date], order: DESC}) {
          totalCount
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                description
                date(formatString: "YYYY")
                featuredImage {
                  childImageSharp {
                    sizes(maxHeight: 400) {
                      ...GatsbyImageSharpSizes
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  return writings
}

export default useWritings
