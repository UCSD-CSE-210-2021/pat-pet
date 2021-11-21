import "./ProfilePopover.css";
import { Form, List, message, Modal, Input } from 'antd';
import { ApiOutlined, ProfileOutlined } from '@ant-design/icons';
import "./ProfilePopover.css";
import { useStore } from "../ReactHooks/useStore";
import { useState } from 'react/cjs/react.development';
import { sendPostRequest } from "../../utils/request";
import { useEffect } from "react";

export default function ProfilePopoverMenu() {
  const [store, setStore] = useStore();
  const [modalVisible, setVisibility] = useState(false);
  useEffect(() => {}, [store.userid]);

  const Row1 = () => (
    <div
      className="menu-row menu-row-first"
      onClick={() => {setVisibility(true)}}>
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
          contact: curStore.users[nextuser].contact,
          zipcode: curStore.users[nextuser].zipcode
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

  const onSubmit = async () => {
    const values = form.getFieldsValue();
    try {
      await sendPostRequest(
        "user/update", 
        { ...values,
          id: store.userid
        },
        'user update'
      );
    } catch (error) {
      message.error("Failed to update profile");
      return;
    }
    message.success("Profile changed successfully!");
    setVisibility(false);
  }

  const [form] = Form.useForm();
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
      <Modal
        destroyOnClose
        visible={modalVisible}
        onOk={() => onSubmit()}
        onCancel={() => {setVisibility(false)}}>
        <div className="menu-text" style={{display: "flex", flexDirection: "column"}}>
          <span style={{marginBottom: 20}}>User Profile</span>
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 20 }}
            className="profile-form"
            name="basic"
            style={{width: 400}}
            autoComplete="on"
          >
            <Form.Item name={'contact'} label="Contact" rules={[{ required: true }]}>
              <Input defaultValue={store.contact}/>
            </Form.Item>
            <Form.Item name={'zipcode'} label="Zipcode" rules={[{ required: true }]}>
              <Input defaultValue={store.zipcode}/>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  )
}