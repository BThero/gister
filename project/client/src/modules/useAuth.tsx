import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import * as api from '../api/users';
import { IUserSafe } from 'types/user';

interface AuthContextType {
	user?: IUserSafe;
	loading: boolean;
	error?: any;

	login: (user: { email: string; password: string }) => void;
	register: (user: { email: string; name: string; password: string }) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	const [user, setUser] = useState<IUserSafe | undefined>();
	const [error, setError] = useState<any>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const data = localStorage.getItem('session');

		if (!data) {
			return;
		}

		const { _id, name, email, token } = JSON.parse(data);

		if (_id && name && email && token) {
			setUser({ _id, name, email, token });
		}
	}, []);

	function login(user: { email: string; password: string }) {
		setLoading(true);

		api
			.login(user)
			.then((res) => {
				setUser(res);
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}

	function register(user: { email: string; name: string; password: string }) {
		setLoading(true);

		api
			.register(user)
			.then((res) => {
				setUser(res);
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}

	function logout() {
		setUser(undefined);
		api.logout();
	}

	const memoizedValue = useMemo<AuthContextType>(
		() => ({
			user,
			loading,
			error,
			login,
			register,
			logout,
		}),
		[user, loading, error]
	);

	return (
		<AuthContext.Provider value={memoizedValue}>
			{children}
		</AuthContext.Provider>
	);
}

export default function useAuth() {
	return useContext(AuthContext);
}
