import { IComment } from "./IComment"
import { IUser } from "./IUser"

export interface ICommentLike {
	user: IUser
	comment: IComment
}
