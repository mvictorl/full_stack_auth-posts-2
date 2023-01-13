import { Paper, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { getCommentsByParent } from "../../../appstore/postSlice"
import { IComment } from "../../../models/IComment"
import { IUser } from "../../../models/IUser"
import CommentList from "./CommentList"

type Props = {
  id: string
  message: string
  user: IUser
  createdAt: Date
  parentId: string
  // children?: IComment[]
  // getReplies: Function
}

const CommentListItem = ({
  id,
  message,
  user,
  createdAt,
  parentId,
}: // getReplies,
Props) => {
  const commentsByParentId = useSelector(getCommentsByParent)

  const getReplies = (parentId: string): IComment[] =>
    commentsByParentId[parentId]

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          padding: "1rem",
          margin: ".1rem",
        }}
      >
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="caption">
          {new Date(createdAt).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <Typography variant="body1">{message}</Typography>
      </Paper>
      {commentsByParentId[id] ? (
        <CommentList comments={commentsByParentId[id]} level={id} />
      ) : null}
    </>
  )
}

export default CommentListItem
