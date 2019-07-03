import React from 'react'
import Layout from '../components/Layout'
import List from '../components/List'
import Text, { types as textTypes } from '../components/Text'
import useSiteMetadata from '../hooks/useSiteMetadata'
import useProjects from '../hooks/useProjects'
import '../styles/pages/index.css'

// Renders the home page for the site
const IndexPage = () => {
  const site = useSiteMetadata()
  const projects = useProjects() 

  return (
    <Layout 
      title="Home" 
      location="/"
      variant="no-title"
    >
      <Text>{site.metadata.introduction}</Text>
      {site.metadata.enablePortfolio && (
        <>
          <Text type={textTypes.HEADER_2}>
            Recent Work
          </Text>
          <List items={projects} />
        </>
      )}
    </Layout>
  )
}

export default IndexPage
