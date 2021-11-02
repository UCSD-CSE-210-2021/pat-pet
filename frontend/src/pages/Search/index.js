import React, { useState } from "react";
import { Input } from "antd";
import { sendPostRequest } from "../../utils/request";
const { Search } = Input;

export default function SearchPage() {
  const [pets, setPets] = useState([]);
  const onSearch = async (keyword) => {
    try {
      console.log(process.env.BACKEND_ENDPOINT)
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
    <>
      <Search placeholder="keyword" onSearch={onSearch} enterButton />
      <div style={{display: "flex", flexDirection: "row"}}>
        {pets.map((pet, i) => 
        (
          <div key={i} 
            style={{display: "flex", flexDirection: "column"}}>
            <span>
              {pet.name}
            </span>
            <span>
              {pet.description}
            </span>
            <img style={{width: 150, height: 150, objectFit: "scale-down"}} alt="petimg" src={pet.image_url}/>
          </div>
        ))}
    </div>
  </>
  );
}