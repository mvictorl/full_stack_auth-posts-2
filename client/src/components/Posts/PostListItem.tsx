import { name2letters } from "../../helpers/name2letters"
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  IconButtonProps,
  Typography,
} from "@mui/material"
import {
  MoreVert as MoreVertIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  InsertComment as InsertCommentIcon,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { red } from "@mui/material/colors"
import { IPostLike } from "../../models/IPostLike"
import { IComment } from "../../models/IComment"
import { useNavigate } from "react-router-dom"

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

type Props = {
  id: string
  title: string
  body: string
  author: {
    id: string
    name: string
  }
  createdAt: Date
  commentsNum: number
  likesNum: number
  photo?: string
  // likes: IPostLike[]
  // comments: IComment[]
}

const PostListItem = ({
  id,
  title,
  body,
  author,
  createdAt,
  photo,
  commentsNum,
  likesNum,
}: // likes,
// comments,
Props) => {
  // const [expanded, setExpanded] = React.useState(false)

  // const handleExpandClick = () => {
  //   setExpanded(!expanded)
  // }
  const navigate = useNavigate()

  const handleCommentsBtn = () => {
    navigate(`/posts/${id}`)
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {name2letters(author.name)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        titleTypographyProps={{ variant: "h6" }}
        subheader={new Date(createdAt).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      />
      {photo ? (
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
      ) : null}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {body}
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
            <Badge badgeContent={likesNum} color="success">
              <ThumbUpIcon
                sx={{ fontSize: "inherit" }}
                color={likesNum ? "primary" : "action"}
              />
            </Badge>
          </IconButton>
          {/* <IconButton size="large" aria-label="remove from favorites">
            <Badge badgeContent={1} color="error">
              <ThumbDownIcon sx={{ fontSize: "inherit" }} />
            </Badge>
          </IconButton> */}
        </Box>
        <Box>
          <IconButton
            size="large"
            aria-label="comments area"
            onClick={handleCommentsBtn}
          >
            <Badge badgeContent={commentsNum} color="primary">
              <InsertCommentIcon
                sx={{ fontSize: "inherit" }}
                color={commentsNum ? "secondary" : "action"}
              />
            </Badge>
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  )
}

export default PostListItem
