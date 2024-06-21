import { getCurrentUser } from '@/lib/appwrite'
import { IGlobalContext } from '@/types'
import {
	FC,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import { Models } from 'react-native-appwrite'

const GlobalContext = createContext<IGlobalContext | null>(null)
export const useGlobalContext = () => useContext(GlobalContext)

interface GlobalProviderProps {
	children: ReactNode
}

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [user, setUser] = useState<Models.Document | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		getCurrentUser()
			.then(res => {
				if (res) {
					setIsLoggedIn(true)
					setUser(res)
				} else {
					setIsLoggedIn(false)
					setUser(null)
				}
			})
			.catch((error: any) => console.log(error))
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<GlobalContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				user,
				setUser,
				isLoading,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider
