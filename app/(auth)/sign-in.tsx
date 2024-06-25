import React, { useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { Link, router } from 'expo-router'

type form = {
	email: string
	password: string
}

const SignIn = () => {
	const { setUser, setIsLoggedIn } = useGlobalContext()

	const [form, setForm] = useState<form>({
		email: '',
		password: '',
	})

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	const submit = async () => {
		if (form.email === '' || form.password === '') {
			Alert.alert('Error', 'Please fill in all the fields')
		}

		setIsSubmitting(true)

		try {
			await signIn(form)
			const result = await getCurrentUser()
			setUser(result)
			setIsLoggedIn(true)

			Alert.alert('Success', 'User signed in successfully')

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
						Log in to Aora
					</Text>

					<FormField
						title='Email'
						value={form.email}
						handleChangeText={(e: string) => setForm({ ...form, email: e })}
						otherStyles='mt-10'
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
							Don't have account?
						</Text>
						<Link
							href='/sign-up'
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

export default SignIn
