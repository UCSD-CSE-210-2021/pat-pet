import { Layout, Menu } from 'antd';
import { HomeFilled, SwapOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import "./Sidebar.css";
const { SubMenu } = Menu;
const { Sider } = Layout;

export default function Sidebar({ isSidebarExtended }) {
  const history = useHistory();
  const subMenuStyle = { paddingLeft: 30, fontSize: 13 };

  return (
    <Sider
      width={170  }
      collapsedWidth={60}
      className="sidebar"
      collapsed={!isSidebarExtended}
    >
      <div className="padding"></div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item
          onClick={() => history.push("/")}
          key="home" icon={
          <HomeFilled style={{fontSize: 16, color: "rgb(122, 110, 170)"}}/>
        }>
          Home
        </Menu.Item>
        <SubMenu key="social" icon={
          <SwapOutlined style={{fontSize: 16, color: "rgb(122, 110, 170)"}}/>
        } title="Social">
          <Menu.Item
            onClick={() => history.push("/search")}
            style={subMenuStyle} key="social-search">Search</Menu.Item>
          <Menu.Item
            onClick={() => history.push("/post")}
            style={subMenuStyle} key="social-post">Post</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
