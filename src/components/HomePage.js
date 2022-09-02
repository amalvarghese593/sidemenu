import React, { useState } from "react";
import { Sidemenu } from "./Sidemenu";
import "./index.css";

export const HomePage = () => {
  const [isShow, setIsShow] = useState(true);
  const sideMenuDisplayHandler = () => {
    setIsShow((prev) => !prev);
  };
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
        <ul>
          <li>item 1</li>
          <li>item 2</li>
          <li>item 3</li>
        </ul>
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
        <ul>
          <li>item 1</li>
          <li>item 2</li>
          <li>item 3</li>
          <li>item 4</li>
          <li>item 5</li>
          <li>item 6</li>
        </ul>
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
          <h1>main content</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            mollitia velit sed optio, ipsa deleniti sit placeat esse, nemo
            impedit ipsum dolorem maiores qui unde laudantium nostrum corrupti,
            eligendi commodi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            mollitia velit sed optio, ipsa deleniti sit placeat esse, nemo
            impedit ipsum dolorem maiores qui unde laudantium nostrum corrupti,
            eligendi commodi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            mollitia velit sed optio, ipsa deleniti sit placeat esse, nemo
            impedit ipsum dolorem maiores qui unde laudantium nostrum corrupti,
            eligendi commodi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            mollitia velit sed optio, ipsa deleniti sit placeat esse, nemo
            impedit ipsum dolorem maiores qui unde laudantium nostrum corrupti,
            eligendi commodi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            mollitia velit sed optio, ipsa deleniti sit placeat esse, nemo
            impedit ipsum dolorem maiores qui unde laudantium nostrum corrupti,
            eligendi commodi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            mollitia velit sed optio, ipsa deleniti sit placeat esse, nemo
            impedit ipsum dolorem maiores qui unde laudantium nostrum corrupti,
            eligendi commodi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            mollitia velit sed optio, ipsa deleniti sit placeat esse, nemo
            impedit ipsum dolorem maiores qui unde laudantium nostrum corrupti,
            eligendi commodi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            mollitia velit sed optio, ipsa deleniti sit placeat esse, nemo
            impedit ipsum dolorem maiores qui unde laudantium nostrum corrupti,
            eligendi commodi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            mollitia velit sed optio, ipsa deleniti sit placeat esse, nemo
            impedit ipsum dolorem maiores qui unde laudantium nostrum corrupti,
            eligendi commodi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            mollitia velit sed optio, ipsa deleniti sit placeat esse, nemo
            impedit ipsum dolorem maiores qui unde laudantium nostrum corrupti,
            eligendi commodi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            mollitia velit sed optio, ipsa deleniti sit placeat esse, nemo
            impedit ipsum dolorem maiores qui unde laudantium nostrum corrupti,
            eligendi commodi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            mollitia velit sed optio, ipsa deleniti sit placeat esse, nemo
            impedit ipsum dolorem maiores qui unde laudantium nostrum corrupti,
            eligendi commodi?
          </p>
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
