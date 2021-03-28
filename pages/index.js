import React, { Fragment } from "react";
import { useState } from 'react';
import Head from "next/head";
import {parseIndexFileToTree} from '../components/topicTree'

const Index = ({ data, topicTree }) => {

  const [visible, setVisibe] = useState(false);
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>CNSmap</title>
      </Head>
      <div>
        
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
