import React from 'react'
import Layout from '../components/Layout'
import Text from '../components/Text'

// Renders 404 error page
const NotFoundPage = () => (
  <Layout
    title="Not Found"
    description="Page not found"
    variant="left-sidebar"
  >
    <Text>Sorry, but there is no page here.</Text>
  </Layout>
)

export default NotFoundPage
