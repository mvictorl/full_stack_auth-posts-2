import { Container } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { fetchAllPosts } from "../../appstore/postSlice"
import { AppDispatch } from "../../appstore/store"
import PostList from "./PostList"

const PostPage = () => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllPosts())
    // eslint-disable-next-line
  }, [])

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "1rem",
        alignItems: "center",
      }}
    >
      <Outlet />
    </Container>
  )
}

export default PostPage
