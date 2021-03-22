import fs from 'fs'
import matter from 'gray-matter'

const folder = 'content'
const markdowns = fs.readdirSync(folder)
  .map(filename => matter(fs.readFileSync(`${folder}/${filename}`)))

export default async (req, res) => {
  res.status(200).json({
    posts: markdowns.map(md => ({
      content: md.content,
      data: md.data
    }))
  })
}
