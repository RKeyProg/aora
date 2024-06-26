import { icons } from '@/constants'
import { ITrending } from '@/types'
import { ResizeMode, Video } from 'expo-av'
import React, { useState } from 'react'
import {
	FlatList,
	Image,
	ImageBackground,
	ImageStyle,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
	ViewToken,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Models } from 'react-native-appwrite'

const zoomIn: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
	0: {
		scaleX: 0.9,
		scaleY: 0.9,
	},
	1: {
		scaleX: 1.1,
		scaleY: 1.1,
	},
}

const zoomOut: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> =
	{
		0: {
			scaleX: 1.1,
			scaleY: 1.1,
		},
		1: {
			scaleX: 0.9,
			scaleY: 0.9,
		},
	}

const TrendingItem = ({ activeItem, item }: ITrending) => {
	const [play, setPlay] = useState<boolean>(false)

	return (
		<Animatable.View
			className='mr-5'
			animation={activeItem === item.$id ? zoomIn : zoomOut}
			duration={500}
		>
			{play ? (
				<Video
					source={{
						uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
					}}
					className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
					resizeMode={ResizeMode.CONTAIN}
					useNativeControls
					shouldPlay
					onPlaybackStatusUpdate={status => {
						if (status.didJustFinish) {
							setPlay(false)
						}
					}}
				/>
			) : (
				<TouchableOpacity
					className='relative justify-center items-center'
					activeOpacity={0.7}
					onPress={() => setPlay(true)}
				>
					<ImageBackground
						source={{
							uri: item.thumbnail,
						}}
						className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
						resizeMode='cover'
					/>

					<Image
						source={icons.play}
						className='w-12 h-12 absolute'
						resizeMode='contain'
					/>
				</TouchableOpacity>
			)}
		</Animatable.View>
	)
}

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
