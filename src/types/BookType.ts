interface Author{
  id: number;
  name: string;
}

export interface BookResponse {
  id: number;
  title: string;
  description: string;
  author: Author;
  price: number;
  stock: number;
  available: boolean;
}