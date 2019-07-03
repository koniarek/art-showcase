import React from 'react'
import Layout from '../components/Layout'
import List from '../components/List'
import usePosts from '../hooks/usePosts'
import '../styles/pages/writing.css'

// Renders a list of all posts\
const WritingPage = () => {
  const posts = usePosts()
  
  return (
    <Layout 
      title="Writing" 
      location="writing"
    >
      <List items={posts} />
    </Layout>
  )
}

export default WritingPage
