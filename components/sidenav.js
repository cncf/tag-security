import Link from 'next/link'
import React, { Fragment } from "react";
import Subtree from '../components/subtree';
import {parseIndexFileToTree} from '../components/topicTree'
import txt from 'raw-loader!../content/index'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import Image from 'next/image'

function Sidebar() {
  const indexList = txt;
  const t = parseIndexFileToTree(indexList);
  const topicTree=JSON.parse(JSON.stringify(t))
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.sidebar_fixed}>
    <Link href={topicTree.slug}>
    <a><h2 className={styles.title}>{topicTree.name}</h2></a>
    </Link>
    <Image
        src="/sig-security-horizontal-color.png"
        alt="Sig-security-group-logo"
        width={250}
        height={250}
    />
    <ul className={styles.subtree_ul}>
    {topicTree.subTopics.map((subTopic) => <>
    
      <li key="">
      <Link href={subTopic.slug}>
        <a onClick={() => setIsOpen((isOpen)=> !isOpen)}><strong>{subTopic.name}</strong></a>
      </Link>
      {isOpen ? (
        <>
          <Subtree subTopicTree={subTopic.subTopics}></Subtree>
        </>
        ):<>
      </>}
      </li>
        </>)}
        </ul>
        </div>
        );
      }
      
      export default Sidebar;
      