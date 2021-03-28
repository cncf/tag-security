import Link from 'next/link'
import React, { Fragment } from "react";
import Subtree from '../components/subtree';
import {parseIndexFileToTree} from '../components/topicTree'
import txt from 'raw-loader!../content/index'
import styles from '../styles/Home.module.css'

function Sidebar() {
  const indexList = txt;
  const t = parseIndexFileToTree(indexList);
  const topicTree=JSON.parse(JSON.stringify(t))
  return (
    <div className={styles.sidebar_fixed}>
      <ul className={styles.subtree_ul}>
        <li key={topicTree.name}>
          <Link href={topicTree.slug}>
            <a>{topicTree.name}</a>
          </Link>
        </li>
        {topicTree.subTopics.map((subTopic) => <>
        <li>
        <Link href={subTopic.slug}>
            <a>{subTopic.name}</a>
          </Link>
          <Subtree subTopicTree={subTopic.subTopics}></Subtree>
        </li>
        </>)}
      </ul>
    </div>
    );
}

export default Sidebar;
