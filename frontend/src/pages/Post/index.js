
import React, { useState } from "react";
import { Form, Input, Button, Upload, Modal } from 'antd';
import { UploadButton } from "../../components/Widgets/button";

export default function PostPage() {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreivewTitle] = useState("");
  
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

  return (
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
}