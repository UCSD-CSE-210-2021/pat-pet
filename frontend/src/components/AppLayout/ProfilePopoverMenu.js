import { List } from 'antd';
import { ApiOutlined, ProfileOutlined } from '@ant-design/icons';
import "./ProfilePopover.css";
import { useStore } from "../ReactHooks/useStore";

export default function ProfilePopoverMenu() {
  const [store, setStore] = useStore();

  const Row1 = () => (
    <div
      className="menu-row menu-row-first"
      onClick={() => {}}>
      <span className="menu-text">Profile</span>
      <ProfileOutlined
        style={{
          fontSize: 20,
          color: "rgb(40, 13, 95)"
        }}/>
    </div>
  );

  const Row2 = () => (
    <div
      onClick={() => {
        const nextuser = (store.curuser + 1) % store.numusers
        setStore(curStore => ({
          ...curStore,
          curuser : nextuser,
          username: curStore.users[nextuser].name,
          userid: curStore.users[nextuser].id,
        }))
      }}
      className="menu-row menu-row-last">
      <span className="menu-text">Log Off</span>
      <ApiOutlined
        style={{
          fontSize: 20,
          color: "rgb(40, 13, 95)"
        }}/>
    </div>
  );

  const listItems = [
    <Row1 />,
    <Row2 />,
  ];

  return (
    <>
      <List
        style={{
          width: "100%",
          height: "100%",
        }}
        bordered
        dataSource={listItems}
        renderItem={item => 
        <List.Item style={{padding: 0}}>{item}</List.Item>}
      />
    </>
  )
}