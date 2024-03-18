import { lazy, Suspense } from 'react';
import Header from './components/Header';
import useAuth, { AuthProvider } from './modules/useAuth';
import { SWRConfig } from 'swr';
import Loading from './components/Loading';

const AuthRouter = () => {
	const { user } = useAuth();

	const NotAuthenticated = lazy(() => import('./pages/NotAuthenticated'));
	const Router = lazy(() => import('./pages'));

	return (
		<Suspense fallback={<Loading />}>
			{!user ? (
				<NotAuthenticated />
			) : (
				<SWRConfig
					value={{
						fetcher: (url) =>
							fetch(url, {
								headers: {
									Authorization: `Bearer ${user.token}`,
								},
							}).then((res) => res.json()),
					}}
				>
					<Router />
				</SWRConfig>
			)}
		</Suspense>
	);
};

const App = () => {
	return (
		<AuthProvider>
			<Header />
			<AuthRouter />
		</AuthProvider>
	);
};

export default App;
