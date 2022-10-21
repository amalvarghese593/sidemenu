import { useEventListener } from "hooks/useEventListener";
import React, { useState, useRef, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

const isMobile = window.innerWidth < 480;

export const Sidemenu = ({
  listItems = [],
  getLabel = () => {},
  getPath = () => {},
  getSubmenu = () => {},
  getIcon = () => {},
  components: Components = {},
}) => {
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapseSvgRef = useRef();

  /* to open submenu in sidemenu initially from url */
  const initialSubmenu = useMemo(() => {
    const matchingItem = listItems.find(
      (el) => el.Submenu && new RegExp(`^${el.path}`).test(pathname)
    );
    if (matchingItem) {
      return {
        [matchingItem.id]: true,
      };
    }
    return {};
  }, []);
  const [show, setShow] = useState(initialSubmenu);

  const submenuOpenClose = (id, SubMenu) => {
    if (SubMenu) {
      setShow((prev) => ({
        [id]: !prev[id],
      }));
    } else setShow({});
  };

  const hasCollapseBtn = Components?.hasOwnProperty("CollapseBtn");
  const handleCollapse = () => setIsCollapsed((prev) => !prev);

  const handleMouseEnter = (e) => {
    if (e.target !== collapseSvgRef.current && isCollapsed)
      setIsCollapsed(false);
  };
  const sidemenuRef = useRef();
  const onClickOutside = (e) => {
    if (
      !sidemenuRef.current.contains(e.target) &&
      !isCollapsed &&
      e.target !== collapseSvgRef.current
    ) {
      setIsCollapsed(true);
    }
  };
  // //without handler as dependency
  // useEventListener(document, "click", onClickOutside, [isCollapsed]);
  // //with handler as dependency(iscollapsed is used inside handler fn)
  // useEventListener(document, "click", onClickOutside);
  useEventListener("click", onClickOutside, document);

  const handleClick = (itemId, SubMenu) => {
    if (isMobile && !SubMenu) {
      setIsCollapsed(true);
    }
    submenuOpenClose(itemId, SubMenu);
  };

  const classNames = useMemo(() => {
    const classes = {
      sidemenuWpr: ["sidemenu-wrapper"],
      collapseBtn: ["collapse-btn"],
    };
    if (isCollapsed) {
      classes.sidemenuWpr.push("w-sidemenu");
      classes.collapseBtn.push("rotate-180");
    } else if (isMobile) classes.sidemenuWpr.push("mobile-width");
    return classes;
  }, [isCollapsed, isMobile]);

  return (
    <div
      ref={sidemenuRef}
      // className={`sidemenu-wrapper ${isCollapsed ? "w-sidemenu" : ""} ${
      //   isMobile && !isCollapsed ? "mobile-width" : ""
      // }`}
      className={classNames.sidemenuWpr.join(" ")}
      onMouseEnter={handleMouseEnter}
    >
      <nav>
        <ul>
          {hasCollapseBtn && (
            <li className="collapse-btn-cntr">
              <span
                // className={`collapse-btn ${isCollapsed ? "rotate-180" : ""}`}
                className={classNames.collapseBtn.join(" ")}
                onClick={handleCollapse}
              >
                <Components.CollapseBtn ref={collapseSvgRef} />
              </span>
            </li>
          )}
          {listItems.map((item) => {
            const SubMenu = getSubmenu(item);
            return (
              <React.Fragment key={item.id}>
                <NavLink
                  to={getPath(item)}
                  data-submenu={SubMenu ? "true" : "false"}
                >
                  {({ isActive }) => (
                    <li
                      onClick={() => handleClick(item.id, SubMenu)}
                      className={isActive ? "highlight" : ""}
                    >
                      <span className="icon">{getIcon(item)}</span>
                      {!isCollapsed && (
                        <>
                          {getLabel(item)}
                          {SubMenu && (
                            <span
                              className={`${show[item.id] ? "rotate-180" : ""}`}
                            >
                              <DownArrow />
                            </span>
                          )}
                        </>
                      )}
                    </li>
                  )}
                </NavLink>
                {SubMenu && !isCollapsed && (
                  <div className={`submenu ${show[item.id] ? "show" : ""}`}>
                    <SubMenu
                      isMobile={isMobile}
                      setIsCollapsed={setIsCollapsed}
                    />
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
