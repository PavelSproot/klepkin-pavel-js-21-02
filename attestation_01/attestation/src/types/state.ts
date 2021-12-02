import { UserShortResponseType } from './api/dumMyApiResponses';

export interface State {
  users: UserListState;
  post: PostState;
}

export interface UserListState {
  userList: Array<UserShortResponseType>;
  loading: boolean;
  error?: string;
}

export interface PostState {
  text: string;
  loading: boolean;
}
