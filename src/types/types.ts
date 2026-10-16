export interface ITodo {
  id: number;
  title: string;
  description: string;
  deadline: Date;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  date_birth: Date;
  gender_id: number;
  city_id: number;
  bio: string;
  image_path: string;
  wantsToLearnSubskillId: string;
  wantsToLearnSkillId: string;
  skillTitle: string;
  skillDescription: string;
  canTeachSkillId: string;
  canTeachSubskillId: string;
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
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
