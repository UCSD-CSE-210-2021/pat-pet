import { Popover, Avatar } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import "./ProfilePopover.css";
// import { useStore } from "../ReactHooks/useStore";
import { ProfileIcon } from "../Widgets/svg";
import ProfilePopoverMenu from "./ProfilePopoverMenu";

export default function ProfilePopover() {
  // const [store] = useStore();

  return (
    <>
      <Popover 
        placement="bottom" title={null}
        content={
          <ProfilePopoverMenu />
        }
        trigger="hover">
        <div className="profile-row">
          <div className="row">
            <Avatar
              size={80}
              style={{
                position: "absolute",
                top: 4,
                right: 200,
                zIndex: 1,
                backgroundColor: "#FF8453"
              }}
              icon={
                <div className="profile-logo">
                  <ProfileIcon />
                </div>
              }
            />
          </div>
          <div className="addr-holder app-purple-text">
            <span className="addr">Johnny Silverhand</span>
            <CaretDownOutlined 
              style={{
                position: "absolute",
                background: "transparent",
                top: 28,
                right: 20,
                zIndex: 1
              }}/>
          </div>
        </div>
      </Popover>
    </>
  );
}
