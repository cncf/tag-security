import React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import styles from '../styles/Home.module.css'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter showLineNumbers={true} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};

export default function PostTemplate({ data, content}) {
  // This holds the data between `---` from the .md file
  const frontmatter = data

  return (
    <div className={styles.main_content}>
      <h1>{frontmatter.title}</h1>
      <ReactMarkdown
        escapeHtml={false}
        source={content}
        renderers={{ code: CodeBlock }}
      />
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


