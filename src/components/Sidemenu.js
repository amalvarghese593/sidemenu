import React, { useState } from "react";

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
                <li
                  onClick={
                    () => submenuOpenClose(item.id, hasSubMenu)
                    // hasSubMenu ? () => submenuOpenClose(item.id) : undefined
                  }
                  className={`${show[item.id] ? "highlight" : ""}`}
                >
                  <a href={getPath(item)}>{getLabel(item)}</a>
                </li>
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
