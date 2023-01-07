import { useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { Router } from "./Router"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./appstore/store"
import { check } from "./appstore/authSlice"
import "./App.css"

function App() {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(check())
  }, [dispatch])

  return <RouterProvider router={Router}></RouterProvider>
}

export default App
