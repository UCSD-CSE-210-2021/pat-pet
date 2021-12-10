import "./index.css";
import React from "react";
import Follow from "./Follow"
import OwnedPets from "./OwnedPets"

export default function HomePage() {
    return (
      <div className="home-page">
      <OwnedPets/>
      <Follow/>
  </div>
  );
}