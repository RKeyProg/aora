import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getLatestPosts, getLikedPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { ICreateForm } from '@/types'
import React, { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Bookmarks = () => {
	const { user } = useGlobalContext()
	const { data: posts, refetch } = useAppwrite(getLikedPosts)
	const [refreshing, setRefreshing] = useState<boolean>(false)
	const { data: latestPosts } = useAppwrite(getLatestPosts)

	const [form, setForm] = useState<ICreateForm>({
		title: '',
		video: null,
		thumbnail: null,
		prompt: '',
	})

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
						<Text className='text-2xl text-white font-psemibold'>
							Saved Videos
						</Text>

						<SearchInput
							initialPlaceholder='Search your saved videos'
							otherStyles='mt-6'
						/>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title='No Videos Found'
						subtitle='You need to save video'
						isButton={false}
					/>
				)}
			/>
		</SafeAreaView>
	)
}

export default Bookmarks
