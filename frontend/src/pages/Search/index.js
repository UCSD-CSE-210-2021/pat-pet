import "./index.css";
import React, { useState } from "react";
import { Input, Card, Col, Row, Popover, Button, Modal, AutoComplete } from "antd";
import { sendPostRequest } from "../../utils/request";
import { useStore } from "../../components/ReactHooks/useStore";
const { Search } = Input;
const { Meta } = Card;

export default function SearchPage() {
  const [pets, setPets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [store] = useStore()

  const filterPets = pets => {
    return pets.filter(pet => pet.owner_id !== store.userid)
  }
  
  const onSearch = async (keyword) => {
    try {
      const endpoint = `pets/search`;
      const responseJson = await sendPostRequest(
        endpoint, { keyword }, "search pets"
      );
      setPets(filterPets(responseJson));
    } catch (err) {
      setPets([]);
      console.log(`Fetch Error ${err.message}`);
      return;
    }
  }

  const showModal = () =>{
    setIsModalVisible(true);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="search-page">
      <Search style={{ width: 400, marginBottom: 20 }} placeholder="keyword" onSearch={onSearch} enterButton />
      <Row gutter={[16, 16]} style={{height: window.innerHeight - 100, overflowX: "none", overflowY: "scroll"}}>
        {pets.map((pet, i) => 
        (
          <>
            <Col style={{marginRight: 30, marginBottom: 20}}>
                <Card
                  key={i}
                  bordered={false}
                  bodyStyle={{
                    maxWidth: 300,
                    maxHeight: 150,
                    overflow: "auto"
                  }}
                  style={{ width: 250, height: 320, borderRadius: 10 }}
                  cover={<img style={{width: 150, height: 150, marginTop: 5, paddingTop: 20, objectFit: "scale-down"}} alt="petimg" src={pet.image_url}/>}
                  onClick = {showModal}
                >
                  <Meta 
                    title={<span className="cute-font-title">{pet.name}</span>} 
                    description={<span>{pet.description}</span>} />
                </Card>
              {/* </Popover> */}
            </Col>
            <Modal 
              title="Detailed information" 
              visible={isModalVisible} 
              onCancel={handleCancel}
              footer={[
                <Button type="primary"                       
                  style={{
                  backgroundColor: "rgb(31, 199, 212)",
                  borderRadius: 5,
                  width: 120
                }}
                target="_blank"
                href={"mailto:" + pet.contact}>
                  Email
                </Button>
              ]}
              >
              <Card
                key={i}
                bordered={false}
                bodyStyle={{
                  maxWidth: 500,
                }}
                style={{ width: 450, borderRadius: 10 }}
                cover={<img style={{ display:"block", marginLeft: "auto",  marginRight: "auto", width: "50%"}} alt="petimg" src={pet.image_url} />}
              >
                <Meta
                  title={<span className="cute-font-title">{pet.name}</span>}
                  description={<span>{pet.description}</span>} />
              </Card>
            </Modal>
          </>
        ))}
      </Row>
  </div>
  );
}