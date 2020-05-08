import React, { useState } from "react";
import "./Tabs.css";
import Tab from "./Tab";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTabItem = label => setActiveTab(label);

  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.map(child => {
          const { label } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={() => {
                onClickTabItem(label);
              }}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map(child => {
          if (child.props.label !== activeTab) {
            return undefined;
          }
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
