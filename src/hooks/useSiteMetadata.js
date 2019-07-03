import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          metadata: siteMetadata {
            url
            title
            description
            introduction
            keywords
            enablePortfolio
          }
        }
      }
    `
  )

  return site
}

export default useSiteMetadata
