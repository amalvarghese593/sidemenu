import React, { useState } from "react";
import { Sidemenu } from "./Sidemenu";
import "./index.css";
import { NavLink } from "react-router-dom";
import { AllRoutes } from "routes/AllRoutes";

const isMobile = window.innerWidth < 480;

export const HomePage = () => {
  const [isShow, setIsShow] = useState(() => !(window.innerWidth < 480));
  const sideMenuDisplayHandler = () => {
    setIsShow((prev) => !prev);
  };

  const interviewSubmenu = [
    {
      label: "Candidate",
      path: "/candidate",
    },
    {
      label: "Internal",
      path: "/internal",
    },
    {
      label: "External",
      path: "/external",
    },
  ];
  const reportsSubmenu = [
    {
      label: "item 1",
      path: "/item1",
    },
    {
      label: "item 2",
      path: "/item2",
    },
    {
      label: "item 3",
      path: "/item3",
    },
    {
      label: "item 4",
      path: "/item4",
    },
    {
      label: "item 5",
      path: "/item5",
    },
    {
      label: "item 6",
      path: "/item6",
    },
  ];
  const listItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      id: 1,
    },
    {
      label: "Requirements",
      path: "/requirements",
      id: 2,
    },
    {
      label: "Resumes",
      path: "/resumes",
      id: 3,
    },
    {
      label: "Interviews",
      path: "/interviews",
      id: 4,
      Submenu: () => (
        <Submenu
          setIsShow={setIsShow}
          basePath="/interviews"
          items={interviewSubmenu}
        />
      ),
    },
    {
      label: "Submissions",
      path: "/submissions",
      id: 5,
    },
    {
      label: "Reports",
      path: "/reports",
      id: 6,
      Submenu: () => (
        <Submenu
          setIsShow={setIsShow}
          basePath="/reports"
          items={reportsSubmenu}
        />
      ),
    },
  ];
  return (
    <div className="homepage-wrapper">
      <header className="header">
        <button onClick={sideMenuDisplayHandler}>
          <HamburgerIcon />
        </button>
        <h1>HomePage</h1>
      </header>
      <div className={`main-container ${isMobile ? "flex-column" : ""}`}>
        {isShow && (
          <Sidemenu
            isMobile={isMobile}
            listItems={listItems}
            getLabel={(o) => o.label}
            getPath={(o) => o.path}
            getSubmenu={(o) => o.Submenu}
            setIsShow={setIsShow}
          />
        )}

        {/* <BtnWithSidemenu
          onClick={sideMenuDisplayHandler}
          isShow={isShow}
          listItems={listItems}
          getLabel={(o) => o.label}
          getPath={(o) => o.path}
          getSubmenu={(o) => o.Submenu}
        >
          Open sidemenu
        </BtnWithSidemenu> */}
        <main className={`main-content ${!isMobile && isShow ? "w-70" : ""}`}>
          <AllRoutes />
        </main>
      </div>
    </div>
  );
};

const Submenu = ({ items, basePath, setIsShow }) => (
  <ul>
    {items.map((item, idx) => (
      <NavLink
        data-submenu="false"
        to={basePath ? basePath + item.path : item.path}
        key={idx}
      >
        {({ isActive }) => (
          <li
            className={isActive ? "active" : ""}
            onClick={() => {
              if (isMobile) setIsShow(false);
            }}
          >
            {item.label}
          </li>
        )}
      </NavLink>
    ))}
  </ul>
);

//composition pattern.............................
const Button = ({ children, ...rest }) => <button {...rest}>{children}</button>;

const withSidemenu = (Comp) => {
  return ({ children, onClick, isShow, ...rest }) => {
    return (
      <>
        <Comp onClick={onClick}>{children}</Comp>
        {isShow && <Sidemenu {...rest} />}
      </>
    );
  };
};

const BtnWithSidemenu = withSidemenu(Button);

const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-list"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
    />
  </svg>
);
