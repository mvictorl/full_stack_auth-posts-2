import { useEffect, useLayoutEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../appstore/store"
import { check } from "../appstore/authSlice"
import { TopPanel } from "./TopPanel"
import { Box, Container } from "@mui/material"
import { fetchAllPosts } from "../appstore/postSlice"

export const Root = () => {
  const dispatch: AppDispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(check())
    dispatch(fetchAllPosts())
    // eslint-disable-next-line
  }, [])

  return (
    <Box id="root">
      <TopPanel />
      <Container>
        <Outlet />
      </Container>
    </Box>
  )
}
