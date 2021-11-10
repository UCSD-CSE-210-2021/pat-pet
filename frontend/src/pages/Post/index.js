
import "./index.css";
import React, { useState } from "react";
import { Form, Input, Button, Upload, Modal, message } from 'antd';
import { UploadButton } from "../../components/Widgets/button";
import { sendPostRequest } from "../../utils/request";
import { useHistory } from "react-router-dom";
import { useStore } from "../../components/ReactHooks/useStore";
const { TextArea } = Input;

export default function PostPage() {
  const [store] = useStore();
  const history = useHistory();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreivewTitle] = useState("");

  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      await sendPostRequest(
        "pets/new", 
        { ...values, 
          image_url: previewImage,
          owner_id: store.userid,
        },
        'newpet'
      );
    } catch (error) {
      message.error("Failed to post new pet");
      return;
    }
    message.success("New pet has been posted!");
    history.push("/");
  };
  
  const handleUpload = async event => {
    if (event.fileList.length === 0) {
      setFileList([]);
      setPreivewTitle('');
      setPreviewImage('');
      setPreviewVisible(false);
      return;
    }
    const fmData = new FormData();
    fmData.append("newImage", event.file.originFileObj);
    const response = await fetch(
      `${process.env.REACT_APP_IMAGE_SERVER_ENDPOINT}/upload`,
      {
        method: "POST",
        body: fmData
      }
    );
    const responseText = await response.text();
    if (response.status !== 200) {
        throw new Error(responseText);
    }
    const respJson = JSON.parse(responseText);
    setFileList([{
      uid: 1,
      name: `${respJson.filename}`,
      status: 'done',
      url: `${process.env.REACT_APP_IMAGE_SERVER_ENDPOINT}/images/${respJson.filename}`,
    }]);
  }
  const handlePreview = file => {
    setPreivewTitle(file.name);
    setPreviewImage(file.url);
    setPreviewVisible(true);
  }
  const handleCancel = () => setPreviewVisible(false);
  const UploadRow = () => (
    <>
      <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleUpload}
        >
          {fileList.length >= 1 ? null : UploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )

  return (
    <div className="postcontainer">
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 20 }}
        className="newpetform"
        name="basic"
        style={{width: 800}}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="on"
      >
        <Form.Item name={'name'} label="Pet Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'category'} label="Pet Category" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'description'} label="Pet Description" rules={[{ required: true }]}>
          <TextArea style={{height: 300}} />
        </Form.Item>
        <div style={{display: "flex", flexDirection: "row", marginLeft: 10}}>
          <span style={{marginLeft: 76}}>Photo: </span>
          <div style={{marginLeft: 13}}>
            <UploadRow />
          </div>
        </div>
        <Form.Item style={{marginTop: 30, paddingLeft: 200}}>
          <Button style={{width: 200}} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}