// import { useEffect } from "react";

// export const useEventListener = (
//   targetElement = document,
//   eventType = "",
//   handler = () => {},
//   dependencies = []
// ) => {
//   useEffect(() => {
//     //to take care of SSR (document is undefined in ssr)
//     if (!targetElement) return;

//     const isTargetElementRef = targetElement.hasOwnProperty("current");
//     let el = targetElement;
//     if (isTargetElementRef) el = targetElement.current;

//     el.addEventListener(eventType, handler);
//     return () => {
//       el.removeEventListener(eventType, handler);
//     };
//   }, [...dependencies /* or pass handler as dependency instead */]);
// };

import { useRef, useEffect } from "react";
export const useEventListener = (type, handler, el = window) => {
  const savedHandler = useRef();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    const listener = (e) => savedHandler.current(e);
    let domEle = el?.current ? el?.current : el;
    domEle.addEventListener(type, listener);
    return () => {
      domEle.removeEventListener(type, listener);
    };
  }, [el, type]);
};
