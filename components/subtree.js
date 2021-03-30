import React, { Fragment } from "react";
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react';

const Subtree = ({subTopicTree}) => {
  const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <ul className={styles.subtree_ul}>
            {subTopicTree.map((topic) =><>
              <li key={topic.name}>
                <Link href={topic.slug}>
                <a onClick={() => setIsOpen((isOpen) => !isOpen)}>{topic.name}</a>
                </Link>
              </li>
              {isOpen ? (
              <>
               <Subtree subTopicTree={topic.subTopics}></Subtree>
               </>
               ):<></>}
            </>)}
        </ul>
      </div>
    );
  };
  export default Subtree;
