import React, { useState } from 'react'
import { FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import VideoCard from '@/components/VideoCard'
import { images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'

const Home = () => {
	const { user } = useGlobalContext()
	const { data: posts, refetch } = useAppwrite(getAllPosts)
	const { data: latestPosts } = useAppwrite(getLatestPosts)

	const [refreshing, setRefreshing] = useState<boolean>(false)

	const onRefresh = async () => {
		setRefreshing(true)
		await refetch()

		setRefreshing(false)
	}

	return (
		<SafeAreaView className='bg-primary h-full'>
			<FlatList
				data={posts}
				keyExtractor={item => item.$id}
				renderItem={({ item }) => (
					<VideoCard video={item} hasLikedPost={onRefresh} />
				)}
				ListHeaderComponent={() => (
					<View className='my-6 px-4 space-y-6'>
						<View className='justify-between items-start flex-row mb-6'>
							<View>
								<Text className='font-pmedium text-sm text-gray-100'>
									Welcome Back,
								</Text>
								<Text className='text-2xl font-psemibold text-white'>
									{user?.username}
								</Text>
							</View>

							<View className='mt-1.5'>
								<Image
									source={images.logoSmall}
									className='w-9 h-10'
									resizeMode='contain'
								/>
							</View>
						</View>

						<SearchInput initialPlaceholder='Search for a video topic' />

						<View className='w-full flex-1 pt-5 pb-8'>
							<Text className='text-gray-100 text-lg font-pregular mb-3'>
								Latest Videos
							</Text>

							<Trending posts={latestPosts ?? []} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title='No Videos Found'
						subtitle='Be the first ine to upload a video'
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
	)
}

export default Home
