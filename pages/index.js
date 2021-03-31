import React, { Fragment } from "react";
import { useState } from 'react';
import Head from "next/head";
import {parseIndexFileToTree} from '../components/topicTree'

const Index = ({ data, topicTree }) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>CNSmap</title>
      </Head>
      <div>
       <h2>CNCF Cloud Native Security Map</h2>
       <p>The Cloud Native Security Map aims to: </p>
         <ul>
           <li>
           provide a mapping of CNCF and open source projects to areas of CN Security whitepaper
           </li>
           <li>
           Identify gaps in CN Security in the ecosystem and make recommendations to TOC
           </li>
           <li>
           Help educate practitioners of what technologies can be used in practice and how they tie into each other
           </li>
           <li>
           Provide practical tips or examples for how to use tools within this category, or why they are important (I.e. example breaches, etc.)
           </li>
           <li>
           Provide a reference for frameworks to utilize when developing CN Security solutions and architectures.
           </li>
         </ul>
      </div>
    </div>
  );
};

export default Index;



export async function getStaticProps() {
  const fs = require("fs");

  const indexList = fs.readFileSync(`${process.cwd()}/content/index`, "utf-8");
  const topicTree = parseIndexFileToTree(indexList);
  // Use topic tree here for content later on

  /*
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
  */
  return {
    props: {
      topicTree: JSON.parse(JSON.stringify(topicTree)),
    },
  };
}
