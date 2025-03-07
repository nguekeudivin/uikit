import { User } from "./users";

export interface LikeUser {
  image: string;
}

export interface Comment {
  author: User;
  content: string;
}

export interface Post {
  title: string;
  author: User;
  date: string; // ISO 8601 date format
  content: string;
  image: string;
  cover: string;
  likes: number;
  shares: number;
  views: number;
  likesUsers: LikeUser[];
  comments: Comment[];
  description: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  enableComments: boolean;
  publish: boolean;
  publishedDate: string;
  status: string;
}
