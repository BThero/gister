export declare interface IUser {
	_id: string;
	name: string;
	email: string;
	password: string;
	token: string;
}

export declare type IUserSafe = Omit<IUser, 'password'>;
