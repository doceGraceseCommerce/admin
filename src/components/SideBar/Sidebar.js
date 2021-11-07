import React from 'react';
import './Sidebar.css';
import { SidebarData } from "./SidebarData";

function Sidebar() {
  return (    
      <div className="sidebar">
        <ul className="sidebarList">
          {SidebarData.map((val, key) => {
            return <li className="row" key={key} onClick={() => { window.location.pathname = val.link }}> <div>{val.title}</div> </li>
          })}
        </ul>
      </div>
  );
}

export default Sidebar
