import { ImageSourcePropType } from 'react-native'
import { Models } from 'react-native-appwrite'

export interface ITabIcon {
	icon: ImageSourcePropType
	color: string
	name: string
	focused: boolean
}

export interface ICustomButton {
	title?: string
	handlePress(): void
	containerStyles?: string
	textStyles?: string
	isLoading?: boolean
}

export interface IFormField {
	title: string
	value: string
	placeholder: string
	handleChangeText(e: string): void
	otherStyles: string
	keyboardType: string
}

export interface IGlobalContext {
	isLoggedIn: boolean
	setIsLoggedIn: (c: boolean) => void
	user: Models.Document | null
	setUser: (c: Models.Document | null) => void
	isLoading: boolean
}

export interface IEmptyState {
	title: string
	subtitle: string
}

type Creator = {
	username: string
	avatar: any
}

type Video = {
	title: string
	thumbnail: string
	video: any
	creator: Creator
}

export interface IVideoCard {
	video: Video | Models.Document
}
