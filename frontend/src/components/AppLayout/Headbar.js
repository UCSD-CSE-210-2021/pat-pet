import { Layout, Button } from 'antd';
import React from "react";
import "./Headbar.css";
import { HeadbarToggle0, HeadbaarToggle1 } from "../Widgets/svg";
// import { useStore } from "../ReactHooks/useStore";
import ProfilePopover from "./ProfilePopover";
const { Header } = Layout;

export default function Headbar({ 
  isSidebarExtended,
  setIsSidebarExtended
}) {
  // const [store, setStore] = useStore();

  return (
    <>
    <div className="headbar">
      <Header>
        <div className="headbar-left">
          {
            isSidebarExtended
            ? <Button 
                className="headbar-toggle-button"
                onClick={() => setIsSidebarExtended(false)}>
                <div className="headbar-toggle-svg">
                  <HeadbarToggle0 />
                </div>
              </Button>
            : <Button 
                className="headbar-toggle-button"
                onClick={() => setIsSidebarExtended(true)}>
                <div className="headbar-toggle-svg">
                  <HeadbaarToggle1 />
                </div>
              </Button>
          }
          <div className="headbar-welcome">
            <img className="logo-holder" src="/petpat.jpg" alt="check" />
            <div className="headbar-text">
              Time to pat a pet! ;)
            </div>
          </div>
        </div>
        <ProfilePopover/>
      </Header>
    </div>
    </>
  );
}
