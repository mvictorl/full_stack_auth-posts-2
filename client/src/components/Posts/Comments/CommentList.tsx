import { useMemo } from "react"
import { Box, Container } from "@mui/material"
import { IComment } from "../../../models/IComment"
import CommentListItem from "./CommentListItem"
import { useDispatch, useSelector } from "react-redux"
import { getCommentsByParent } from "../../../appstore/postSlice"

type Props = {
  comments: IComment[]
  level?: string
}

const CommentList = ({ comments, level = "null" }: Props) => {
  // const commentsByParentId = useMemo(() => {
  //   const group = {} as any

  //   comments.forEach((comment: IComment) => {
  //     group[comment.parentId] ||= []
  //     group[comment.parentId].push(comment)
  //   })
  //   return group
  // }, [comments])

  const commentsByParentId = useSelector(getCommentsByParent)

  // const getReplies = (parentId: string): IComment[] =>
  //   commentsByParentId[parentId]

  // const rootComments = getReplies("null")

  // const list = rootComments.map((comment) => (
  const list = commentsByParentId[level].map((comment: IComment) => (
    <div key={comment.id}>
      <CommentListItem {...comment} />
    </div>
  ))

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "flex-end",
        paddingLeft: "2rem",
        width: "100%",
      }}
    >
      {list}
    </Box>
  )
}

export default CommentList
