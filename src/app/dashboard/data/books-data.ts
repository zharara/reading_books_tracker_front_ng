import { Categories, Category } from "./categories-data";

export interface Book {
  id: number;
  timeCreated: Date;
  userId: number;
  title: string;
  authors: string;
  edition: string;
  category: Category;
  bookInfo?: string;
  bookPages: number;
  currentReadingPage?: number;
}

export const Books: Book[] = [
  {
    id: 1,
    timeCreated:  new Date(2020),
    userId: 1,
    title: "Java Code",
    authors: "Daniel Liang",
    edition: "10th ED",
    category:  Categories[1],
    bookInfo: "theoritical & practical",
    bookPages: 500,
    currentReadingPage: 412,
  },
  {
    id: 2,
    timeCreated:  new Date(2020),
    userId: 1,
    title: "PHP Code",
    authors: "Daniel Liang",
    edition: "8th ED",
    category:  Categories[1],
    bookInfo: "theoritical & practical",
    bookPages: 400,
    currentReadingPage: 0,
  },
  {
    id: 3,
    timeCreated:  new Date(2020),
    userId: 1,
    title: "Critical Thinking",
    authors: "Tomas Bob",
    edition: "4th ED",
    category:  Categories[5],
    bookInfo: "theoritical & practical",
    bookPages: 250,
    currentReadingPage: 100,
  },
  {
    id: 4,
    timeCreated:  new Date(2020),
    userId: 1,
    title: "Daily Care",
    authors: "Mikle Peterson",
    edition: "11th ED",
    category:  Categories[7],
    bookInfo: "theoritical & practical",
    bookPages: 300,
    currentReadingPage: 25,
  },
];
