import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Tooltip } from "antd";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";

const copyToClipboard = (text, onCopied, justCopied, customStyles = null) => {
  return (
    <CopyToClipboard
      text={text}
      onCopy={onCopied}
      className="copy-to-clipboard"
    >
      <span className="anticon-class">
        {justCopied ? (
          <CheckOutlined style={{ color: "#228533", margin: "0px 4px" }} />
        ) : (
          <CopyOutlined
            style={{
              color: "#888888",
              opacity: "0.8",
              margin: "0px 4px",
              ...customStyles
            }}
          />
        )}
      </span>
    </CopyToClipboard>
  );
};

export const CopyableIcon = ({ text, toolTip = null, customStyles = null }) => {
  const [justCopied, setJustCopied] = useState(false);
  const onCopied = () => {
    setJustCopied(true);
    setTimeout(() => {
      setJustCopied(false);
    }, 2000);
  };

  return toolTip ? (
    <Tooltip placement={toolTip.placement} title={toolTip.title}>
      {copyToClipboard(text, onCopied, justCopied, customStyles)}
    </Tooltip>
  ) : (
    copyToClipboard(text, onCopied, justCopied, customStyles)
  );
};
