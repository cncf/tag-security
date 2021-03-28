import React, { Fragment } from "react";
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Subtree = ({subTopicTree}) => {
    return (
      <div>
        <ul className={styles.subtree_ul}>
            {subTopicTree.map((topic) =><>
              <li key={topic.name}>
                <Link href={topic.slug}>
                <a>{topic.name}</a>
                </Link>
              </li>
              <Subtree subTopicTree={topic.subTopics}></Subtree>
            </>)}
        </ul>
      </div>
    );
  };
  
  export default Subtree;
