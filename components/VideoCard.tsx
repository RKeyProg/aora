import { icons } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { updateVideo } from '@/lib/appwrite'
import unlockRotation from '@/lib/unlockRotation'
import { IVideoCard } from '@/types'
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av'
import React, { useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'

const VideoCard = ({ video, hasLikedPost }: IVideoCard) => {
	const [play, setPlay] = useState<boolean>(false)
	const { user } = useGlobalContext()

	const likePost = async () => {
		try {
			await updateVideo(video, user!.$id)

			hasLikedPost!()

			Alert.alert('Success', 'Post liked successfully')
		} catch (error: any) {
			Alert.alert('Error', error.message)
		}
	}

	return (
		<View className='flex-col items-center px-4 mb-14'>
			<View className='flex-row gap-3 items-center'>
				<View className='justify-center items-center flex-row flex-1'>
					<View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
						<Image
							source={{ uri: video.creator.avatar }}
							className='w-full h-full rounded-lg'
							resizeMode='cover'
						/>
					</View>

					<View className='justify-center flex-1 ml-3 gap-y-1'>
						<Text
							className='text-white font-psemibold text-sm'
							numberOfLines={1}
						>
							{video.title}
						</Text>
						<Text
							className='text-xs text-gray-100 font-pregular'
							numberOfLines={1}
						>
							{video.creator.username}
						</Text>
					</View>
				</View>

				{!video.liked.includes(user!.$id) ? (
					<TouchableOpacity activeOpacity={0.7} onPress={() => likePost()}>
						<Image
							source={icons.bookmark}
							className='w-5 h-5'
							resizeMode='cover'
						/>
					</TouchableOpacity>
				) : (
					<Image
						source={icons.checkbookmark}
						className='w-5 h-5'
						resizeMode='cover'
					/>
				)}
			</View>

			{play ? (
				<Video
					source={{
						uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
					}}
					className='w-full h-60 rounded-xl mt-3'
					resizeMode={ResizeMode.CONTAIN}
					useNativeControls
					shouldPlay
					onFullscreenUpdate={unlockRotation}
					onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
						if ('didJustFinish' in status && status.didJustFinish) {
							setPlay(false)
						}
					}}
				/>
			) : (
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => setPlay(true)}
					className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
				>
					<Image
						source={{ uri: video.thumbnail }}
						className='w-full h-full rounded-xl mt-3'
						resizeMode='cover'
					/>
					<Image
						source={icons.play}
						className='w-12 h-12 absolute'
						resizeMode='contain'
					/>
				</TouchableOpacity>
			)}
		</View>
	)
}

export default VideoCard
