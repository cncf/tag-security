import React, { Fragment } from "react";
import Link from 'next/link'

const Subtree = ({subTopicTree}) => {
    return (
      <div>
        <ul>
            {subTopicTree.map((topic) =><>
              <li key={topic.name}>
                <Link href={topic.slug}>
                    <a>{topic.name}</a>
                </Link>
              </li>
              {topic.subTopics &&
                <Subtree subTopicTree={topic.subTopics}></Subtree>
              }
            </>)}
        </ul>
      </div>
    );
  };
  
  export default Subtree;
