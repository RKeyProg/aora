import { Dispatch, SetStateAction } from 'react'
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
	placeholder?: string
	handleChangeText(e: string): void
	otherStyles: string
	keyboardType?: string
}

export interface IGlobalContext {
	isLoggedIn: boolean
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>
	user: Models.Document | null
	setUser: Dispatch<SetStateAction<Models.Document | null>>
	isLoading: boolean
}
