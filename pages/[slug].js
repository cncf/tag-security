import React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import styles from '../styles/Home.module.css'

export default function PostTemplate({ data, content}) {
  console.log(data)

  // This holds the data between `---` from the .md file
  const frontmatter = data

  return (
    <div className={styles.main_content}>
      <h1>{frontmatter.title}</h1>
      <ReactMarkdown source={content} />
    </div>
  )
}


PostTemplate.getInitialProps = async (context) => {

  const { slug } = context.query
  
  // Import our .md file using the `slug` from the URL
  const content = await import(`../content/${slug}.md`)
  // Parse .md data through `matter`
  const data = matter(content.default)
  
  return { ...data }
}


