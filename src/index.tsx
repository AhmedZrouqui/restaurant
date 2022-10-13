import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useOutlet,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import Layer from "./components/Layer";

const routes = [
  {
    path: "/",
    element: <Home />,
    nodeRef: React.createRef(),
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

function App() {
  const currentOutlet = useOutlet();
  const location = useLocation();
  const { nodeRef } =
    routes.find((route) => (route.path = location.pathname)) ?? {};

  return (
    <Layer>
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef as React.Ref<HTMLElement>}
          timeout={300}
          className="page"
          unmountOnExit
        >
          {(state: any) => (
            <div
              ref={nodeRef as React.RefObject<HTMLDivElement>}
              className="page"
            >
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </Layer>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
