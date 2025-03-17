import {Agenda, Conferences, Contact, Home, NoPage, Verify} from "./pages";
import {createBrowserRouter} from "react-router-dom";
import {Layout} from "./components";
import React from "react";
import i18n from "i18next";
import {I18nextProvider} from "react-i18next";
import {RouterProvider} from "react-router";
import {Legal} from "./pages/legal/legal.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <NoPage/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: `/agenda`,
        element: <Agenda/>
      },
      {
        path: `/agenda/verify`,
        element: <Verify/>
      },
      {
        path: `/conferences`,
        element: <Conferences/>
      },
      {
        path: `/contact`,
        element: <Contact/>
      },
      {
        path: `/legal`,
        element: <Legal/>
      }
    ]
  },
]);

const App = () => {
  return (
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <RouterProvider router={router}/>
        </I18nextProvider>
      </React.StrictMode>
  );
};

export default App;
