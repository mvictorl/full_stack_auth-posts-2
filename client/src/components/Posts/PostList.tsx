import { useDispatch, useSelector } from "react-redux"
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material"
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  NoteAdd as NoteAddIcon,
} from "@mui/icons-material"
import { selectAllPosts } from "../../appstore/postSlice"
import PostListItem from "./PostListItem"
import { selectCurrentUser } from "../../appstore/authSlice"

const PostList = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  const handleCreatePost = () => {}

  const postList = posts.map((post) => (
    <ListItem alignItems="flex-start" key={post.id}>
      <PostListItem
        id={post.id}
        title={post.title}
        body={post.body}
        author={post.author}
        createdAt={post.createdAt}
        commentsNum={post._count?.comments || 0}
        likesNum={post._count?.likes || 0}
        // likes={post.likes}
        // comments={post.comments}
      />
    </ListItem>
  ))

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: "1rem",
          width: "100%",
        }}
      >
        <Typography variant="h5" component="span">
          Post List Component
        </Typography>
        {currentUser.name ? (
          <Tooltip
            title="Create Post"
            placement="bottom-end"
            arrow
            disableFocusListener
            disableTouchListener
          >
            <IconButton
              size="large"
              color="success"
              sx={{ alignSelf: "center" }}
              onClick={handleCreatePost}
            >
              <NoteAddIcon sx={{ fontSize: "inherit" }} />
            </IconButton>
          </Tooltip>
        ) : // <Button
        //   color="success"
        //   variant="contained"
        //   sx={{ marginLeft: "auto" }}
        // >
        //   Create Post
        // </Button>
        null}
      </Box>

      <List sx={{ width: "100%", maxWidth: "xs", bgcolor: "background.paper" }}>
        {postList}
      </List>
    </>
  )
}

export default PostList
