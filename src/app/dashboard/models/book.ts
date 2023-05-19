import { Category } from "./category";
import { User } from "./user";

export interface Book {
  _id: string;
  timeCreated: Date;
  user: User;
  title: string;
  authors: string;
  edition: string;
  category: Category;
  bookInfo?: string;
  bookPages: number;
  currentReadingPage?: number;
}

export interface CreateOrUpdateBook {
  user: string;
  title: string;
  authors: string;
  edition: string;
  category: string;
  bookInfo?: string;
  bookPages: number;
  currentReadingPage?: number;
}
