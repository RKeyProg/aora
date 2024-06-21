import { ImageSourcePropType } from 'react-native'

export interface TabIconType {
	icon: ImageSourcePropType
	color: string
	name: string
	focused: boolean
}

export interface CustomButtonType {
	title?: string
	handlePress(): void
	containerStyles?: string
	textStyles?: string
	isLoading?: boolean
}

export interface FormFieldType {
	title: string
	value: string
	placeholder?: string
	handleChangeText(e: string): void
	otherStyles: string
	keyboardType: string
}
