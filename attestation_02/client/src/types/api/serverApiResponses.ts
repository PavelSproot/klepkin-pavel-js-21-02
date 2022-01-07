export interface ListResponseType<T> {
  data: Array<T>;
  total: number;
  page: number;
  limit: number;
}

export interface CommentResponsType {
  id?: string;
  message?: string;
  post?: string;
  publishDate?: { date: string, time: string };
  owner?: UserShortResponseType;
}

export interface UserShortResponseType {
  id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
}

export interface UserResponseType extends ResponseError{
  id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  dateOfBirth?: { date: string, time: string };
  registerDate?: { date: string, time: string };
  phone?: string;
  picture?: string;
}

export interface PostShortResponseType {
  id: string;
  text: string;
  image: string;
  likes: number;
  tags: Array<string>;
  publishDate: { date: string, time: string };
  owner: UserShortResponseType;
}

export interface PostFullResponseType extends PostShortResponseType {
  link: string;
}

export interface ResponseError {
  error?: string;
}
