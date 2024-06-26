import TrendingItem from '@/components/TrendingItem'
import React, { useState } from 'react'
import { FlatList, ViewToken } from 'react-native'
import { Models } from 'react-native-appwrite'

const Trending = ({ posts }: { posts: Models.Document[] }) => {
	const [activeItem, setActiveItem] = useState<Models.Document | string>(
		posts[1]
	)

	const viewableItemsChanged = ({
		viewableItems,
	}: {
		viewableItems: ViewToken<Models.Document>[]
	}) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[0].key)
		}
	}

	return (
		<FlatList
			data={posts}
			keyExtractor={item => item.$id}
			renderItem={({ item }) => (
				<TrendingItem activeItem={activeItem} item={item} />
			)}
			horizontal
			viewabilityConfig={{
				itemVisiblePercentThreshold: 70,
			}}
			contentOffset={{ x: 170, y: 0 }}
			onViewableItemsChanged={viewableItemsChanged}
		/>
	)
}

export default Trending
