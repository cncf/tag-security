import React, { Fragment } from "react";
import Head from "next/head";
import matter from "gray-matter";
import Posts from '../components/modal'
import styles from '../styles/Home.module.css'

const Index = ({ data, category }) => {
  const RealData = data.map((blog) => matter(blog));
  const categories = {}

  // hack for setting categories in correct order
  categories["Develop"]=[]
  categories["Distribute"]=[]
  categories["Deploy"]=[]
  categories["Runtime"]=[]
  categories["Security Assurance and Controls"]=[]
  categories["Compliance"]=[]

  RealData.forEach(element => {
    if(!categories[element.data.category]){
      categories[element.data.category]=[] //if category doesn't exist, create it
    }
    categories[element.data.category].push(element)
  });
  const categoryList=Object.entries(categories)
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="category" content={category}></meta>
        <title>CNSmap</title>
      </Head>
      <div className={styles.container}>
      <h1>Cloud Native Security Map</h1>
        <ul className= {styles.cardContainer}>
          {categoryList.map(([title, elements ]) => <>
            <li className={styles.category} key={title}>
              <h2>{title}</h2>
              <ul className={styles.content}>
                {elements.map(({data, content}) => 
                  <li key={data.title}>
                  <Posts data={data} content={content}></Posts>
                </li>
                )}
              </ul>
            </li>
          </>)}
        </ul>
      </div>
    </div>
  );
};

export default Index;

export async function getStaticProps() {
  const fs = require("fs");

  const files = fs.readdirSync(`${process.cwd()}/content`, "utf-8");

  const blogs = files.filter((fn) => fn.endsWith(".md"));

  // const data = matter(content.default);
  const data = blogs.map((blog) => {
    const path = `${process.cwd()}/content/${blog}`;
    const rawContent = fs.readFileSync(path, {
      encoding: "utf-8",
    });

    return rawContent;
  });
  
  return {
    props: {
      data: data,
    },
  };
}