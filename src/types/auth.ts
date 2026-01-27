export interface UserData {
  id: number;
  email: string;
  name: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}
