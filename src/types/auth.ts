export interface UserData {
  id: number;
  email: string;
  name: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface AuthUserResponse extends UserData {
  data?: UserData;
}
