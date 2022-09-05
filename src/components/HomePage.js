import React, { useState } from "react";
import { Sidemenu } from "./Sidemenu";
import "./index.css";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useParams,
  Outlet,
} from "react-router-dom";

export const HomePage = () => {
  const [isShow, setIsShow] = useState(true);
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
      // Submenu: function () {
      //   const currentPath = this.path;
      //   return <Submenu basePath={currentPath} items={interviewSubmenu} />;
      // },
      Submenu: () => (
        <Submenu basePath="/interviews" items={interviewSubmenu} />
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
      Submenu: () => <Submenu basePath="/reports" items={reportsSubmenu} />,
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
      <div className="main-container">
        {isShow && (
          <Sidemenu
            listItems={listItems}
            getLabel={(o) => o.label}
            getPath={(o) => o.path}
            getSubmenu={(o) => o.Submenu}
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
        <main className={`main-content ${!isShow ? "width-100" : ""}`}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/dashboard" /* replace */ />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/interviews" element={<Interview />}>
              <Route path=":type" element={<InterviewItem />} />
            </Route>
            <Route path="/reports" element={<Reports />} />
            <Route path="/resumes" element={<Resumes />} />
            <Route path="/submissions" element={<Submissions />} />
            <Route path="/requirements" element={<Requirements />} />
          </Routes>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

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

const Submenu = ({ items, basePath }) => {
  return (
    <ul>
      {items.map((item, idx) => (
        <NavLink to={basePath ? basePath + item.path : item.path} key={idx}>
          {({ isActive }) => (
            <li className={isActive ? "active-item" : ""}>{item.label}</li>
          )}
        </NavLink>
      ))}
    </ul>
  );
};

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

const Interview = () => <h1>Interview section</h1>;
const Dashboard = () => <h1>Dashboard section</h1>;
const Requirements = () => <h1>Requirements section</h1>;
const Reports = () => <h1>Reports section</h1>;
const Resumes = () => <h1>Resumes section</h1>;
const Submissions = () => <h1>Submissions section</h1>;

const InterviewItem = () => {
  const props = useParams();
  console.log({ props });
  return <h4>int item</h4>;
};
