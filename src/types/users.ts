export interface User {
  name: string;
  role: string;
  avatar: string;
  country: string;
  following: number;
  followers: number;
  totalPosts: number;
  cover: string;
  company: string;
  phoneNumber: string;
  email: string;
  status: string;
}

export interface UserStatus {
  label: string;
  value: string;
  count: number;
}
