import React, { Fragment } from "react";
import { useState } from 'react';
import Head from "next/head";
import styles from '../styles/Home.module.css'
import {parseIndexFileToTree} from '../components/topicTree'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

const Index = ({ data, topicTree, landingPage}) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>CNSmap</title>
      </Head>
      <div className={styles.main_content}>
      <h1>Cloud Native Security Map </h1>
      <h4>A practitioner's and learner's guide on navigating the Cloud Native security landscape</h4>
      <br/>
      <p>The Cloud Native Security map builds on top of the Cloud Native Security Whitepaper by SIG-Security, by providing an additional practitioner's perspective as well as an interactive mode of consumption, to facilitate the exploration of Cloud Native Security concepts and how they are used. The Cloud Native Security Map provides mapping of security topics to projects that one can use, as well as provide some examples of using these projects to help illustrate the controls and configuration required.</p>
      </div>
    </div>
  );
};

export default Index;



export async function getStaticProps() {
  const fs = require("fs");

  const indexList = fs.readFileSync(`${process.cwd()}/content/index`, "utf-8");
  const topicTree = parseIndexFileToTree(indexList);

  const landingPage =fs.readFileSync(`${process.cwd()}/content/landing.md`, "utf-8");

  // Use topic tree here for content later on

  /*
  const files = fs.readdirSync(`${process.cwd()}/content`, "utf-8");

  const blogs = files.filter((fn) => fn.endsWith(".md"));
  // Import our .md file using the `slug` from the URL
  const content = await import(`../content/${slug}.md`)
  // Parse .md data through `matter`
  const data = matter(content.default)
  // const data = matter(content.default);
  const data = blogs.map((blog) => {
    const path = `${process.cwd()}/content/${blog}`;
    const rawContent = fs.readFileSync(path, {
      encoding: "utf-8",
    });

    return rawContent;
  });
  */
  return {
    props: {
      topicTree: JSON.parse(JSON.stringify(topicTree)),
      landingPage:landingPage,
    },
  };
}
