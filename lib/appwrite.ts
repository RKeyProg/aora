import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Models,
	Query,
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
		const posts = await databases.listDocuments(databaseId, videoCollectionId)

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
