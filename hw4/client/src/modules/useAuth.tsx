import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import * as api from '../api/users';

interface User {
	id: string;
	name: string;
	email: string;
	token: string;
}

interface AuthContextType {
	user?: User;
	loading: boolean;
	error?: any;

	login: (user: { email: string; password: string }) => void;
	register: (user: { email: string; name: string; password: string }) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	const [user, setUser] = useState<User | undefined>();
	const [error, setError] = useState<any>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const data = localStorage.getItem('session');

		if (!data) {
			return;
		}

		const { _id: id, name, email, token } = JSON.parse(data);

		if (id && name && email && token) {
			setUser({ id, name, email, token });
		}
	}, []);

	function login(user: { email: string; password: string }) {
		setLoading(true);

		api
			.login(user)
			.then((res) => {
				const { _id: id, name, email, token } = res;
				setUser({ id, name, email, token });
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}

	function register(user: { email: string; name: string; password: string }) {
		setLoading(true);

		api
			.register(user)
			.then((res) => {
				const { _id: id, name, email, token } = res;
				setUser({ id, name, email, token });
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}

	function logout() {
		api.logout();
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				error,
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
	return useContext(AuthContext);
}
