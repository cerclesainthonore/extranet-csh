import {About, Conferences, Contact, Home, NoPage} from "./pages";
import {createBrowserRouter} from "react-router-dom";
import {Layout} from "./components";
import React from "react";
import i18n from "i18next";
import {I18nextProvider} from "react-i18next";
import {RouterProvider} from "react-router";

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
        path: `/about`,
        element: <About/>
      },
      {
        path: `/conferences`,
        element: <Conferences/>
      },
      {
        path: `/contact`,
        element: <Contact/>
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
