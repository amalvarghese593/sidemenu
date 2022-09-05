import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const Sidemenu = ({ listItems, getLabel, getPath, getSubmenu }) => {
  const [show, setShow] = useState({});
  const submenuOpenClose = (id, isSubMenu) => {
    if (isSubMenu) {
      setShow((prev) => ({
        [id]: !prev[id],
      }));
    } else setShow({});
  };

  return (
    <div className="sidemenu-wrapper">
      <nav>
        <ul>
          {listItems.map((item) => {
            const hasSubMenu = getSubmenu(item);
            return (
              <React.Fragment key={item.id}>
                <NavLink to={getPath(item)} /* end */>
                  {({ isActive }) => (
                    <li
                      onClick={
                        () => submenuOpenClose(item.id, hasSubMenu)
                        // hasSubMenu ? () => submenuOpenClose(item.id) : undefined
                      }
                      className={isActive ? "highlight" : ""}
                      // className={`${show[item.id] ? "highlight" : ""}`}
                    >
                      {getLabel(item)}
                    </li>
                  )}
                </NavLink>
                {hasSubMenu && (
                  <div className={`submenu ${show[item.id] ? "show" : ""}`}>
                    {getSubmenu(item)()}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
