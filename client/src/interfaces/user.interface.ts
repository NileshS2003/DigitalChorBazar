export interface IUser {
  _id: string;
  username: string;
  password?: string;
  name?: string;
  contact_number?: string;
  email: string;
  pfp?: string;
  listings?: string[];
  purchases?: string[];
  college?:string
  city?:string
  state?:string
}

export interface IUserData {
  username?: string;
  password: string;
  email: string;
}

export interface IUserResponse {
  _id: string;
  username: string;
  email: string;
}
