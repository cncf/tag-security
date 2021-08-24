import Link from 'next/link'
import React, {useState } from "react";
import Subtree from '../components/subtree';
import {parseIndexFileToTree} from '../components/topicTree'
import txt from 'raw-loader!../content/index'
import styles from '../styles/Sidemenu.module.css'
import { Accordion} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter, } from "next/router";
import Image from 'next/image'
import ContributionPage from '../components/contribution_page'

function Sidebar() {
  const router = useRouter();
  
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
      <div className={"marginLeft: '10px'"}>
      <Image
        src="/cloud-native-security-horizontal-color.png"
        alt="TAG-security-group-logo"
        width={250}
        height={150}
    />
      </div>
      <div>
        <Link href="/">
          <div><h4>{topicTree.name}</h4></div>
        </Link>
      </div>

      
      <div>
        <Accordion defaultActiveKey={activeId}>
          {topicTree.subTopics.map((topic) =><>
            <div className={activeId === topic.name ? styles.active_panel : styles.panel_wrap}>
              <div className={styles.panel_header}>
                <Accordion.Toggle onClick={() => toggleActive(topic.name)} className={styles.panel_toggle} variant="link" eventKey={topic.name}>
                  <Link href={topic.slug}>
                    <div className={router.asPath === "/"+topic.slug ? styles.navlinkActive : styles.navlink}>
                    {topic.name}</div>
                  </Link>
                </Accordion.Toggle>
            </div>
            {topic.subTopics ?(<>
            <Accordion.Collapse eventKey={topic.name}>
            <div className={styles.panel_body}><Subtree subTopicTree={topic.subTopics}></Subtree></div>
          </Accordion.Collapse></>)
          :(<></>)}
          
        </div>
          </>)}
        </Accordion>
      </div>
      <div className={styles.footer}>
        <Link href="https://github.com/lumjjb/cnsmap">
          <a>
          <Image
            src="/gh-logo.png"
            alt="github-logo"
            width={35}
            height={35}
            />
          </a>
        </Link>
        {" "} 
        <ContributionPage></ContributionPage>
      </div>
    </div>
    );
}
export default Sidebar;
