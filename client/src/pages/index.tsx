import { lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const PublicGists = lazy(() => import('./PublicGists'));
const ManageGists = lazy(() => import('./ManageGists'));

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="public" element={<PublicGists />} />
					<Route path="manage" element={<ManageGists />} />
					<Route path="*" element={<Navigate to="/public" replace />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
