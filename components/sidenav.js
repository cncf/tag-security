import Link from 'next/link'
import React, { Fragment, useState } from "react";
import Subtree from '../components/subtree';
import {parseIndexFileToTree} from '../components/topicTree'
import txt from 'raw-loader!../content/index'
import styles from '../styles/Sidemenu.module.css'
import { Accordion} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";


function Sidebar() {
  const indexList = txt;
  const t = parseIndexFileToTree(indexList);
  const topicTree=JSON.parse(JSON.stringify(t))
  const [activeId, setActiveId] = useState('0')

  function toggleActive(id) {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  }

  return (
    <div className={styles.sidebar_fixed}>
      <div><h3>{topicTree.name}</h3></div>
      
      <div>
        <Accordion defaultActiveKey={activeId}>
          {topicTree.subTopics.map((topic) =><>
            <div className={activeId === topic.name ? styles.active_panel : styles.panel_wrap}>
              <div className={styles.panel_header}>
                <Accordion.Toggle onClick={() => toggleActive(topic.name)} className={styles.panel_toggle} variant="link" eventKey={topic.name}>
                  <Link href={topic.slug}>
                    <a>{topic.name}</a>
                  </Link>
                </Accordion.Toggle>
            </div>
            {topic.subTopics ?(
            <>

            <Accordion.Collapse eventKey={topic.name}>
            <div className={styles.panel_body}><Subtree subTopicTree={topic.subTopics}></Subtree></div>
          </Accordion.Collapse></>)
          :(<></>)}
          
        </div>
          </>)}
        </Accordion>
      </div>
    </div>
    );
}

export default Sidebar;

/* 
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
    */