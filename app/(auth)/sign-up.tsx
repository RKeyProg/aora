import React, { useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'

type form = {
	username: string
	email: string
	password: string
}

const SignUp = () => {
	const { setUser, setIsLoggedIn } = useGlobalContext()

	const [form, setForm] = useState<form>({
		username: '',
		email: '',
		password: '',
	})

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	const submit = async () => {
		if (!form.username || !form.email || !form.password) {
			Alert.alert('Error', 'Please fill in all the fields')
		}

		setIsSubmitting(true)

		try {
			const result = await createUser(form)
			setUser(result)
			setIsLoggedIn(true)

			// set it to global state

			router.replace('/home')
		} catch (error: any) {
			Alert.alert('Error', error.message)
		} finally {
			setIsSubmitting(false)
		}
	}

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
						title='Sign Up'
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
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignUp
