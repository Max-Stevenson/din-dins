import React from "react";
import "./Tab.css";

const Tab = props => {
  let className = "tab-list-item";

  if (props.activeTab === props.label) {
    className += " tab-list-active";
  }

  return (
    <li
      className={className}
      onClick={props.onClick}
    >
      {props.label}
    </li>
  );
};

export default Tab;
