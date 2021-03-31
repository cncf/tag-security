import{ Fragment, useState } from "react";
import Link from 'next/link'
import styles from '../styles/Sidemenu.module.css';
import { Accordion} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

const Subtree = ({subTopicTree}) => {
  const [activeId, setActiveId] = useState('0')

  function toggleActive(id) {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  }

    return (
      <div>
        <Accordion defaultActiveKey={activeId}>
          {subTopicTree.map((topic) =><>
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
    );
  };
  export default Subtree;

  /*
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
*/