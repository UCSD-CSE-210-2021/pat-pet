import React, { useEffect, useState } from "react";
import { Typography, Card, Col, Row, message } from "antd";
import { sendGetRequest } from "../../../utils/request";
import { useStore } from "../../../components/ReactHooks/useStore";
const { Meta } = Card;
const { Title } = Typography;

export default function MyPets() {
    const [pets, setPets] = useState([]);
    const [store] = useStore();
  
    const onDelete = async petid => {
      try {
          let endpoint = `user/${store.userid}/pet/${petid}/delete`;
          let responseJson = await sendGetRequest(endpoint, "delete pets");
          if (responseJson.status === true) {
            message.success("Delete Success!")
          } else {
            message.error("Delete Failed!")
            return
          }
          endpoint = `user/${store.userid}/pets`;
          responseJson = await sendGetRequest(endpoint, "get owned pets");
          setPets(responseJson);
        } catch (err) {
          console.log(`Fetch Error ${err.message}`);
          return;
        }
    }
  
    useEffect(() => {
      const getOwnedPets = async () => {
        try {
          const endpoint = `user/${store.userid}/pets`;
          const responseJson = await sendGetRequest(endpoint, "get owned pets");
          setPets(responseJson);
        } catch (err) {
          setPets([]);
          console.log(`Fetch Error ${err.message}`);
          return;
        }
      }
      getOwnedPets();
    }, [store.userid]);

    return (
        <div className="mypets">
            <Typography style={{ marginLeft: 5, marginBottom: 20 }}>
                <Title style={{ color: "rgb(122, 110, 170)" }}>My Pets</Title>
            </Typography>
            <Row gutter={[16, 16]} style={{ overflowX: "none", overflowY: "scroll" }}>
                {pets.map((pet, i) =>
                (
                    <>
                        <Col style={{ marginRight: 30, marginBottom: 20 }}>
                            <Card
                                bodyStyle={{
                                    maxWidth: 300,
                                    maxHeight: 150,
                                    overflow: "auto"
                                }}
                                key={i}
                                bordered={false}
                                style={{ width: 250, height: 320, borderRadius: 10 }}
                                cover={<img style={{ width: 150, height: 150, marginTop: 5, paddingTop: 20, objectFit: "scale-down" }} alt="petimg" src={pet.image_url} />}
                            >
                                <Meta
                                    title={<span className="cute-font-title">{pet.name}</span>}
                                    description={<span className="cute-font-body">{pet.description}</span>} />
                            </Card>
                            <span class="dot" onClick={() => onDelete(pet.id)}>X</span>
                        </Col>
                    </>
                ))}
            </Row>
        </div>
    )
}