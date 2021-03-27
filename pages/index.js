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
      <div className={styles.title}>
          <h1>Cloud Native Security Map</h1>
          <hr class="solid"></hr>
        </div>
      <div className={styles.container}>
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

class Topic {
  constructor(name, slug) {
    this.name = name;
    this.slug = slug;
    this.subTopics = [];
  }

  addTopic(topic) {
    this.subTopics.push(topic);
  }

  lastTopic() {
    return this.subTopics[this.subTopics.length-1];
  }

  toString() {
    //var header = this.name + "(" + this.slug + ")";
    var header = `${this.name} (${this.slug})`;

    var topicStrings = "";
    for (var i=0; i<this.subTopics.length; i++){
      topicStrings += `\n${this.subTopics[i]}`;
    }
    topicStrings = topicStrings.split('\n').map(l => "  " + l).join('\n');
    return header + topicStrings;
  }

}

function parseIndexFileToTree (content) {
  // 2 spaces = 1 index
  const lines = content.split('\n');
  const ret = parseHelper(0,0, new Topic("Cloud Native Security Map", "cloud-native-security-map"), lines)[0];

  // Explore tree
  console.log(ret.toString());
  return ret;
}

// Recursive helper to help add sub topics to a topic header
function parseHelper (currIndex, startLine, topic, lines) {
  currIndex = currIndex;
  var i;
  var retData, endLine;
  for(i = startLine;i < lines.length; i++){
    const line = lines[i];
    const spacing = line.search(/\S/);

    // Ignore empty line
    if (spacing === -1) {
      continue;
    }
    const lineIndex = spacing / 2;
    if (lineIndex > currIndex+1) {
        console.log("Parse Error: Invalid index is more than 1 level down from previous line");
        throw "Parse Error: Invalid index is more than 1 level down from previous line";
    }

    if (lineIndex === currIndex) {
      // If still in current depth, means a new topic
      const obj = JSON.parse(line.substr(line.indexOf("{")));
      topic.addTopic(new Topic(obj.name, obj.slug));
    } else if (lineIndex === currIndex+1) {
      // next index depth means the previous topic has sub-topics, recursive call for content of the last topic
      [retData, endLine] = parseHelper(currIndex+1, i, topic.lastTopic(), lines);
      i=endLine-1;
    } else {
      // else we are in a previous depth, that means we are done adding to a topic
      [retData, endLine] = [topic,i];
      return [retData,endLine];
    }
  }
  retData = topic;
  endLine = i;
  return [retData, endLine];
}


export async function getStaticProps() {
  const fs = require("fs");

  const indexList = fs.readFileSync(`${process.cwd()}/content/index`, "utf-8");
  const topicTree = parseIndexFileToTree(indexList);
  // Use topic tree here for content later on


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
