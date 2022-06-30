import useAuth from 'modules/useAuth';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const NavBar = ({ current }: { current: 'public' | 'manage' }) => {
	const { logout } = useAuth();

	return (
		<nav>
			<ul className="p-4 flex flex-row justify-evenly text-xl border-b-2 border-black">
				<li>
					<Link
						to="/public"
						className={classNames({
							'text-red-500 underline': current === 'public',
							'hover:text-pink-500': current !== 'public',
						})}
					>
						Public Gists
					</Link>
				</li>
				<li>
					<Link
						to="/manage"
						className={classNames({
							'text-red-500 underline': current === 'manage',
							'hover:text-pink-500': current !== 'manage',
						})}
					>
						Manage My Gists
					</Link>
				</li>
				<li>
					<Link to="/" className={'hover:text-pink-500'} onClick={logout}>
						Log Out
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
