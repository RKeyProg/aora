import React, { useState } from 'react'
import { Alert, Image, TextInput, TouchableOpacity, View } from 'react-native'

import { icons } from '@/constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({
	initialQuery,
	initialPlaceholder,
	otherStyles,
}: {
	initialQuery?: string
	initialPlaceholder?: string
	otherStyles?: string
}) => {
	const pathName = usePathname()
	const [query, setQuery] = useState(initialQuery || '')

	return (
		<View
			className={`w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4 ${otherStyles}`}
		>
			<TextInput
				className='text-base mt-0.5 text-white flex-1 font-pregular'
				value={query}
				placeholder={initialPlaceholder}
				placeholderTextColor='#CDCDE0'
				onChangeText={e => setQuery(e)}
			/>

			<TouchableOpacity
				onPress={() => {
					if (!query) {
						return Alert.alert(
							'Missing query',
							'Please input something to search results across database'
						)
					}

					if (pathName.startsWith('/search')) router.setParams({ query })
					else router.push(`/search/${query}`)
				}}
			>
				<Image source={icons.search} resizeMode='contain' className='w-5 h-5' />
			</TouchableOpacity>
		</View>
	)
}

export default SearchInput
