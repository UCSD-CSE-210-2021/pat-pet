import React, { useEffect, useState } from "react";
import { Typography, Card, Col, Row, message } from "antd";
import { StarFilled } from '@ant-design/icons';
import { sendGetRequest } from "../../../utils/request";
import { useStore } from "../../../components/ReactHooks/useStore";
const { Meta } = Card;
const { Title } = Typography;

export default function Follow() {
    const [pets, setPets] = useState([]);
    const [store] = useStore();

    const onUnfollow = async petid => {
        console.log(`Unfollow ${petid}`)
        try {
            let endpoint = `user/${store.userid}/pet/${petid}/unfollow`;
            let responseJson = await sendGetRequest(endpoint, "unfollow pets");
            if (responseJson.status === true) {
              message.success("Unfollow Pet Success!")
            } else {
              message.error("Unfollow Pet Failed!")
              return
            }
            endpoint = `user/${store.userid}/follow`;
            responseJson = await sendGetRequest(endpoint, "get following pets");
            setPets(responseJson);
          } catch (err) {
            console.log(`Fetch Error ${err.message}`);
            return;
          }
    }

    useEffect(() => {
        const getFollowPets = async () => {
            try {
                const endpoint = `user/${store.userid}/follow`;
                const responseJson = await sendGetRequest(endpoint, "get following pets");
                setPets(responseJson);
            } catch (err) {
                setPets([]);
                console.log(`Fetch Error ${err.message}`);
                return;
            }
        }
        getFollowPets();
    }, [store.userid]);

    return (
        <div className="favpets">
            <Typography style={{ marginLeft: 5, marginBottom: 20 }}>
                <Title style={{ color: "rgb(122, 110, 170)" }}>Favorite Pets</Title>
            </Typography>
            <Row gutter={[16, 16]} style={{ overflowX: "none", overflowY: "scroll" }}>
                {pets.map((pet, i) =>
                (
                    <>
                        <Col style={{ marginRight: 30, marginBottom: 20 }}>

                            <Card
                                bodyStyle={{
                                    height: 150,
                                    maxWidth: 300,
                                    maxHeight: 150,
                                    overflow: "auto"
                                }}
                                key={i}
                                bordered={false}
                                style={{ width: 250, height: 320, borderRadius: 10 }}
                                cover={<img style={{ width: 150, height: 150, marginTop: 5, paddingTop: 20, objectFit: "scale-down" }} alt="petimg" src={pet.image_url} />}
                                actions={[<StarFilled key="unfavorite" style={{ color: "#FCAB10" }} onClick={() => onUnfollow(pet.id)} />]}
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
    )
}

