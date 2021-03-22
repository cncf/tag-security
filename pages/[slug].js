import React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

function PostTemplate({ content, data }) {
  // This holds the data between `---` from the .md file
  const frontmatter = data
  return (
    <>
      <ReactMarkdown source={content} />
    </>
  )
}

PostTemplate.getInitialProps = async (props) => {
    // Import our .md file using the `slug` from the URL
  const content = await import(`../content/${props.query.slug}.md`)
    
    // parse .md data thorugh matter
  const markdown = matter(content.default)

  const { title, date, category, slug } = markdown.data

  return {
    content: markdown.content,
    data: { title, date, category, slug } 
  }
}  

export default PostTemplate
