import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"
import { Loader } from "./components/Loader"
import ErrorPage from "./components/ErrorPage"
import HomePage from "./components/HomePage"
import OptionsPage from "./components/OptionsPage"
import { Root } from "./components/Root"
import PostList from "./components/Posts/PostList"

const Login = lazy(() => import("./components/Login"))
const Registeration = lazy(() => import("./components/Registration"))
const PostPage = lazy(() => import("./components/Posts/PostPage"))
const PostView = lazy(() => import("./components/Posts/PostView"))

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
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loader />}>
            <Registeration />
          </Suspense>
        ),
      },
      {
        path: "posts",
        element: (
          <Suspense fallback={<Loader />}>
            <PostPage />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <PostList />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<Loader />}>
                <PostView />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
])
