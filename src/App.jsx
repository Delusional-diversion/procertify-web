import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import ViewCertifications from "./pages/ViewCertifications";
import ViewOrganisations from "./pages/ViewOrganisations";
import AccountCreation from "./pages/AccountCreation";
import { createContext, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "account-creation",
    element: <AccountCreation/>,
  },
  {
    path: "register",
    element: <Register/>,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "*",
    element: <ErrorPage/>,
  },
  {
    path: "view-certifications",
    element: <ViewCertifications/>,
  },
  {
    path: "view-organisations",
    element: <ViewOrganisations/>,
  },
]);



export const UserContext = createContext()
function App() {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{user,setUser}}>
    <div className="App">
      <RouterProvider router={router} />
    </div>
    </UserContext.Provider>
  )
}

export default App

