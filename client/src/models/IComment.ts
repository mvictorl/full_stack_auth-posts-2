import { IPost } from "./IPost"
import { IUser } from "./IUser"
import { ICommentLike } from "./ICommentLike"

export interface IComment {
	id: string
	message: string
	user: IUser
	post: IPost
	parentId: string
	// parent?: IComment
	// children?: IComment[]
	likes: ICommentLike[]
	createdAt: Date
	// updatedAt?: Date
}
