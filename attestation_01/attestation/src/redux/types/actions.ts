import {
  CommentResponsType,
  ListResponseType, PostFullResponseType, PostShortResponseType, UserResponseType, UserShortResponseType,
} from '../../types/api/dumMyApiResponses';

export interface Action {
  type: string;
  loading?: boolean;
  loaded?: boolean;
  error?: string;
}

export interface ListUserShortActionType extends Action{
  userList?: ListResponseType<UserShortResponseType>;
}

export interface UserActionType extends Action{
  user?: UserResponseType;
  doAction?: boolean;
}

export interface ListPostShortActionType extends Action{
  postID?: string;
  postList?: ListResponseType<PostShortResponseType>;
}

export interface PostFullActionType extends Action{
  postFull?: PostFullResponseType;
}

export interface ListCommentActionType extends Action{
  postID?: string;
  commentList?: ListResponseType<CommentResponsType>;
}
