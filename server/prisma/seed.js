const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
	await prisma.user.deleteMany({})
	await prisma.token.deleteMany({})
	await prisma.post.deleteMany({})
	await prisma.comment.deleteMany({})
	await prisma.commentLike.deleteMany({})
	await prisma.postLike.deleteMany({})
	await prisma.comment.deleteMany({})

	const victor = await prisma.user.create({
		data: {
			email: 'victor@ya.ru',
			name: 'Victor',
			password: '$2a$12$HSatSNIV0YIQMXAtPTMhs.EiniHXyPr3UqK87Ks8zlU.Un3G0R7sC', // '123456'
			isActivated: true,
			roles: ['USER', 'ADMIN'],
		},
	})

	const kyle = await prisma.user.create({
		data: {
			email: 'kyle@ya.ru',
			name: 'Kyle',
			password: '$2a$12$HSatSNIV0YIQMXAtPTMhs.EiniHXyPr3UqK87Ks8zlU.Un3G0R7sC', // '123456'
			roles: ['GUEST'],
			isActivated: false,
			activationLink: '33352e53-63e5-484f-bc22-f8043568ac77',
		},
	})

	const sally = await prisma.user.create({
		data: {
			email: 'sally@ya.ru',
			name: 'Sally',
			password: '$2a$12$HSatSNIV0YIQMXAtPTMhs.EiniHXyPr3UqK87Ks8zlU.Un3G0R7sC', // '123456'
			roles: ['GUEST'],
			isActivated: false,
			activationLink: 'fdddce36-93ef-49d4-9377-46aefcff711f',
		},
	})

	const post1 = await prisma.post.create({
		data: {
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer placerat urna vel ante volutpat, ut elementum mi placerat. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt. Duis nec nunc vel urna ullamcorper eleifend ac id dolor. Phasellus vitae tortor ac metus laoreet rutrum. Aenean condimentum consequat elit, ut placerat massa mattis vitae. Vivamus dictum faucibus massa, eget euismod turpis pretium a. Aliquam rutrum rhoncus mi, eu tincidunt mauris placerat nec. Nunc sagittis libero sed facilisis suscipit. Curabitur nisi lacus, ullamcorper eu maximus quis, malesuada sit amet nisi. Proin dignissim, lacus vitae mattis fermentum, dui dolor feugiat turpis, ut euismod libero purus eget dui.',
			title: 'Post 1',
			userId: victor.id,
		},
	})
	const post2 = await prisma.post.create({
		data: {
			body: 'Proin ut sollicitudin lacus. Mauris blandit, turpis in efficitur lobortis, lectus lacus dictum ipsum, vel pretium ex lacus id mauris. Aenean id nisi eget tortor viverra volutpat sagittis sit amet risus. Sed malesuada lectus eget metus sollicitudin porttitor. Fusce at sagittis ligula. Pellentesque vel sapien nulla. Morbi at purus sed nibh mollis ornare sed non magna. Nunc euismod ex purus, nec laoreet magna iaculis quis. Mauris non venenatis elit. Curabitur varius lectus nisl, vitae tempus felis tristique sit amet.',
			title: 'Post 2',
			userId: kyle.id,
		},
	})

	const comment1 = await prisma.comment.create({
		data: {
			message: 'I am a root comment',
			userId: kyle.id,
			postId: post1.id,
		},
	})

	const comment2 = await prisma.comment.create({
		data: {
			parentId: comment1.id,
			message: 'I am a nested comment',
			userId: sally.id,
			postId: post1.id,
		},
	})

	const comment3 = await prisma.comment.create({
		data: {
			message: 'I am another root comment',
			userId: sally.id,
			postId: post1.id,
		},
	})
}

seed()
