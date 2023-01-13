import { IPost } from "./IPost"
import { IUser } from "./IUser"

export interface IPostLike {
	user: IUser
	post: IPost
}
