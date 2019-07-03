import { useStaticQuery, graphql } from 'gatsby'

const useProjects = () => {
  const { projects } = useStaticQuery(
    graphql`
      query Projects {
        projects: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "project"}, published: {eq: true}}}, sort: {fields: [frontmatter___date], order: DESC}) {
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
                category
                featuredImage {
                  childImageSharp {
                    sizes(maxWidth: 800) {
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

  return projects
}

export default useProjects
