import { ICreateForm } from '@/types'
import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	ImageGravity,
	Models,
	Query,
	Storage,
} from 'react-native-appwrite'

export const config = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.rkey.aora',
	projectId: '6675d5620025ffcda34a',
	databaseId: '6675d70b00014cb3024b',
	userCollectionId: '6675d72e0039b30a25ce',
	videoCollectionId: '6675d7510000313421d1',
	storageId: '6675d8d50025fee97e4c',
}

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	userCollectionId,
	videoCollectionId,
	storageId,
} = config

// Init your React Native SDK
const client = new Client()

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

type user = {
	email: string
	password: string
	username?: string
}

export const createUser = async ({
	email,
	password,
	username,
}: user): Promise<Models.Document> => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		)

		if (!newAccount) throw Error

		const avatarUrl = avatars.getInitials(username)

		await signIn({ email, password })

		const newUser = await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				username,
				avatar: avatarUrl,
			}
		)

		return newUser
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export const signIn = async ({ email, password }: user) => {
	try {
		const session = await account.createEmailPasswordSession(email, password)

		return session
	} catch (error: any) {
		throw new Error(error)
	}
}

export const getCurrentUser = async (): Promise<Models.Document> => {
	try {
		const currentAccount = await account.get()

		if (!currentAccount) throw Error

		const currentUser = await databases.listDocuments(
			config.databaseId,
			config.userCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		)

		if (!currentUser) throw Error
		return currentUser.documents[0]
	} catch (error: any) {
		console.log(error)
		throw Error(error)
	}
}

export const getAllPosts = async (): Promise<Models.Document[]> => {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId, [
			Query.orderDesc('$createdAt'),
			Query.limit(7),
		])

		return posts.documents
	} catch (error: any) {
		throw new Error(error)
	}
}

export const getLikedPosts = async (): Promise<Models.Document[]> => {
	try {
		const user = await getCurrentUser()

		console.log(user.$id)

		const posts = await databases.listDocuments(databaseId, videoCollectionId, [
			Query.orderDesc('$createdAt'),
			Query.limit(7),
			Query.contains('liked', [user.$id]),
		])

		return posts.documents
	} catch (error: any) {
		throw new Error(error)
	}
}

export const getLatestPosts = async (): Promise<Models.Document[]> => {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId, [
			Query.orderDesc('$createdAt'),
			Query.limit(7),
		])

		return posts.documents
	} catch (error: any) {
		throw new Error(error)
	}
}

export const searchPosts = async (
	query: string
): Promise<Models.Document[]> => {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId, [
			Query.search('title', query),
		])

		return posts.documents
	} catch (error: any) {
		throw new Error(error)
	}
}

export const getUserPosts = async (
	userId: string
): Promise<Models.Document[]> => {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId, [
			Query.orderDesc('$createdAt'),
			Query.limit(7),
		])

		return posts.documents
	} catch (error: any) {
		throw new Error(error)
	}
}

export const signOut = async () => {
	try {
		const session = await account.deleteSession('current')

		return session
	} catch (error: any) {
		throw new Error(error)
	}
}

export const getFilePreview = async (fileId: string, type: string) => {
	let fileUrl

	try {
		if (type === 'video') {
			fileUrl = storage.getFileView(storageId, fileId)
		} else if (type === 'image') {
			fileUrl = storage.getFilePreview(
				storageId,
				fileId,
				2000,
				2000,
				ImageGravity.Top,
				100
			)
		} else {
			throw new Error('Invalid file type')
		}

		if (!fileUrl) throw Error

		return fileUrl
	} catch (error: any) {
		throw new Error(error)
	}
}

export const uploadFile = async (file: any, type: string) => {
	if (!file) return

	const asset = {
		name: file.fileName,
		type: file.mimeType,
		size: file.fileSize,
		uri: file.uri,
	}

	try {
		const uploadFile = await storage.createFile(storageId, ID.unique(), asset)

		const fileUrl = await getFilePreview(uploadFile.$id, type)

		return fileUrl
	} catch (error: any) {
		throw new Error(error)
	}
}

export const createVideo = async (form: ICreateForm) => {
	try {
		const [thumbnailUrl, videoUrl] = await Promise.all([
			uploadFile(form.thumbnail, 'image'),
			uploadFile(form.video, 'video'),
		])

		const newPost = await databases.createDocument(
			databaseId,
			videoCollectionId,
			ID.unique(),
			{
				title: form.title,
				thumbnail: thumbnailUrl,
				video: videoUrl,
				prompt: form.prompt,
				creator: form.userId,
			}
		)

		return newPost
	} catch (error: any) {
		throw new Error(error)
	}
}

export const updateVideo = async (video: Models.Document, id: string) => {
	if (video.liked.includes(id)) throw new Error('Post already liked')

	const liked = [...video.liked, id]

	try {
		const updatedList = await databases.updateDocument(
			databaseId,
			videoCollectionId,
			video.$id,
			{
				title: video.title,
				thumbnail: video.thumbnailUrl,
				video: video.videoUrl,
				prompt: video.prompt,
				creator: video.userId,
				liked: liked,
			}
		)
	} catch (error: any) {
		throw new Error(error)
	}
}
