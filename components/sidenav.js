import Link from 'next/link'
import React, { Fragment } from "react";
import Subtree from '../components/subtree';
import fs from 'fs';

function Sidebar() {
  return (
    <div>
      <ul>
        <li>
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