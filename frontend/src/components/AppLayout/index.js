import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import Headbar from "./Headbar";
import './index.css';
const { Content } = Layout;

export default function AppLayout({ children }) {
  const [isSidebarExtended, setIsSidebarExtended] = useState(true);

  return (
    <Layout>
      <Headbar
        isSidebarExtended={isSidebarExtended}
        setIsSidebarExtended={setIsSidebarExtended}/>
      <Layout>
        <Sidebar
          isSidebarExtended={isSidebarExtended}
        />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content className="content">
            { children }
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
