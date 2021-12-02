import { UserShortResponseType } from './api/dumMyApiResponses';

export interface Action {
  type: string
}

export interface ListActionType extends Action{
  newRecord?: string
}

export interface UserListActionType extends Action{
  userList?: Array<UserShortResponseType>
  loading?: boolean
  error?: string
}

export interface PostActionType extends Action {
  text?: string;
}
