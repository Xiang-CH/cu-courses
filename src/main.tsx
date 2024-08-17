import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n.ts";
import "react-big-calendar/lib/css/react-big-calendar.css";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/*<RouterProvider router={router} />*/}
    {/*<Toaster />*/}
    <App />
  </React.StrictMode>,
);
