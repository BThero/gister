import { lazy } from 'react';
import useAuth, { AuthProvider } from './modules/useAuth';

const AuthRouter = () => {
	const { user } = useAuth();

	const NotAuthenticated = lazy(() => import('./pages/NotAuthenticated'));
	const Home = lazy(() => import('./pages/Home'));

	if (!user) {
		return <NotAuthenticated />;
	} else {
		return <Home />;
	}
};

const App = () => {
	return (
		<div>
			<AuthProvider>
				<AuthRouter />
			</AuthProvider>
		</div>
	);
};

export default App;
