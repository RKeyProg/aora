import React, { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { images } from '@/constants'
import { Link } from 'expo-router'

type form = {
	username: string
	email: string
	password: string
}

const SignUp = () => {
	const [form, setForm] = useState<form>({
		username: '',
		email: '',
		password: '',
	})

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	const submit = () => {}

	return (
		<SafeAreaView className='bg-primary h-full'>
			<ScrollView>
				<View className='w-full justify-center h-full px-4 my-6'>
					<Image
						source={images.logo}
						resizeMode='contain'
						className='w-[115px] h-[25px]'
					/>

					<Text className='text-2xl text-white font-psemibold mt-10'>
						Sign un to Aora
					</Text>

					<FormField
						title='Username'
						value={form.username}
						handleChangeText={(e: string) => setForm({ ...form, username: e })}
						otherStyles='mt-10'
					/>

					<FormField
						title='Email'
						value={form.email}
						handleChangeText={(e: string) => setForm({ ...form, email: e })}
						otherStyles='mt-7'
						keyboardType='email-address'
					/>
					<FormField
						title='Password'
						value={form.password}
						handleChangeText={(e: string) => setForm({ ...form, password: e })}
						otherStyles='mt-7'
						keyboardType='email-address'
					/>

					<CustomButton
						title='Sign In'
						handlePress={submit}
						containerStyles='mt-7'
						isLoading={isSubmitting}
					/>

					<View className='justify-center pt-5 flex-row gap-2'>
						<Text className='text-lg text-gray-100 font-pregular'>
							Have an account already?
						</Text>
						<Link
							href='/sign-in'
							className='text-lg font-psemibold text-secondary-100'
						>
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignUp
