import React from 'react'
import { FlatList, Text } from 'react-native'

const Trending = ({ posts }: { posts: Array<{ id: number }> }) => {
	return (
		<FlatList
			data={posts}
			keyExtractor={item => item.id.toString()}
			renderItem={({ item }) => (
				<Text className='text-3xl text-white'>{item.id}</Text>
			)}
			horizontal
		/>
	)
}

export default Trending
