import React from 'react'
import Layout from '../components/Layout'
import List from '../components/List'
import useProjects from '../hooks/useProjects'

// Renders a list of all projects
const WorkPage = () => {
  const projects = useProjects()

  return (
    <Layout title="Work" url="/work">
      <List items={projects} />
    </Layout>
  )
}

export default WorkPage
