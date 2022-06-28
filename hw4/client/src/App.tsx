import React from 'react';
import useAuth, { AuthProvider } from './modules/useAuth';
import NotAuthenticated from './pages/NotAuthenticated';
import Home from './pages/Home';

const AuthRouter = () => {
	const { user } = useAuth();

	if (!user) {
		return <NotAuthenticated />;
	} else {
		return <Home />;
	}
};

function App() {
	return (
		<div>
			<AuthProvider>
				<AuthRouter />
			</AuthProvider>
		</div>
	);
}

export default App;
