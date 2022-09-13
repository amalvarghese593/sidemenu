import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export const Sidemenu = ({ listItems, getLabel, getPath, getSubmenu }) => {
  const { pathname } = useLocation();

  const [show, setShow] = useState(() => {
    const matchingItem = listItems.find(
      (el) => el.Submenu && new RegExp(`^${el.path}`).test(pathname)
    );
    if (matchingItem) {
      return {
        [matchingItem.id]: true,
      };
    }
    return {};
  });

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
                <NavLink
                  to={getPath(item)}
                  data-submenu={hasSubMenu ? "true" : "false"}
                >
                  {({ isActive }) => (
                    <li
                      onClick={() => submenuOpenClose(item.id, hasSubMenu)}
                      className={isActive ? "highlight" : ""}
                    >
                      {getLabel(item)}
                      {hasSubMenu &&
                        (show[item.id] ? <UpArrow /> : <DownArrow />)}
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

const DownArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-caret-down-fill"
    viewBox="0 0 16 16"
  >
    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
  </svg>
);
const UpArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-caret-up-fill"
    viewBox="0 0 16 16"
  >
    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
  </svg>
);
