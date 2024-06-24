import { IFormField } from '@/types'
import React, { useState } from 'react'
import { Image, TextInput, TouchableOpacity, View } from 'react-native'

import { icons } from '@/constants'

const SearchInput = ({
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	...props
}: Partial<IFormField>) => {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	return (
		<View className='w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
			<TextInput
				className='text-base mt-0.5 text-white flex-1 font-pregular'
				value={value}
				placeholder='Search for a video topic'
				placeholderTextColor='#7B7B8B'
				onChangeText={handleChangeText}
				secureTextEntry={title === 'Password' && !showPassword}
			/>

			<TouchableOpacity>
				<Image source={icons.search} resizeMode='contain' className='w-5 h-5' />
			</TouchableOpacity>
		</View>
	)
}

export default SearchInput
