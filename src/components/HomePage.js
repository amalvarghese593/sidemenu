import React from "react";
import { Sidemenu } from "./Sidemenu";
import "./index.css";
import { NavLink } from "react-router-dom";
import { AllRoutes } from "routes/AllRoutes";

export const HomePage = () => {
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
      icon: () => <DummyIcon />,
    },
    {
      label: "Requirements",
      path: "/requirements",
      id: 2,
      icon: () => <DummyIcon />,
    },
    {
      label: "Resumes",
      path: "/resumes",
      id: 3,
      icon: () => <DummyIcon />,
    },
    {
      label: "Interviews",
      path: "/interviews",
      id: 4,
      icon: () => <DummyIcon />,
      Submenu: ({ isMobile, setIsCollapsed }) => (
        <Submenu
          basePath="/interviews"
          items={interviewSubmenu}
          isMobileView={isMobile}
          setIsCollapsed={setIsCollapsed}
        />
      ),
    },
    {
      label: "Submissions",
      path: "/submissions",
      id: 5,
      icon: () => <DummyIcon />,
    },
    {
      label: "Reports",
      path: "/reports",
      id: 6,
      icon: () => <DummyIcon />,
      Submenu: ({ isMobile, setIsCollapsed }) => (
        <Submenu
          basePath="/reports"
          items={reportsSubmenu}
          isMobileView={isMobile}
          setIsCollapsed={setIsCollapsed}
        />
      ),
    },
  ];
  return (
    <div className="homepage-wrapper">
      <header className="header">
        <h1>HomePage</h1>
      </header>
      <div className="main-container">
        <Sidemenu
          listItems={listItems}
          getLabel={(o) => o.label}
          getPath={(o) => o.path}
          getSubmenu={(o) => o.Submenu}
          getIcon={(o) => o.icon()}
          components={{
            CollapseBtn: React.forwardRef((props, ref) => (
              <CollapseBtn ref={ref} />
            )),
          }}
        />

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
        <main className={`main-content`}>
          <AllRoutes />
        </main>
      </div>
    </div>
  );
};

const Submenu = ({ items, basePath, setIsCollapsed, isMobileView }) => {
  const handleClick = () => {
    if (isMobileView) setIsCollapsed(true);
  };
  return (
    <ul>
      {items.map((item, idx) => (
        <NavLink
          data-submenu="false"
          to={basePath ? basePath + item.path : item.path}
          key={idx}
        >
          {({ isActive }) => (
            <li className={isActive ? "active" : ""} onClick={handleClick}>
              {item.label}
            </li>
          )}
        </NavLink>
      ))}
    </ul>
  );
};

//composition pattern.............................
// const Button = ({ children, ...rest }) => <button {...rest}>{children}</button>;

// const withSidemenu = (Comp) => {
//   return ({ children, onClick, isShow, ...rest }) => {
//     return (
//       <>
//         <Comp onClick={onClick}>{children}</Comp>
//         {isShow && <Sidemenu {...rest} />}
//       </>
//     );
//   };
// };

// const BtnWithSidemenu = withSidemenu(Button);

const DummyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="bi bi-archive-fill"
    viewBox="0 0 16 16"
  >
    <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
  </svg>
);

const CollapseBtn = React.forwardRef((props, ref) => (
  <DoubleArrowLeft ref={ref} />
));

const DoubleArrowLeft = React.forwardRef((props, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="bi bi-chevron-double-left"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
    <path
      fillRule="evenodd"
      d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
  </svg>
));
