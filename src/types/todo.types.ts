export interface ITodo {
  id: number;
  title: string;
  description: string;
  deadline: Date;
}

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  img: string;
}

export interface IPost {
  id: number;
  title: string;
  img: string;
}
