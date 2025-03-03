import { User } from "./users";

export interface LikeUser {
  image: string;
}

export interface Comment {
  author: User;
  content: string;
}

export interface Post {
  author: User;
  date: string; // ISO 8601 date format
  content: string;
  image: string;
  likes: number;
  likesUsers: LikeUser[];
  comments: Comment[];
}
