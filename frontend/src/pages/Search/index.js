
import "./index.css";
import React, { useState } from "react";
import { Input, Card, Col, Row } from "antd";
import { sendPostRequest } from "../../utils/request";
const { Search } = Input;
const { Meta } = Card;

export default function SearchPage() {
  const [pets, setPets] = useState([]);
  
  const onSearch = async (keyword) => {
    try {
      const endpoint = `pets/search`;
      const responseJson = await sendPostRequest(
        endpoint, { keyword }, "search pets"
      );
      setPets(responseJson);
    } catch (err) {
      setPets([]);
      console.log(`Fetch Error ${err.message}`);
      return;
    }
  }

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
                hoverable
                style={{ width: 250, height: 320 }}
                cover={ <img style={{width: 150, height: 150, objectFit: "scale-down"}} alt="petimg" src={pet.image_url}/>}
              >
                <Meta 
                  title={<span className="cute-font-title">{pet.name}</span>} 
                  description={<span className="cute-font-body">{pet.description}</span>} />
              </Card>
            </Col>
          </>
        ))}
      </Row>
  </div>
  );
}