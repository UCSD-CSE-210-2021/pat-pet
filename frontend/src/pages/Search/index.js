import "./index.css";
import React, { useState } from "react";
import { Input, Card, Col, Row, Popover, Button, message } from "antd";
import { StarFilled } from '@ant-design/icons';
import { sendGetRequest, sendPostRequest } from "../../utils/request";
import { useStore } from "../../components/ReactHooks/useStore";
const { Search } = Input;
const { Meta } = Card;

export default function SearchPage() {
  const [pets, setPets] = useState([]);
  const [store] = useStore()

  const filterPets = pets => {
    return pets.filter(pet => pet.owner_id !== store.userid)
  }

  const followingList = followingPets => {
    return followingPets.map( pet => pet.id )
  }

  const bindFollowingInfo = (pets, followingList) => {
    let copy = [];
    pets.forEach((pet, i) => {
      copy.push({...pet});
      copy[i]["followed"] = followingList.includes(pet.id);
    })
    return copy
  }
  
  const onSearch = async (keyword) => {
    try {
      const endpoint = `pets/search`;
      let responseJson = await sendPostRequest(
        endpoint, { keyword }, "search pets"
      );
      let matched_pets = filterPets(responseJson);

      // Get pets now following. To light up or dim the follow button.
      const followEndpoint = `user/${store.userid}/follow`;;
      let followResponseJson = await sendGetRequest(
        followEndpoint, "get following pets"
      );

      let petsWithFollowing = bindFollowingInfo(matched_pets, followingList(followResponseJson));
      setPets(petsWithFollowing);
    } catch (err) {
      setPets([]);
      console.log(`Fetch Error ${err.message}`);
      return;
    }
  }

  const onFollowOperation = async (petid, followed) => {
    // followed = false Do follow; followed = True Do unfollow
    const op = followed ? "unfollow" : "follow";
    console.log(`${op} ${petid}`);
    try {
      let endpoint = `user/${store.userid}/pet/${petid}/${op}`;
      let responseJson = await sendGetRequest(endpoint, `${op} pets`);
      if (responseJson.status === true) {
        message.success(`${op} pets success!`)
      } else {
        message.error(`${op} pets failed!`)
        return
      }
      endpoint = `user/${store.userid}/follow`;
      responseJson = await sendGetRequest(endpoint, "get following pets");
      setPets(bindFollowingInfo(pets, followingList(responseJson)));
    } catch (err) {
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
              <Popover placement="top"
                content={
                  <div style={{
                      padding: 10, display: "flex", 
                      flexDirection: "column", 
                      backgroundColor: "rgb(122, 110, 170)",
                      color: "white",
                      borderRadius: 10,
                      justifyContent: "center"
                    }}>
                    <span style={{
                      justifyContent: "center", 
                      textAlign: "center",
                      marginBottom: 5
                      }}>
                        {pet.user_name}
                    </span>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "rgb(31, 199, 212)",
                        borderRadius: 5,
                        width: 120
                      }}
                      target="_blank"
                      href={"mailto:" + pet.contact}>
                        Email
                    </Button>
                  </div>
                }>
                <Card
                  key={i}
                  bordered={false}
                  bodyStyle={{
                    maxWidth: 300,
                    maxHeight: 150,
                    overflow: "auto"
                  }}
                  hoverable
                  style={{ width: 250, height: 320, borderRadius: 10 }}
                  cover={<img style={{width: 150, height: 150, marginTop: 5, paddingTop: 20, objectFit: "scale-down"}} alt="petimg" src={pet.image_url}/>}
                  actions={[<StarFilled key="followop" style={ pet.followed ? { color: "#FCAB10" } : {}} onClick={() => onFollowOperation(pet.id, pet.followed)} />]}
                >
                  <Meta 
                    title={<span className="cute-font-title">{pet.name}</span>} 
                    description={<span>{pet.description}</span>} />
                </Card>
              </Popover>
            </Col>
          </>
        ))}
      </Row>
  </div>
  );
}