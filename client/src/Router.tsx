import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "./components/ErrorPage"
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import OptionsPage from "./components/OptionsPage"
import Registeration from "./components/Registration"
import { Root } from "./components/Root"

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "options",
        element: <OptionsPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registeration />,
      },
    ],
  },
])
