import { createContext, ReactNode, useContext, useState } from 'react';
import * as api from '../api/users';

interface User {
	id: string;
	name: string;
	email: string;
	token: string;
}

interface AuthContextType {
	// We defined the user type in `index.d.ts`, but it's
	// a simple object with email, name and password.

	user?: User;

	loading: boolean;
	error?: any;
	login: (user: { email: string; password: string }) => void;
	register: (user: { email: string; name: string; password: string }) => void;
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

	// const navigate = useNavigate();

	function login(user: { email: string; password: string }) {
		setLoading(true);

		api
			.login(user)
			.then((res) => {
				setUser({
					id: res._id,
					name: res.name,
					email: res.email,
					token: res.token,
				});

				// navigate('/', { replace: true });
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}

	function register(user: { email: string; name: string; password: string }) {
		setLoading(true);

		api
			.register(user)
			.then((res) => {
				setUser({
					id: res._id,
					name: res.name,
					email: res.email,
					token: res.token,
				});
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				error,
				login,
				register,
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
