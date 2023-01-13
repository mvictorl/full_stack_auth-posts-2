import { IComment } from "./IComment"
import { IPostLike } from "./IPostLike"
import { IUser } from "./IUser"

export interface IPost {
	id: string
	title: string
	body: string
	author: IUser
	comments: IComment[]
	likes: IPostLike[]
	createdAt: Date
	updatedAt?: Date
	_count?: {
		comments?: number
		likes?: number
	}
}
