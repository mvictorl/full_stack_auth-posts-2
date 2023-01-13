import { useDispatch, useSelector } from "react-redux"
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById, fetchPostsById } from "../../appstore/postSlice"
import { name2letters } from "../../helpers/name2letters"
import { AppDispatch, IRootState } from "../../appstore/store"
import { red } from "@mui/material/colors"
import {
  MoreVert as MoreVertIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
} from "@mui/icons-material"
import { useLayoutEffect } from "react"
import CommentList from "./Comments/CommentList"

const PostView = () => {
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()

  const dispatch: AppDispatch = useDispatch()
  const currentPost = useSelector(getPostById)
  // const currentPost = useSelector((state: IRootState) => {
  //   return getPostById(state, id)
  // })
  useLayoutEffect(() => {
    dispatch(fetchPostsById({ id }))
    // console.log(currentPost)
  }, [id, dispatch])

  const handleBack = () => {
    navigate("/posts", { replace: true })
  }

  // if (post) {
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
          Post View Component
        </Typography>
        <Tooltip
          title="Back"
          placement="bottom-end"
          arrow
          disableFocusListener
          disableTouchListener
        >
          <IconButton
            size="large"
            sx={{ alignSelf: "center" }}
            onClick={handleBack}
          >
            <KeyboardBackspaceIcon sx={{ fontSize: "inherit" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {name2letters(currentPost!.author?.name)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={currentPost!.title}
          titleTypographyProps={{ variant: "h6" }}
          subheader={new Date(currentPost!.createdAt).toLocaleDateString(
            "ru-RU",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}
        />
        {/* {post!.photo ? (
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
        ) : null} */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {currentPost!.body}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
            }}
          >
            <IconButton size="large" aria-label="add to favorites">
              <Badge badgeContent={currentPost._count?.likes} color="success">
                {/* <Badge badgeContent={10} color="success"> */}
                <ThumbUpIcon sx={{ fontSize: "inherit" }} />
              </Badge>
            </IconButton>
            {/* <IconButton size="large" aria-label="remove from favorites">
              <Badge badgeContent={1} color="error">
                <ThumbDownIcon sx={{ fontSize: "inherit" }} />
              </Badge>
            </IconButton> */}
          </Box>
        </CardActions>
      </Card>
      <br />
      {currentPost.comments ? (
        <CommentList comments={currentPost.comments} />
      ) : null}
    </>
  )
  // }
  // return <h1>Loading...</h1>
}

export default PostView
